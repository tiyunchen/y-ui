const path = require('path');

exports.onCreateWebpackConfig = args => {
    args.actions.setWebpackConfig({
        resolve: {
            modules: [path.resolve(__dirname, '../src'), 'node_modules'],
            alias: {
                'y-ui/lib': path.resolve(__dirname, '../components/'),
                'y-ui/esm': path.resolve(__dirname, '../components/'),
                'y-ui': path.resolve(__dirname, '../components/'),
            },
        },
    });
};
