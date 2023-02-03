Let's use our dictionary to provide small bits of help text for reading characters. Start by creating a `Character.svelte` component. :zh: 使用我們的字典來提供一些怎麼閱讀提醒。 首先創建一個 `Character.svelte` 組件。

[[src/routes/Character.svelte#02]]

Add the new component to `ClassicalText.svelte`. :zh: 將新組件添加到 `ClassicalText.svelte`。

[[src/routes/ClassicalText.svelte#08]]

Let's import our dictionary again. *In future lessons, we will improve our code so that we only need to import the dictionary once, but right now we are just trying to go fast in order to try our proof of concept.* Use the dictionary to find the matching entry and isolate the first pronunciation, and the beginning of the first explanation but without punctuation. :zh: 我們再次導入我們的字典。 *在以後的課程中，我們將改善我們的代碼，這樣我們只需要導入字典一次，但現在我們只是想快點來嘗試我們的驗證。*使用字典找到匹配的條目和第一個發音和第一個解釋的開頭。但沒有標點符號。

> You should know that the `$:` indicates a variable that reacts to updates of other variables. :zh: 
> 你應該知道 `$:` 表示一個對其它變量的更新做出反應的變量。

[[src/routes/Character.svelte#03]]

Now let's style it. :zh: 我們設計它。

[[src/routes/Character.svelte#04]]

You'll notice that definitions for a few characters like "與" do not exist in our minimal dictionary. That may be because the meaning hasn't changed much between Classical and modern usage. In a full featured website we would use a definiton from a modern Mandarin dictionary, but our purpose here is to create a quick and simple "proof of concept". :zh: 你會注意到像“與”這樣的幾個字的定義在我們的最小字典中不存在。 這可能是因為意思在古典用法和現代用法之間沒有太大變化。 在一個功能齊全的網站中，我們會用現代中文詞典中的定義。但是今天我們的目的是創建一個快速簡單的“驗證”。

