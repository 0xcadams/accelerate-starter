const withPlugins = require("next-compose-plugins");

const withTypescript = require("@zeit/next-typescript");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const nextRuntimeDotenv = require("next-runtime-dotenv");

const withConfig = nextRuntimeDotenv({
  public: ["API_URL"]
});

module.exports = withPlugins(
  [[withTypescript], [withCSS], [withSass], [withBundleAnalyzer], [withConfig]],
  {
    target: "serverless",
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../bundles/server.html"
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            publicPath: "/_next/static/",
            outputPath: "static/",
            name: "[name].[ext]"
          }
        }
      });
      return config;
    }
  }
);
