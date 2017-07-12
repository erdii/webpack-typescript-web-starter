const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTemplate = require("html-webpack-template");

module.exports = (env) => {
	const PATHS = {
		src: path.join(__dirname, "src"),
		entry: "index.tsx",
		output: path.join(__dirname, "build"),
		bundle: "app.js",
	};

	// default config
	const config = {
		context: PATHS.src,

		entry: path.join(PATHS.src, PATHS.entry),

		target: "web",

		output: {
			path: PATHS.output,
			filename: PATHS.bundle,
			publicPath: "/",
		},

		resolve: {
			extensions: [".tsx", ".ts", ".js", ".json", "*"],
			modules: ["node_modules"],
			unsafeCache: true,
		},

		module: {
			rules: [
				{
					test: /\.html$/,
					use: "html-loader",
					include: [PATHS.src],
				},
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					include: [PATHS.src],
				},
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				filename: "index.html",
				inject: false,
				template: HtmlWebpackTemplate,
				appMountId: "main",
				title: "wmtt ❤️",
				mobile: false,
				meta: [
					{
						name: "viewport",
						content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
					}
				],
				links: [],
				minify: {
					html5: true,
					collapseWhitespace: true,
				},
			}),
		],
	};

	// environments
	switch(env.target) {
		case "dev":
			config.devServer = {
				host: "0.0.0.0",
				port: 3000,
				public: "localhost:3000",
				publicPath: "/",
				disableHostCheck: true,
				historyApiFallback: true,
				hot: false,
				stats: "errors-only",
			};
			console.log(config.devServer);
			break;
		case "test":
			break;
		case "prod":
			break;
		default:
			console.error("Please call webpack with `--env.target=dev|test|prod`");
			process.exit(1);
	}

	return config;
}
