// Regardless of whether config is placed here or inlined in svelte.config.js, the unocss.config.ts file required to make the UnoCSS VSCode extension work (v.0.45.26)
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
// import { presetForms } from '@julr/unocss-preset-forms'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    // presetForms(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
