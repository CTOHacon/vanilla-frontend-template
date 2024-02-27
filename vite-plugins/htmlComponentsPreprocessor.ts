import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

const COMPONENT_DIR = 'components'; // Directory for component templates

export default function htmlPreprocessorPlugin(): Plugin {
	return {
		name: 'html-preprocessor',
		transform: transformCode,
		transformIndexHtml: transformHtml,
		configureServer: configureServer
	};
}

function transformCode(code: string, src: string): string {
	if (!src.endsWith('.html')) {
		return code;
	}
	const processedHtml = processHtml(code);
	return processedHtml;
}

function transformHtml(html: string): string {
	return processHtml(html);
}

function configureServer(server: any): void {
	server.watcher.add(path.join(process.cwd(), COMPONENT_DIR));

	server.watcher.on('change', (file: string) => {
		if (file.includes(COMPONENT_DIR)) {
			server.ws.send({
				type: 'full-reload'
			});
		}
	});
}

function processHtml(html: string): string {
	const componentRegex = /<(\w+-\w+)([^>]*)\/>/g;
	return html.replace(componentRegex, replaceComponent);
}

function replaceComponent(
	match: string,
	tagName: string,
	propsString: string
): string {
	const componentPath = path.join(COMPONENT_DIR, `${tagName}.html`);
	if (!fs.existsSync(componentPath)) return match;

	const componentTemplate = fs.readFileSync(componentPath, 'utf-8');
	let processedTemplate = interpolateProps(componentTemplate, propsString);

	processedTemplate = processHtml(processedTemplate);

	return processedTemplate;
}

function interpolateProps(template: string, propsString: string): string {
	const props = parseProps(propsString);
	const propRegex = /\[\[\s*(\w+)\s*\]\]/g;
	return template.replace(propRegex, (match, propName) => {
		return props[propName] || '';
	});
}

function parseProps(propsString: string): Record<string, string> {
	const props: Record<string, string> = {};
	const propRegex = /(\w+)="([^"]+)"/g;
	let match: RegExpExecArray | null;
	while ((match = propRegex.exec(propsString))) {
		const [, propName, propValue] = match;
		props[propName] = propValue;
	}
	return props;
}
