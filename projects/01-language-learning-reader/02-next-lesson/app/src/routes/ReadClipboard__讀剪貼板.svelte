<script lang="ts">
	import { onMount } from 'svelte';

	let text__字符串: string = '';

	onMount(() => {
		const milliseconds_between_checks__檢查之間的毫秒數 = 300;
		const check_clipboard_interval__檢查剪貼板之間的時間 = setInterval(read_clipboard__讀剪貼板, milliseconds_between_checks__檢查之間的毫秒數);
		return () => clearInterval(check_clipboard_interval__檢查剪貼板之間的時間);
	});

	async function read_clipboard__讀剪貼板() {
		const document_has_focus = document.hasFocus();
		if (!document_has_focus) return;

		text__字符串 = (await navigator.clipboard.readText()) || '';
	}
</script>

<div style="margin-bottom: .5rem; font-size: 80%;">From clipboard:__剪貼板內容</div>

{#if text__字符串}
	<slot {text__字符串} />
{:else}
	<i>Focus this window with some text in the clipboard.__複製一些文字然後聚焦這個窗口</i>
{/if}
