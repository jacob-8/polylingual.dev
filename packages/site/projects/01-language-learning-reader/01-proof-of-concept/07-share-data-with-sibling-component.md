---
en: Share Data with Sibling Components
zh-TW: 與兄弟組件共享數據
---

Now we need take the characters clicked on in our `ClassicalText.svelte` component and pass them to our `ClassicalDefinitions.svelte` component. There are many ways to pass and share data between sibling components, and we'll choose to **dispatch** an event that will change a variable in the parent component. This variable can then be handed to the sibling component. :zh: 我們需要把 `ClassicalText.svelte` 組件中單擊的字給 `ClassicalDefinitions.svelte` 組件。 有很多方法可以在同級組件之間份享數據。我們將選擇**發出**一個將更改父組件中的變量的事件。 然後可以將該變量給兄弟組件。

Emit an event when a character is clicked on: :zh: 單擊字時發出事件：

[[src/routes/ClassicalText.svelte#07]]

> Tip: It is a good idea to place your `import` statements at the top of the `script` block. Sometimes during this tutorial, however, to make our code changes easier to follow we will include the `import` statements right next to where they're needed. :zh: > 提示：將 `import` 語句放在 `script` 的頂部是個好主意。 然而，在本教程中，有時為了使我們的代碼更改更容易理解，我們將在需要它們的地方添加 `import` 語句。我們將在靠近使用它們的地方添加 `import` 語句。

Let's listen to that event in the parent with a simple alert and try clicking on a few characters to test. :zh: 我們用一個簡單的警報在父級中收聽該事件。然後單擊幾個字。

[[src/routes/+page.svelte#09]]

Then save it to a variable that is passed down to our `ClassicalDefinitions.svelte` component. :zh: 然後將其保存到給我們的 `ClassicalDefinitions.svelte` 組件的變量中。

[[src/routes/+page.svelte#10]]

Try clicking on unknown characters now. :zh: 單擊未知字。
