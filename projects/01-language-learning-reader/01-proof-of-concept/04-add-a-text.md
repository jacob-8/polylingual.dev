---
en: Add a Text
zh-TW: 添加文本
---

Create a `ClassicalText.svelte` component to hold our first text that we want help reading. :zh: 創建一個 `ClassicalText.svelte` 組件。我們會把一本想要幫助閱讀的文本方在這裡。

Add an interface for a multilingual sentence with Classical Chinese, Mandarin, and English. Then export a `sentences` property from the component which is typed as an array of multilingual sentences. :zh: 添加文言文、中文、英文的多語言句子界面。 然後從類型為多語言句子數組的組件中導出一個 `sentences` 屬性。

[[src/routes/ClassicalText.svelte#02]]

> I use `JSON.stringify` to easily examine data as I build a component. :zh: 
> 我在構建組件時使用 `JSON.stringify` 輕鬆檢查數據。


You may have noticed the `data` folder, which has a JSON file containing a small excerpt called "Swords and Shields" written by Hán Fēi Zǐ (book of Legalist Philosophy authored by Hán Fēi 韓非 during the Warring States Period, 475-220 BC). Import this in our `+page.svelte` file and pass it to the `ClassicalText.svelte` component. :zh: 你可能已經註意到 `data` 文件夾，其中有一個 JSON 文件，有韓非子寫的名為《矛盾》的一小段摘錄。 將其導入我們的 `+page.svelte` 文件並將其給 `ClassicalText.svelte` 組件。

[[src/routes/+page.svelte#06]]

We have an overflow problem that we need to fix. :zh: 我們有一個需要修復的溢出問題。

[[src/routes/+page.svelte#07]]
