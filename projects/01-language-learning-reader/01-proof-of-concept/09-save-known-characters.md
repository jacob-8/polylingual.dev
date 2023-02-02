As we read Classical Chinese there are many characters we already know well. Having helps show for them will just create extra noise and make it hard to read. Let's create a quick way to mark additional characters as known. :zh: 當我們閱讀文言文時，有許多我們已經熟知的字。 為他們展示幫助只會產生額外的噪音並使其難以閱讀。 讓我們創建一種快速方法來將其他字符標記為已知。

First we'll create a demo list of known characters and only show helps if a character is not already "known". :zh: 首先，我們將創建一個已知字符的演示列表，並且僅在字符尚未“known”時顯示幫助。

[[src/routes/Character.svelte#05]]

Then add the ability to use the right-click button to toggle known status. *In the future, we'll save known characters to a database.* :zh: 然後添加使用右鍵單擊按鈕切換已知狀態的功能。 *將來，我們會將已知字符保存到數據庫中。*

[[src/routes/Character.svelte#06]]

Try right-clicking on characters to toggle the helps. :zh: 嘗試右鍵單擊字符以切換幫助。