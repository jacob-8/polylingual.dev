---
en: Save Known Characters
zh-TW: 保存已知文字
---

As we read Classical Chinese there are many characters we already know well. Having hints show for them will just create extra noise and make it hard to read. Let's create a quick way to mark additional characters as known. :zh: 當我們閱讀文言文時，有許多我們已經熟知的字。 展示它們只會讓閱讀比較難。 讓我們創建一種快速方法來將其他字標記為已知。

First we'll create a demo list of known characters and only show helps if a character is not already "known". :zh: 首先，我們將創建一個已知字的演示列表。 然後只不“已知”的字會有提示。

[[src/routes/Character.svelte#05]]

> We use the [module context](https://svelte.dev/tutorial/sharing-code) script block, `<script lang="ts" context="module">`, to easily share state between component instances (each individual character). :zh: 
> 在組件實例之間，如果你要容易得分享狀態，可以使用 [module context](https://svelte.dev/tutorial/sharing-code) 腳本塊，`<script lang="ts" context="module">`。

Then add the ability to use the right-click button to toggle known status. *In the future, we'll save known characters to a database.* :zh: 然後添加使用右鍵單擊按鈕切換已知狀態的功能。 *將來，我們會將已知字保存到數據庫中。*

[[src/routes/Character.svelte#06]]

Try right-clicking on characters to toggle the helps. :zh: 右鍵單擊字以切換幫助。