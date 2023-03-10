---
en: Display Sentences
zh-TW: 展示句子
file_to_focus: src/routes/ClassicalText.svelte
---

Let's turn that data into something useful by looping over it sentence by sentence and placing each language in a box. :zh: 將這些數據變成有用的句子。將每種語言放在一個框中。

[[src/routes/ClassicalText.svelte#03]]

> If you are new to [Svelte](https://svelte.dev/), please take some time to go through the [Svelte tutorial](https://svelte.dev/tutorial/basics). Afterwards, learn about [SvelteKit](https://kit.svelte.dev/) using [learn.svelte.dev](https://learn.svelte.dev/). Then resume this course and you will understand the additional syntax pieces that Svelte adds on top of regular HTML, like `{#each...` for example. :zh: > 如果你是 [Svelte](https://svelte.dev/) 的新手，請花一些時間閱讀 [Svelte 教程](https://svelte.dev/tutorial/basics)。 之後，使用 [learn.svelte.dev](https://learn.svelte.dev/) 了解 [SvelteKit](https://kit.svelte.dev/)。 你將了解 Svelte 怎麼把正常的 HTML 之上添加的額外語法，例如 `{#each...`。然後你可以繼續這門課。

Place a border around each sentence and give the Classical text a little more space. :zh: 在每個句子周圍放置一個邊框，並給文言文本多一點空間。

[[src/routes/ClassicalText.svelte#04]]

Let's emphasize our Classical text by using the `.chinese_font` class. We also want to make each character clickable for focused study. First, break apart each sentences into individual characters. Next, add some hover styles. :zh: 我們使用 `.chinese_font` 類來強調我們的文言文字。 為了研究每個字，我們想讓它可以單擊。 首先，將每個句子分解成單獨的字。 接下來，添加一些懸停樣式。

[[src/routes/ClassicalText.svelte#05]]

Then we'll show a simple alert on character click so we know that we're heading the right direction. :zh: 然後我們將在字單擊時顯示一個簡單的警報/通知，所以我們知道我們正朝著正確的方向前進。

[[src/routes/ClassicalText.svelte#06]]

In the future we'll replace this alert with a function that pulls up the desired word in our dictionary. :zh: 後來，我們將用一個在我們的字典中提取所需字函數來替換此警報。