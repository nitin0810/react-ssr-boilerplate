module.exports = function (api) {
  // invalidate the cache when building for client and server
  // so that babel config is computed fresh in both cases
  api.cache.invalidate(() => process.env.BUILD_TARGET)
  const buildTarget = process.env.BUILD_TARGET;
  const presets = [
    [
      '@babel/preset-env',
      buildTarget === 'browser' &&
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }

    ].filter(Boolean),
    '@babel/preset-react'
  ];

  const plugins = [
    '@loadable/babel-plugin',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ];

  return {
    presets,
    plugins
  };
};
