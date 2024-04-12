const HtmlWebpackPlugin = require("html-webpack-plugin");
const { exec } = require('child_process');
class GitToHtmlPlugin {
    process(htmlPluginData) {
        return new Promise(function (resolve) {
            let gitStr = '';
            exec('git remote -v & git branch --show-current & git config --global user.name', (_err, stdout, _stderr) => {
                if (stdout) {
                    gitStr = `<script>CFG.___G___='${encodeURIComponent(stdout.replace(/\n/g, ';'))}'</script>`
                }
                htmlPluginData.html = htmlPluginData.html.replace('</body>', `${gitStr}</body>`);
                resolve();
            });
        });
    };

    apply(compiler) {
        compiler.hooks.compilation.tap('GitToHtmlPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
                "GitToHtmlPlugin",
                async (html, cb) => {
                    await this.process(html);
                    cb(null, html);
                }
            );
        });
    }
}

module.exports = GitToHtmlPlugin;
