module.exports = function(config) {
    this.entry = {
        vendor: config.Path.join(config.Webpack_DIR, 'src/', 'assets/', 'js/', 'Controller', 'VendorController.js'),
        pubsub: config.Path.join(config.Webpack_DIR, 'src/', 'assets/', 'js/', 'Controller', 'PubSubController.js'),
    };

    this.alias = {
        SassPath: config.Path.resolve(config.Webpack_DIR, 'src/assets/scss/'),
        ViewPath: config.Path.resolve(config.Webpack_DIR, 'src/assets/js/View/'),
        ModulePath: config.Path.resolve(config.Webpack_DIR, 'src/assets/js/Modules/'),
        LibrariesPath: config.Path.resolve(config.Webpack_DIR, 'src/assets/js/Libraries/'),
        ControllerPath: config.Path.resolve(config.Webpack_DIR, 'src/assets/js/Controller/')
    };

    this.copyFiles = [
        {
            to: config.Path.join(config.Webpack_DIR, '../', 'assets/', 'images/'),
            from: config.Path.join(config.Webpack_DIR, 'src/', 'assets/', 'images/')
        },
        {
            to: config.Path.join(config.Webpack_DIR, '../', 'assets/'),
            from: config.Path.join(config.Webpack_DIR, 'src/', 'assets/', 'robots.txt')
        }
    ];

    this.createHtml = function() {
        return [
            // Pub Sub
            new config.HtmlWebpackPlugin({
                title: 'Pub-Sub Sample',
                inject: false,
                minify: {
                    removeComments: true,
                    useShortDoctype: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                },
                template: config.Path.join(
                    config.Webpack_DIR,
                    'src/',
                    'assets/',
                    'js/',
                    'View/',
                    'Templates/',
                    'Html/',
                    'index.html'
                ),
                filename: config.Path.join(
                    config.Webpack_DIR,
                    '../',
                    'index.html'
                ),
                assets: {
                    css: [
                        './assets/css/vendor.css',
                        './assets/css/pubsub.css'
                    ],
                    js: [
                        './assets/js/pubsub.js'
                    ]
                }
            }),
        ];
    };
}
