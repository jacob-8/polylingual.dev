Now let's add a dictionary component named `ClassicalDefinitions.svelte` that will help us to study the unknown characters we click on. We'll start by simply exporting a `character` property and then displaying that using our `chinese_font` class at a larger size. :zh: 現在讓我們添加一個名為 ClassicalDefinitions.svelte 的字典組件，這將幫助我們研究我們點擊的未知字符。 我們將從簡單地導出一個“character”屬性開始，然後使用我們的“chinese_font”類以更大的尺寸顯示它。

[[src/routes/ClassicalDefinitions.svelte#02]]

Then we'll add it to our page, passing in `矛` to start with. :zh: 然後我們將把它添加到我們的頁面，傳入 `矛` 開始。

[[src/routes/+page.svelte#08]]

We also have a minimal dictionary Classical Chinese to Mandarin Chinese dictionary prepared in our data folder titled `classical_to_mandarin_dictionary_swords_shields.json` that we will now import into our component. After looking at the data, we can add an interface to provide type-checking. :zh: 我們還在名為“classical_to_mandarin_dictionary_swords_shields.json”的數據文件夾中準備了一個最小的字典 Classical Chinese to Mandarin Chinese dictionary，我們現在將其導入到我們的組件中。 查看數據後，我們可以添加一個接口來提供類型檢查。

[[src/routes/ClassicalDefinitions.svelte#03]]

Now let's lookup our character in the dictionary. :zh: 現在讓我們在字典中查找我們的字符。

[[src/routes/ClassicalDefinitions.svelte#04]]

Let's take that data and display it next to our character in a useful manner. You noticed that our character in focus is bolded with html so we'll use the `@html` syntax to render that properly. :zh: 讓我們獲取該數據並以有用的方式將其顯示在我們的角色旁邊。 你注意到我們的焦點字符用 html 加粗，因此我們將使用 `@html` 語法正確呈現它。

[[src/routes/ClassicalDefinitions.svelte#05]]

Now let's adjust the styling. :zh: 現在讓我們調整樣式。

[[src/routes/ClassicalDefinitions.svelte#06]]