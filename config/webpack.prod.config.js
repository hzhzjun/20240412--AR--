const path = require("path");
const chalk = require("chalk");
const fs = require('fs-extra');
const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.common.config");
const {Uploader} = require("spark-assets");

const isProd = true;
const {getCdnFolderName} = require("./scripts/utils");
const {SPARK_CONFIG} = require("./scripts/constant");
const HtmlJsToES5Plugin = require("./scripts/plugins/HtmlJsToES5Plugin");

const {DepReporter} = require('spark-log-event');

// const sparkConfig = require('../sparkrc');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const GitToHtmlPlugin = require("./scripts/plugins/GitToHtmlPlugin");
const JavaScriptObfuscator = require("javascript-obfuscator");

const PATH_ROOT = 'spark/v2';

const webpackProdConfig = function (cdnFolderName, resPathProd) {

  return {
    output: {
      publicPath: `//yun.duiba.com.cn/spark/v2/${cdnFolderName}/`,
      filename: isProd ? "js/[name].[contenthash:8].js" : "js/[name].[contenthash:4].js",
    },
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, './scripts/loaders')]
    },
    module: {
      rules: [
        {
          test: /sparkrc\.js$/,
          exclude: [path.resolve("node_modules")],
          use: [
            {
              loader: 'replaceLoader',
              options: {
                arr: [
                  {
                    replaceFrom: /(MOCK_STATUS: true)|(MOCK_STATUS:true)|("MOCK_STATUS": true)|("MOCK_STATUS":true)/,
                    replaceTo: '"MOCK_STATUS": false'
                  },
                  {
                    replaceFrom: /(RES_PATH:'\/src\/assets\/')|(RES_PATH: '\/src\/assets\/')|("RES_PATH":"\/src\/assets\/")|("RES_PATH": "\/src\/assets\/")/,
                    replaceTo: `"RES_PATH":"${resPathProd}/"`
                  }
                ]

              }
            }
          ]
        },
      ]
    },
    plugins: [
      new Webpack.IgnorePlugin(/[\\/]mock[\\/]/),
      new ScriptExtHtmlWebpackPlugin({
        custom: {
          test: /\.js$/,
          attribute: 'crossorigin',
          value: 'anonymous'
        }
      }),
      new GitToHtmlPlugin(),
      new HtmlJsToES5Plugin(),
      new DepReporter(),
      new Webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /zh-cn/,
      ),
    ],
    node: {
      crypto: 'empty'
    }
  };
};

const buildProd = async function () {

  const cdnFolderName = await getCdnFolderName();
  const appPath = process.cwd();
  const sparkConfig = require(path.join(appPath, SPARK_CONFIG));
  const _webpackProdConfig = await webpackProdConfig(cdnFolderName, sparkConfig.RES_PATH_PROD || '');

  //新增 JS_PATH_PROD 用作
  const newSparkCfg = Object.assign({}, sparkConfig);
  newSparkCfg['JS_PATH_PROD'] = `https://yun.duiba.com.cn/spark/v2/${cdnFolderName}/js`;
  const str = `module.exports =${JSON.stringify(newSparkCfg, null, 2)}`;
  fs.writeFileSync(path.join(appPath, SPARK_CONFIG), str);


  return new Promise((resolve, reject) => {
    const config = WebpackMerge(webpackBaseConfig(isProd), _webpackProdConfig);
    const compiler = Webpack(config);

    compiler.run(async (error, stats) => {
      if (error) {
        return reject(error);
      }
      console.log(
        stats.toString({
          chunks: false, // 使构建过程更静默无输出
          colors: true, // 在控制台展示颜色
        })
      );
      console.log(`${chalk.yellow("打包成功, 等待上传")}\n`);

      const files = fs.readdirSync(config.output.path + "/js");

      let fileName = "";
      for (let i = 0; i < files.length; i++) {
        if (files[i].endsWith('.js') && files[i].indexOf("main") == 0) {
          fileName = files[i];
        }
      }

      const js = fs.readFileSync(path.join(config.output.path, "js/" + fileName), "utf-8");

      const resJs = JavaScriptObfuscator.obfuscate(
        js,
        {
          debugProtectionInterval: 4000,
          debugProtection: true,

          // 单行输出
          compact: true,

          selfDefending: true,

          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.3,

          // 注入死代码
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.2,

          // 标识符名称生成器
          // hexadecimal			16进制 包体增大较多
          // mangled				短名称
          // mangled-shuffled		与mangled相同，但带有洗牌字母表
          // "identifier-names-generator": 'mangled-shuffled',

          // 数字转表达式 如:
          // const foo = 1234;
          // const foo=-0xd93+-0x10b4+0x41*0x67+0x84e*0x3+-0xff8;
          // numbersToExpressions: true,

          log: true,

          // 拆分字面字符串
          splitStrings: true,

          stringArray: true,
          stringArrayRotate: true,
          stringArrayCallsTransform: true,
          stringArrayCallsTransformThreshold: 1,
          stringArrayWrappersParametersMaxCount: 5,
          stringArrayThreshold: 1,

          // transformObjectKeys: true,
          target: "browser-no-eval",
        }
      );

      fs.writeFileSync(path.join(config.output.path, "js/" + fileName), resJs.getObfuscatedCode(), "utf-8");

      const uploader = new Uploader();

      await Promise.all([
        await uploader.uploadDir(
          config.output.path,
          `${PATH_ROOT}/${cdnFolderName}`,
          /.(html|map)$/
        ),
        await uploader.uploadDir(
          config.output.path + "/js",
          `${PATH_ROOT}/${cdnFolderName}/js/map_123_map`,
          /.(html|js|css|css\.map)$/
        ),
      ]);

      resolve();
    });

  });
};

buildProd();
