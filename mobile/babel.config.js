module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './src',
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@services': './src/services',
                        '@store': './src/store',
                        '@hooks': './src/hooks',
                        '@theme': './src/theme',
                        '@types': './src/types',
                        '@utils': './src/utils',
                        '@constants': './src/constants',
                        // Redirect native-base to our custom UI components
                        'native-base': './src/components/ui/index',
                    },
                },
            ],
        ],
    };
};
