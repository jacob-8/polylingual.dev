import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import { partytownVite } from '@builder.io/partytown/utils';
import { join } from 'path';

const config: UserConfig = {
  build: {
    target: 'esnext'
  },
  plugins: [
    UnoCSS({
      mode: 'svelte-scoped',
    }),
    sveltekit(),
    partytownVite({ dest: join(process.cwd(), 'static', '~partytown') }),
  ],
  // optimizeDeps: {
  // 	exclude: ['firebase-admin']
  //  include: ['firebase > node-fetch'],
  // },
  // ssr: {
  //   noExternal: ['firebase']
  // },
  test: {
    globals: true,
    includeSource: ['src/**/*.ts'],
    include: ['src/**/*.test.ts']
  }
};

export default config;
