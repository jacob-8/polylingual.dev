---
en: Secure Your API
zh-TW: 保護 API
initial_url: /explain
file_to_focus: src/routes/api/paraphrase/+server.ts
---

Before we deploy this, we need to make sure that our API key is secure. We don't want to expose it to the world.

Because we don't have any authentication provider added to this app yet, we'll just use an arbitrary string to simulate for the moment:

[[src/routes/api/paraphrase/+server.ts#08]]

Now try to submit a request to your `/paraphrase` API. You should get an error.

Now add your fake authentication to the client side.

[[src/routes/explain/paraphrase.ts#04]]

Our endpoint works again, but now it is secure from outside access (assuming we set up real authentication in the future).