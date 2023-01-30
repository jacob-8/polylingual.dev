// export function createFilesStore({ files }: { files: Record<string, string> }) {
//   const { subscribe, set, update } = writable<Record<string, string>>([]);
//   return {
//     subscribe,
//     set,
//     update,
//     add: (name: string) => {
//       update((files) => {
//       });
//     },
//     rename: (stub: import('$lib/types').Stub, name: string) => {
//       update((files) => {
//       });
//     },
//     remove: (stub: import('$lib/types').Stub) => {
//       update((files) => {
//       });
//     }
//   }