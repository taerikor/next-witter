const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  
  module.exports = withBundleAnalyzer({
    distDir: '.next',
    webpack(config, { webpack }) {
      const prod = process.env.NODE_ENV === 'production';
      const plugins = [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
      ];
      return {
        ...config,
        mode: prod ? 'production' : 'development',
        devtool: prod ? 'hidden-source-map' : 'eval',
        plugins,
      };
    },
  });