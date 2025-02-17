import { defineConfig, presetUno, presetAttributify, presetTypography } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';

export default defineConfig({
  theme: {
    animation: {
      keyframes: {
        blink: '{ 0%{ opacity: 0 } 100%{ opacity: 1 } }',
      },
      durations: {
        blink: '.8s',
      },
      timingFns: {
        blink: 'ease',
      },
      counts: {
        blink: 'infinite',
      },
    },

    width: {
      page: '1450px',
    },

    colors: {
      /* 主题色 */
      primary1: 'rgba(var(--uno-primary1))',
      primary2: 'rgba(var(--uno-primary2))',
      primary3: 'rgba(var(--uno-primary3))',
      primary4: 'rgba(var(--uno-primary4))',
      primary5: 'rgba(var(--uno-primary5))',
      primary6: 'rgba(var(--uno-primary6))',
      primary7: 'rgba(var(--uno-primary7))',

      /* 背景色 */
      backdrop1: 'rgba(var(--uno-backdrop1))',
      backdrop2: 'rgba(var(--uno-backdrop2))',
      backdrop3: 'rgba(var(--uno-backdrop3))',
      backdrop4: 'rgba(var(--uno-backdrop4))',
      'backdrop-white': 'rgba(var(--uno-backdrop-white))',

      /* link */
      link1: 'rgba(var(--uno-link1))',
      link2: 'rgba(var(--uno-link2))',

      /* 文字颜色 */
      word1: 'rgba(var(--uno-word1))',
      word2: 'rgba(var(--uno-word2))',
      word3: 'rgba(var(--uno-word3))',
      word4: 'rgba(var(--uno-word4))',

      /* 边框 */
      rim1: 'rgba(var(--uno-rim1))',
      rim2: 'rgba(var(--uno-rim2))',
      rim3: 'rgba(var(--uno-rim3))',
      rim4: 'rgba(var(--uno-rim4))',

      /* 填充 */
      fill1: 'rgba(var(--uno-fill1))',
      fill2: 'rgba(var(--uno-fill2))',
      fill3: 'rgba(var(--uno-fill3))',
      fill4: 'rgba(var(--uno-fill4))',
    },

    boxShadow: {
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    },

    dropShadow: {
      '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      '4xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)'],
    },
    spacing: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
    },
  },
  // 添加 UnoCSS 的默认样式预设
  presets: [presetUno({ dark: { dark: '[data-theme="dark"]' } }), presetAttributify({ prefix: 'un-', prefixedOnly: true }), presetTypography()],
  transformers: [
    // applay theme screen 指令支持
    transformerDirectives(),
    // 前缀组支持
    transformerVariantGroup(),
  ],
});
