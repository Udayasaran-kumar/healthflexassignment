const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return mergeConfig(defaultConfig, {
    resolver: {
      sourceExts: [...defaultConfig.resolver.sourceExts, 'ts', 'tsx'],
    },
  });
})();