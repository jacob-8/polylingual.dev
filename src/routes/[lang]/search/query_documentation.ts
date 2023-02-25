export async function query_documentation(text: string): Promise<string> {
  const response = await fetch('/api/query', {
    method: 'POST',
    body: JSON.stringify({
      text,
      auth_token: 'ADD_FIREBASE_AUTH_TO_SET_THIS_UP',
    }),
    headers: {
      'content-type': 'application/json'
    }
  });

  const body = await response.json();
  
  if (response.status !== 200) {
    throw new Error(`Status: ${response.status}, Error: ${JSON.stringify(body, null, 2)}`);
  }

  return body;
}