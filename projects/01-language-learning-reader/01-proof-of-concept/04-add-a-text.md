Let's create a `ClassicalText.svelte` component to hold our first text that we want help reading. :zh: 讓我們創建一個 `ClassicalText.svelte` 組件來保存我們想要幫助閱讀的第一個文本。

Define an interface for a multilingual sentence with Classical Chinese, Mandarin, and English. Then export a `sentences` prop from the component which is typed as an array of multilingual sentences. :zh: 為包含文言文、普通話和英文的多語言句子定義界面。 然後從組件中導出一個 `sentences` prop，它被鍵入為一個多語言句子數組。

[[src/routes/ClassicalText.svelte#02]]

As a prototyping convenience, I like to use `JSON.stringify` to look at incoming data as I'm building for a quick feedback loop until I have a chance to build out my component. :zh: 為了方便原型製作，我喜歡使用 `JSON.stringify` 查看傳入數據，因為我正在構建一個快速反饋循環，直到我有機會構建我的組件。


You may have noticed the data folder, which has json file containing a small excerpt called "Swords and Shields" from Hán Fēizǐ. We can now import this into our `+page.svelte` file and pass it to the `ClassicalText.svelte` component. :zh: 你可能已經註意到數據文件夾，其中有一個 json 文件，其中包含一個名為“Swords and Shields”的 Hán Fēizǐ 的小摘錄。 我們現在可以將其導入我們的 `+page.svelte` 文件並將其傳遞給 `ClassicalText.svelte` 組件。

[[src/routes/+page.svelte#06]]

We have an overflow problem that we need to fix: :zh: 我們有一個需要修復的溢出問題：

[[src/routes/+page.svelte#07]]
