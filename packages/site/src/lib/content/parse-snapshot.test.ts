import { parseSnapshots } from "./parse-snapshots";

describe('parseSnapshot', () => {
  test('should parse snapshots', () => {
    const snapshots = `
reTypewriter Snapshots v1

--01----------

--02----------
<script lang="ts">
  import '../global.css';
</script>
--03----------
<script lang="ts">
  import '../global.css';
</script>

<div style="display: flex; flex-direction: column; height: 100%;">
</div>

--------------

    `;
    expect(parseSnapshots(snapshots.trim())).toMatchInlineSnapshot(`
      {
        "01": "",
        "02": "<script lang=\\"ts\\">
        import '../global.css';
      </script>",
        "03": "<script lang=\\"ts\\">
        import '../global.css';
      </script>

      <div style=\\"display: flex; flex-direction: column; height: 100%;\\">
      </div>",
      }
    `);
  });
});