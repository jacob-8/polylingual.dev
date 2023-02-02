---
file_to_focus: src/routes/ClassicalText.svelte
---

Let's turn that data into something useful by looping over it sentence by sentence and placing each language in an equal sized box. :zh: 讓我們通過逐句循環並將每種語言放在一個大小相等的框中，將這些數據變成有用的東西。

[[src/routes/ClassicalText.svelte#03]]

> If you are new to [Svelte](https://svelte.dev/) and want to understand better how to use its syntax, for example `{#each items as item}{item}{/each}`, please take some time to go through the [Svelte tutorial](https://svelte.dev/tutorial/basics). Afterwards, you can learn more about [SvelteKit](https://kit.svelte.dev/) using [learn.svelte.dev](https://learn.svelte.dev/), *of which this site is modeled after*. :zh:

> 如果你是 [Svelte](https://svelte.dev/) 的新手並且想更好地了解如何使用它的語法，例如`{#each items as item}{item}{/each}`，請閱讀 花點時間閱讀 [Svelte 教程](https://svelte.dev/tutorial/basics)。 之後，你可以使用 [learn.svelte.dev](https://learn.svelte.dev/) 了解有關 [SvelteKit](https://kit.svelte.dev/) 的更多信息，*此站點是仿照的 後*。

Place a border around each sentence and give the Classical text a little more space. :zh: 在每個句子周圍放置一個邊框，並給經典文本多一點空間。

[[src/routes/ClassicalText.svelte#04]]

Let's emphasize our Classical text by using the `.chinese_font` class we prepared earlier. As well we want to make each sentence and each individual letter clickable for focused study. First let's break apart our sentences into individual letters and add some hover styles. :zh: 讓我們使用我們之前準備的 .chinese_font 類來強調我們的古典文本。 我們還想讓每個句子和每個單獨的字母都可以點擊以進行重點研究。 首先讓我們把句子分解成單獨的字母並添加一些懸停樣式

[[src/routes/ClassicalText.svelte#05]]

Then we'll show a simple alert on character or sentence click so we know that we're heading the right direction. :zh: 然後我們將在字符或句子點擊時顯示一個簡單的警報，以便我們知道我們正朝著正確的方向前進。

[[src/routes/ClassicalText.svelte#06]]

In the future we'll replace this alert with a function that pulls up the desired word in our dictionary. :zh: 將來，我們將用一個在我們的字典中提取所需單詞的函數來替換此警報。