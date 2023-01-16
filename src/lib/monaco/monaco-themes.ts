export const svelteLight: import('monaco-editor').editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: false,
  rules: [
    // TODO more rules
    { token: '', foreground: '5f5c53' },
    { token: 'keyword', foreground: '0b69a8' },
    { token: 'string', foreground: '856e3d' },
    { token: 'delimiter', foreground: '5f5c53' },
    { token: 'variable', foreground: 'c05726' },
    { token: 'constant', foreground: 'c05726' },
    { token: 'tag', foreground: 'c05726' },
    { token: 'number', foreground: '72a25d' },
    { token: 'boolean', foreground: '3080b5' },
  ],
  colors: {
    'editor.background': '#f4f8fb',
    'token.keyword': '#ff0000',
  },
}

export const svelteDark: import('monaco-editor').editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: false,
  rules: [
    // TODO more rules
    { token: '', foreground: 'e6e6e6' },
    { token: 'keyword', foreground: '3384ba' },
    { token: 'string', foreground: '856e3d' },
    { token: 'delimiter', foreground: '5f5c53' },
    { token: 'variable', foreground: 'd47346' },
    { token: 'constant', foreground: 'd47346' },
    { token: 'tag', foreground: 'd47346' },
    { token: 'number', foreground: '91bd7f' },
    { token: 'boolean', foreground: '499cd3' },
  ],
  colors: {
    'editor.background': '#1a1a1a',
    'token.keyword': '#ff0000',
  },
}