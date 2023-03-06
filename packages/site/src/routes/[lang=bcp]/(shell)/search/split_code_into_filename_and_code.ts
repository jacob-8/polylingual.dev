export function split_code_into_filename_and_code(code: string): { filename: string | null; code: string } {
  const has_filename = /^\/\/\/? file:/.test(code);
  if (!has_filename) { return { filename: null, code }; }

  const lines = code.split('\n');
  const filename = lines[0].substring(9).trim();
  return {
    filename,
    code: lines.slice(1).join('\n')
  };
}

if (import.meta.vitest) {
  describe('split_code_into_filename_and_code', () => {
    test('extracts file name from code', () => {
      const input_code = '/// file: +page.svelte\n<script>\n  let comment = \'\';\n</script>\n\n<form method="POST">\n  <textarea id="comment" bind:value={comment} />\n</form>\n';
      const { filename, code } = split_code_into_filename_and_code(input_code);
      expect(filename).toBe('+page.svelte');
      expect(code).toEqual(input_code.replace('/// file: +page.svelte\n', ''));
    });
    
    test('handles two slashes before filename', () => {
      const input_code = '// file: +page.svelte\nhello\n';
      const { filename, code } = split_code_into_filename_and_code(input_code);
      expect(filename).toBe('+page.svelte');
      expect(code).toEqual(input_code.replace('// file: +page.svelte\n', ''));
    });

    test('returns a null filename for code without a filename', () => {
      const input_code = '<script>\n  let comment = \'\';\n</script>\n\n<form method="POST">\n  <textarea id="comment" bind:value={comment} />\n</form>\n';
      const { filename, code } = split_code_into_filename_and_code(input_code);
      expect(filename).toBeNull();
      expect(code).toEqual(input_code);
    });
  });
}

