---
en: Setup Frame
zh-TW: 版面設計
---

Let's begin by splitting our layout into halves, the top for reading and the bottom for a dictionary. :zh: 讓我們首先將我們的網頁分成兩半，頂部用於閱讀，底部用於字典。

> **Tip:** Add temporary background colors to help with initial layout design. :zh:

> **提示：** 添加暫時背景色以幫助我們區分兩個部分。

[[src/routes/+page.svelte#02]]

Now create a new stylesheet (push the add button and name it `global.css`) and import that stylesheet into our page: :zh: 現在創建一個新樣式表（按下添加按鈕並將其命名為`global.css`）。 將該樣式表導入我們的頁面：

[[src/routes/+page.svelte#03]]

Then lets give our html and body tags a height of 100%, and remove the default padding and margin: :zh: 然後讓我們的 html 和 body 標籤的高度為 100%，並刪除默認的填充和邊距：

[[src/global.css#02]]

And then use flexbox to take advantage of that 100% height. :zh: 然後使用 flexbox 來利用 100% 的高度。

[[src/routes/+page.svelte#04]]