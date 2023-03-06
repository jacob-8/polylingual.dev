<!-- Q: How do I add a route matcher? Use the values: 'en' and 'zh-TW' -->

To add a route matcher, you can create a matcher function in your `params` directory and augment your routes. For example, to add matchers for the values 'en' and 'zh-TW', you can create two matcher functions in `src/params/lang.js`: 

```js
/// file: src/params/lang.js
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function matchEn(param) {
	return param === 'en';
}

/** @type {import('@sveltejs/kit').ParamMatcher} */
export function matchZhTw(param) {
	return param === 'zh-TW';
}
```

Then, you can augment your routes to use these matchers:

```diff
-src/routes/[lang]/home
+src/routes/[[lang]=langEn|langZhTw]]/home
```

Note that the `[[lang]]` parameter has been wrapped in another bracket pair to make it optional, and the `=langEn|langZhTw` has been added to specify the matchers to use for the `lang` parameter.