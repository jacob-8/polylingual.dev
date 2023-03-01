import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';
import { ProcessedDoc } from '../types';
import { parse_markdown_sections } from './parse_markdown_sections';

export async function process_docs(directory: string): Promise<ProcessedDoc[]> {
  const markdown_files = (await walk(directory))
    .filter((fileName) => /\.md$/.test(fileName))

  console.log(`processing ${markdown_files.length} markdown files`)

  const parsed_docs: ProcessedDoc[] = await Promise.all(markdown_files.map(async (file) => {
    const content = await readFile(file, 'utf8');
    const sections = parse_markdown_sections(content);
    const filename_without_directory = file.replace(/\\/g, '/').replace(directory, '');
    return { filename: filename_without_directory, sections };
  }));

  return parsed_docs;
}

if (import.meta.vitest) {
  describe('process_docs', async () => {
    const directory = 'process/fixtures/sveltejs.kit/docs';
    const processed_docs = await process_docs(directory);

    test('only looks at markdown files', async () => {
      expect(processed_docs.map(doc => doc.filename)).toMatchInlineSnapshot(`
        [
          "/10-getting-started/10-introduction.md",
          "/10-getting-started/20-creating-a-project.md",
          "/20-core-concepts/10-routing.md",
          "/20-core-concepts/20-load.md",
          "/20-core-concepts/30-form-actions.md",
          "/20-core-concepts/40-page-options.md",
        ]
      `);
    });

    test('parses docs into section by file', async () => {
      expect(processed_docs).toMatchSnapshot();
    });
  });
}

async function walk(dir: string): Promise<string[]> {
  const files_in_directory = await readdir(dir)

  const recursive_files = await Promise.all(
    files_in_directory.map(async (file) => {
      const file_path = join(dir, file)
      const stats = await stat(file_path)
      if (stats.isDirectory()) {
        return walk(file_path)
      } else if (stats.isFile()) {
        return [file_path]
      } else {
        return []
      }
    })
  )

  const flattened_files = recursive_files.reduce(
    (all, folderContents) => all.concat(folderContents),
    []
  )

  return flattened_files
}

if (import.meta.vitest) {
  test('walk handles multiple file levels', async () => {
    const directory = 'process/fixtures/sveltejs.kit/docs';
    expect(await walk(directory)).toMatchInlineSnapshot(`
        [
          "process\\\\fixtures\\\\sveltejs.kit\\\\docs\\\\10-getting-started\\\\10-introduction.md",
          "process\\\\fixtures\\\\sveltejs.kit\\\\docs\\\\10-getting-started\\\\20-creating-a-project.md",
          "process\\\\fixtures\\\\sveltejs.kit\\\\docs\\\\20-core-concepts\\\\10-routing.md",
          "process\\\\fixtures\\\\sveltejs.kit\\\\docs\\\\20-core-concepts\\\\20-load.md",
          "process\\\\fixtures\\\\sveltejs.kit\\\\docs\\\\20-core-concepts\\\\30-form-actions.md",
          "process\\\\fixtures\\\\sveltejs.kit\\\\docs\\\\20-core-concepts\\\\40-page-options.md",
          "process\\\\fixtures\\\\sveltejs.kit\\\\docs\\\\20-core-concepts\\\\meta.json",
        ]
      `);
  });
}
