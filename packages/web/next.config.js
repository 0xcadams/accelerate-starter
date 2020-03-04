const withPlugins = require('next-compose-plugins');

const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withOffline = require('next-offline');
const withOptimizedImages = require('next-optimized-images');
const withSourceMaps = require('@zeit/next-source-maps')();

module.exports = withPlugins(
  [
    [withOptimizedImages],
    [withSourceMaps],
    [withCSS],
    [withSass],
    [withBundleAnalyzer],
    [withOffline]
  ],
  {
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    },
    env: {
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
    },
    target: 'serverless',
    webpack: (config, options) => {
      // In `pages/_app.js`, Sentry is imported from @sentry/node. While
      // @sentry/browser will run in a Node.js environment, @sentry/node will use
      // Node.js-only APIs to catch even more unhandled exceptions.
      //
      // This works well when Next.js is SSRing your page on a server with
      // Node.js, but it is not what we want when your client-side bundle is being
      // executed by a browser.
      //
      // Luckily, Next.js will call this webpack function twice, once for the
      // server and once for the client. Read more:
      // https://nextjs.org/docs#customizing-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle
      if (!options.isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      config.plugins = config.plugins || [];

      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader'
      });

      return config;
    },
    workboxOpts: {
      swDest: 'static/service-worker.js',
      runtimeCaching: [
        {
          urlPattern: /^https.*\/api\//,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'https-calls',
            networkTimeoutSeconds: 10,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 60 * 60 // 1 hour
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
);
