import { PluginOption, defineConfig } from 'vite';
import cssPurge from 'vite-plugin-purgecss';
import sassGlobImports from 'vite-plugin-sass-glob-import';

export default defineConfig(({ command }) => {
	const plugins: PluginOption[] | undefined = [
		sassGlobImports(),

		// @ts-ignore
		cssPurge()
	];

	return {
		plugins
	};
});
