Now we need take the characters clicked on in our `ClassicalText.svelte` component and pass them to our `ClassicalDefinitions.svelte` component. There are many ways to pass and share data between sibling components, and we'll choose one: emitting an event that will change a variable in the parent component that can then be handed to the sibling component. :zh: 現在我們需要將在我們的 ClassicalText.svelte 組件中單擊的字符傳遞給我們的 ClassicalDefinitions.svelte 組件。 在同級組件之間傳遞和共享數據的方法有很多種，我們將選擇一種：發出一個事件，該事件將更改父組件中的變量，然後可以將其傳遞給同級組件。

Emit an event when a character is clicked on: :zh: 單擊字符時發出事件：

[[src/routes/ClassicalText.svelte#07]]

> Tip: It is a good idea to place your `import` statements at the top of the `script` block. Sometimes during this tutorial, however, to make our code changes easier to follow we will include the `import` statements right next to where they're needed. :zh:
>
> 提示：將 `import` 語句放在 `script` 塊的頂部是個好主意。 然而，在本教程中，有時為了使我們的代碼更改更容易理解，我們將在需要它們的地方添加 `import` 語句。

Now, let's listen to that event in the parent with a simple alert and try clicking on a few characters to test. :zh: 現在，讓我們通過一個簡單的警報在父級中收聽該事件，並嘗試單擊幾個字符進行測試。

[[src/routes/+page.svelte#09]]

Then save it to a variable that is passed down to our `ClassicalDefinitions.svelte` component. :zh: 然後將其保存到傳遞給我們的“ClassicalDefinitions.svelte”組件的變量中。

[[src/routes/+page.svelte#10]]

Try clicking on unknown characters now. :zh: 現在嘗試點擊未知字符。
