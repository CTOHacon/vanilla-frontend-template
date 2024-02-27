import { BuildOptions, PluginOption, defineConfig } from 'vite';
import cssPurge from 'vite-plugin-purgecss';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import htmlPreprocessorPlugin from './vite-plugins/htmlComponentsPreprocessor';
import { resolve } from 'path';

export default defineConfig(() => {
	const plugins: PluginOption[] | undefined = [
		htmlPreprocessorPlugin(),
		sassGlobImports()

		// @ts-ignore
		// cssPurge()
	];

	const build: BuildOptions = {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				docs: resolve(__dirname, 'docs.html')
			}
		}
	};

	return {
		plugins,
		build
	};
});
