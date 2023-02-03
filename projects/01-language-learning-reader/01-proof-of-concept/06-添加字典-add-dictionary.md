Now let's add a dictionary component named `ClassicalDefinitions.svelte` that will help us to study the unknown characters we click on. We'll start by simply exporting a `character` property and then displaying that using our `chinese_font` class at a larger size. :zh: 添加一個名為 `ClassicalDefinitions.svelte` 的字典組件，這將幫助我們了解未知字。 我們將從簡單地導出一個 `character` 屬性開始。然後使用我們的 `.chinese_font` 類以更大的尺寸顯示它。

[[src/routes/ClassicalDefinitions.svelte#02]]

Then we'll add it to `+page.svelte`, passing in `矛`. :zh: 然後把它添加到 `+page.svelte`，傳入 `矛`。

[[src/routes/+page.svelte#08]]

We also have a minimal Classical Chinese to Mandarin Chinese dictionary prepared in our data folder titled `classical_to_mandarin_dictionary_swords_shields.json` that we will now import into our component. After looking at the data, we can add an interface to provide type-checking. :zh: 我們還有 `classical_to_mandarin_dictionary_swords_shields.json` 的數據文件夾中準備了。這是一個最小的文言文到中文字典。將其導入到我們的組件中。 查看數據後，我們可以添加一個接口來提供類型檢查。

[[src/routes/ClassicalDefinitions.svelte#03]]

Now let's lookup our character in the dictionary. :zh: 在字典中查找我們的字。

[[src/routes/ClassicalDefinitions.svelte#04]]

Let's take that data and display it next to our character in a useful manner. Because our character in focus is surrounded with `<b>` tags we'll use the `@html` syntax to display them properly. :zh: 我們把該數據放在我們的字旁邊。 因為我們注意的字被 `<b>` 包圍，所以我們將使用 `@html` 語法來正確顯示它們。

[[src/routes/ClassicalDefinitions.svelte#05]]

Now let's improve the styling. :zh: 改善樣式。

[[src/routes/ClassicalDefinitions.svelte#06]]