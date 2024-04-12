
const { SPARK_CONFIG } = require("./scripts/constant");

const Webpack = require("webpack");
const webpackBaseConfig = require("./webpack.common.config");
const WebpackMerge = require("webpack-merge");
const WebpackDevServer = require("webpack-dev-server");
const opn = require("opn");
const apiMocker = require('mocker-api');
const path = require('path');
const { getProcessIdOnPort } = require("./scripts/utils");

const {isPortAvailable} = require("./scripts/utils");

const sparkConfig = require(path.resolve(SPARK_CONFIG));

const webpackDevConfig = function () {
  return {
    devServer: {
      useLocalIp: true,
      open: false,
      hot: true,
      host: "0.0.0.0",
      // hotOnly: true
      before(app) {
        app.use(/^\/$/, async (req, res, next) => {
          const send = res.send.bind(res);
          res.send = (body) => {
            let result = body.toString();
            result = result.replace('${APPID}', 'test');
            send(result);
          }
          next();
        })
        if (sparkConfig.API_MOCK) {
          apiMocker(app, path.resolve('./mock/index.js'), {
            changeHost: true,
          })
        }

      }
    },
    plugins: [
      // new Webpack.WatchIgnorePlugin([/[\\/]mock[\\/]/]),
      new Webpack.HotModuleReplacementPlugin()
    ]
  };
};

const buildDev = async function (config) {
  const { port } = config;
  return new Promise(async (resolve, reject) => {
    const config = WebpackMerge(webpackBaseConfig(false), webpackDevConfig());
    const compiler = Webpack(config);
    const devServerOptions = Object.assign({}, config.devServer);
    console.log('devServerOptions', devServerOptions);

    const server = new WebpackDevServer(compiler, devServerOptions);

    let i = 0;
    for (; i < 100; i++) {
      const canUse = await isPortAvailable(port + i, "0.0.0.0");
      console.log(port + i, canUse)
      if (canUse) {
        break;
      }
    }

    server.listen(
      port + i || 8088,
      "0.0.0.0",
      () => {
        console.log(`Starting server on http://localhost:${port}`);
        opn(`http://localhost:${port + i || 8088}`);
        resolve();
      },
      (err) => {
        if (err) console.error("server linsten err--", err);
        reject();
      }
    );
  });
};
const args = process.argv.splice(2);
const port = args[0] || 8088
buildDev({
  port: Number(port)
})

