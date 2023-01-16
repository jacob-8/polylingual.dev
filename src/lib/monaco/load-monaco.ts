import { browser, dev } from '$app/environment';

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

let monaco: typeof import('monaco-editor');

if (browser) {
	if (dev && !/chrome/i.test(navigator.userAgent)) {
		throw new Error(
			'The code editor requires Chrome during development, as it uses module workers'
		);
	}

	self.MonacoEnvironment = {
		getWorker: function (_moduleId: string, label: string) {
			switch (label) {
				case 'json':
					return new jsonWorker();
				case 'css':
				case 'scss':
				case 'less':
					return new cssWorker();
				case 'html':
					return new htmlWorker();
				case 'javascript':
				case 'typescript':
					return new tsWorker();
				default:
					return new editorWorker();
			}
		}
	};

	monaco = await import('monaco-editor');
}

export { monaco };
