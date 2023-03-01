import { get } from 'svelte/store';
import { authState } from 'sveltefirets';

export async function query_documentation(text: string): Promise<string> {
  const user = get(authState);
  if (!user) throw new Error('Not logged in.')
  const auth_token = await user.getIdToken();

  const response = await fetch('/api/query', {
    method: 'POST',
    body: JSON.stringify({
      text,
      auth_token,
    }),
    headers: {
      'content-type': 'application/json'
    }
  });

  const body = await response.json();

  if (response.status !== 200) {
    throw new Error(`Status: ${response.status}, Error: ${JSON.stringify(body, null, 2)}`); // or response.statusText
  }

  return body;
}