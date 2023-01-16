<script lang="ts">
	import sdk, { type VM, type Project, type EmbedOptions } from '@stackblitz/sdk';
	import { onMount } from 'svelte';

	let embedElement: HTMLDivElement;
	let vm: VM;

	const project: Project = {
		title: 'Foo',
		description: 'Created with <3 by the StackBlitz SDK!',
		template: 'node',
		files: {
			'index.js': `console.log('Hello World!');`,
			'package.json': `{
            "name": "my-project",
            "scripts": { "hello": "node index.js", "start": "serve node_modules"},
            "dependencies": { "serve": "^14.0.0" },
            "stackblitz": { "installDependencies": true, "startCommand": "npm start" }
          }`,
		},
		settings: {
			compile: { trigger: 'keystroke' },
		},
	};
	const embedOptions: EmbedOptions = {
		openFile: 'index.js',
		hideExplorer: true,
		view: 'preview',
	};

	onMount(async () => {
		vm = await sdk.embedProject(embedElement, project, embedOptions);
	});

	async function writeToFiles() {
		if (!vm) {
			console.error('Stackblitz SDK vm is not available');
			return;
		}

		await vm.applyFsDiff({
			create: {
				'index.js': `console.log('Hello World!')`,
				'package.json': `{ "scripts": { "start": "node index.js" } }`,
			},
			destroy: ['test.js', 'error.log'],
		});
	}
</script>

<div class="iframe-container h-full overflow-hidden">
	<div bind:this={embedElement} />
</div>

<style>
	.iframe-container :global(iframe) {
		height: 100%;
		border: 0;
	}
</style>
