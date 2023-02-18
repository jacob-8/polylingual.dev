import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';
export const actions = {
  default: async ({ request }) => {
    await new Promise((fulfil) => setTimeout(fulfil, 1000));
    const data = await request.formData();
    try {
      // db.createTodo(data.get('text_to_explain'));
    } catch (error) {
      return fail(422, {
        description: data.get('text_to_explain'),
        error: error.message
      });
    }
  }
} satisfies Actions;
