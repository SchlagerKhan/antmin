import path from 'path';

import { Configuration } from 'webpack';

import TsPathsPlugin from 'tsconfig-paths-webpack-plugin';
import createStyledTransformer from 'typescript-plugin-styled-components';

const styledTransformer = createStyledTransformer();

const config: Configuration = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		filename: 'index.js',
		path: path.resolve('./lib'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		plugins: [
			new TsPathsPlugin({
				configFile: '../../tsconfig.json',
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({ before: [styledTransformer] }),
				},
			},
		],
	},
};

export default config;
