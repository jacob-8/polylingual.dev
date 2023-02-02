Let's use our dictionary to provide small bits of help text for reading characters. Start by creating a `Character.svelte` component. :zh: 讓我們使用我們的字典來提供一些幫助文本來閱讀字符。 首先創建一個 `Character.svelte` 組件。

[[src/routes/Character.svelte#02]]

Add the new component to `ClassicalText.svelte`. :zh: 將新組件添加到 `ClassicalText.svelte`。

[[src/routes/ClassicalText.svelte#08]]

Let's bring our dictionary back in, find the matching entry and isolate the first pronunciation, and the beginning of the first explanation but without punctuation. *You should know that the `$:` indicates a variable that reacts to updates of other variables.* :zh: 讓我們把我們的字典帶回來，找到匹配的條目並分離出第一個發音，以及第一個解釋的開頭但沒有標點符號。 *你應該知道 `$:` 表示一個對其他變量的更新做出反應的變量。*

[[src/routes/Character.svelte#03]]

Now let's style it. :zh: 現在讓我們設計它。

[[src/routes/Character.svelte#04]]

You'll notice that definitions for a few characters like "與" do not exist in our minimal dictionary. That may be because the meaning hasn't changed much between Classical and modern usage. In a full featured app we would catch this omission with either a small notice, or with a definiton from a modern Mandarin dictionary, but our purpose here is to create a quick and simple "proof of concept". :zh: 你會注意到像“與”這樣的幾個字符的定義在我們的最小字典中不存在。 這可能是因為含義在古典用法和現代用法之間沒有太大變化。 在一個功能齊全的應用程序中，我們會通過一個小通知或現代普通話詞典中的定義來捕捉這個遺漏，但我們在這裡的目的是創建一個快速簡單的“概念證明”。

