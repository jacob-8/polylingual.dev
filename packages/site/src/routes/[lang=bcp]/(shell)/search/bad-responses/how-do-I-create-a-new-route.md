<!-- Q: How do I create a new route? -->
<!-- It lied because it never received enough info, didn't get https://kit.svelte.dev/docs/routing#page because that was the next section and nothing in talks about routes -->

At the heart of SvelteKit is a *filesystem-based router*. The routes of your app — i.e. the URL paths that users can access — are defined by the directories in your codebase: 
*   `src/routes` is the root route
*   `src/routes/about` creates an `/about` route
*   `src/routes/blog/[slug]` creates a route with a *parameter*, `slug`, that can be used to load data dynamically when a user requests a page like `/blog/hello-world`

To create a new route, create a new directory in `src/routes` with the desired name. For example, to create a route for `/contact`, create a new directory `src/routes/contact`. Inside this directory, create a new Svelte component file, for example `Contact.svelte`, which will be the component that is rendered when the user navigates to the `/contact` route. 

You can also create routes with parameters by including them in the directory name, enclosed in square brackets. For example, to create a route for `/blog/:slug`, create a new directory `src/routes/blog/[slug]`. Inside this directory, create a new Svelte component file, for example `BlogPost.svelte`, which will be the component that is rendered when the user navigates to a blog post with a specific slug. 

You can also create routes with a `+server.js` file (sometimes referred to as an 'API route' or an 'endpoint'), which gives you full control over the response. Your `+server.js` file (or `+server.ts`) exports functions corresponding to HTTP verbs like `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, and `OPTIONS` that take a `RequestEvent` argument and return a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object. 

```js
/// file: src/routes/api/random-number/+server.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const min = Number(url.searchParams.get('min') ?? '0');
	const max = Number(url.searchParams.get('max') ?? '1');

	const d = max - min;

	if (isNaN(d) || d < 0) {
		throw error(400, 'min and max must be numbers, and min must be less than max');
	}

	const random = min + Math.random() * d;

	return new Response(String(random));
}
``` 

Note that the bulk of your app, in `src/routes`, can be left where it is, but several project files will need to be moved or updated.