const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTemplate = require("html-webpack-template");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
	const PATHS = {
		src: path.join(__dirname, "src"),
		entry: "index.tsx",
		output: path.join(__dirname, "build"),
		bundle: "js/app.[hash].js",
		css: "css/[name].[contenthash].css"
	};

	// default config
	const config = {
		context: PATHS.src,

		entry: [path.join(PATHS.src, PATHS.entry)],

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
					use: ["html-loader"],
					include: [PATHS.src],
				},
				{
					test: /\.tsx?$/,
					use: ["ts-loader"],
					include: [PATHS.src],
				},
				// less rule is added later
			],
		},

		plugins: [
			new HtmlWebpackPlugin({
				filename: "index.html",
				inject: false,
				template: HtmlWebpackTemplate,
				appMountId: "main",
				title: "Typescript + React",
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
			// less -> css
			config.module.rules.push({
				test: /\.less$/,
				use: ["style-loader", "css-loader", "less-loader"],
				include: [PATHS.src],
			});

			// sourcemaps
			config.devtool = "cheap-module-source-map";

			// hot reloading
			config.entry.unshift("react-hot-loader/patch");
			config.module.rules.find(rule => rule.test.source === "\\.tsx?$").use.unshift("react-hot-loader/webpack")
			config.plugins.unshift(
				new webpack.NamedModulesPlugin(),
				new webpack.HotModuleReplacementPlugin(),
			);

			// dev server
			config.devServer = {
				host: "0.0.0.0",
				port: 3000,
				public: "localhost:3000",
				publicPath: "/",
				disableHostCheck: true,
				historyApiFallback: true,
				hot: true,
				stats: "errors-only",
			};
			break;

		case "test":
			break;

		case "prod":
			// build css into a separate file
			const extractLess = new ExtractTextPlugin({
				filename: PATHS.css,
			});

			config.module.rules.push({
				test: /\.less$/,
				use: extractLess.extract({
					use: ["css-loader", "less-loader"],
				}),
				include: [PATHS.src],
			});

			config.plugins.push(extractLess);
			break;
		default:
			console.error("Please call webpack with `--env.target=dev|test|prod`");
			process.exit(1);
	}

	console.log(require("util").inspect(config, false, 4));

	return config;
}
