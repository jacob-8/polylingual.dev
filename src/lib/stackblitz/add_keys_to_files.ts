import type { ProjectFiles } from "@stackblitz/sdk";
import { browser } from '$app/environment';

export function check_or_ask_for_key(files: ProjectFiles): ProjectFiles {
  if (!browser) return files;
  
  const needs_key = files['.env.local']?.includes('<ask-me-then-save-in-localStorage>');
  if (!needs_key) return files;

  const openai_api_key = localStorage['OPENAI_API_KEY'] as string;
  if (openai_api_key) return add_keys_to_files(files, openai_api_key);

  const new_openai_api_key = prompt('Please enter your OpenAI API key: ');
  if (new_openai_api_key?.startsWith('sk')) {
    localStorage['OPENAI_API_KEY'] = new_openai_api_key;
    return add_keys_to_files(files, new_openai_api_key);
  }

  return files;
}

function add_keys_to_files(files: ProjectFiles, openai_api_key: string): ProjectFiles {
  if (!files['.env.local']) return files;

  const updated_files = { ...files }

  updated_files['.env.local'] = updated_files['.env.local'].replace('OPENAI_API_KEY=<ask-me-then-save-in-localStorage>', `OPENAI_API_KEY=${openai_api_key}`);
  return updated_files;
}

if (import.meta.vitest) {
  describe('add_keys_to_files', () => {
    test('adds key to .env.local file', () => {
      const API_KEY = 'secret-key';

      const files: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
        '.env.local': 'OPENAI_API_KEY=<ask-me-then-save-in-localStorage>',
      }
      const keys_added_to_files: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
        '.env.local': `OPENAI_API_KEY=${API_KEY}`,
      }

      expect(add_keys_to_files(files, API_KEY)).toEqual(keys_added_to_files);
    });

    test('does nothing when files does not exist', () => {
      const API_KEY = 'secret-key';

      const files: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
      }
      const keys_added_to_files: ProjectFiles = {
        'index.svelte': '<h1>Hello World</h1>',
      }

      expect(add_keys_to_files(files, API_KEY)).toEqual(keys_added_to_files);
    });
  });
}