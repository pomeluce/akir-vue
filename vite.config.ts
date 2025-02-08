import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import UnoCSS from 'unocss/vite';
import { resolve } from 'path';
import { autoImport, mock } from './core/plugins';
import { parseEnv } from './core/utils';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build';
  const env = parseEnv(loadEnv(mode, process.cwd()));

  return {
    plugins: [...autoImport, vue(), vueJsx(), UnoCSS(), mock(isBuild, env)],
    resolve: {
      extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'types'),
      },
    },
    css: {
      modules: {
        generateScopedName: '[local]-[hash:8]',
        hashPrefix: 'akir',
        localsConvention: 'camelCaseOnly',
      },
    },
    base: isBuild ? '/' : '/',
    server: {
      host: true,
      proxy: env.VITE_MOCK_ENABLE ? {} : { [env.VITE_BASE_PREFIX]: { target: env.VITE_API_URL, rewrite: path => path } },
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.split('/node_modules/').pop()?.split('/')[0];
            }
          },
          entryFileNames: 'js/[name]-[hash].js', // 主入口文件
          chunkFileNames: 'js/[name]-[hash].js', // 异步块文件
          assetFileNames(assetInfo) {
            const extType = assetInfo.names?.[0].split('.').pop() ?? '';
            // css 文件
            if ('css' === extType) return 'css/[name]-[hash].[ext]';
            // 图片文件
            else if (['avif', 'apng', 'bmp', 'gif', 'ico', 'jfif', 'jpg', 'jpeg', 'pjp', 'pjpeg', 'png', 'webp', 'svg'].includes(extType)) return 'images/[name]-[hash].[ext]';
            // 字体文件
            else if (['ttf', 'woff', 'woff2', 'eot', 'otf', 'wof2'].includes(extType)) return 'fonts/[name]-[hash].[ext]';
            else return 'assets/[name]-[hash].[ext]';
          },
        },
      },
    },
  };
});
