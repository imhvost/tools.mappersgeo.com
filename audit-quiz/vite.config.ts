import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import pxtorem from 'postcss-pxtorem';

export default defineConfig(({ command, mode }) => {
  const isDev = command === 'serve';
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [vue()],
    base: isDev ? '/' : '/work/fl/mappersgeo/wp-content/themes/mappersgeo/src/audit-quiz/',
    server: {
      port: 5173,
      proxy: {
        '/wp-json': {
          target: env.VITE_WP_URI,
          changeOrigin: true,
          secure: false,
        },
        '/wp-content/themes/mappers/fonts': {
          target: env.VITE_WP_URI,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: path.resolve(__dirname, '../theme/audit-quiz/'),
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
        output: {
          entryFileNames: 'app.js',
          assetFileNames: 'app.[ext]',
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          pxtorem({
            rootValue: 16,
            propList: ['*'],
            selectorBlackList: [],
            replace: !isDev,
            mediaQuery: false,
            minPixelValue: 1,
          }),
        ],
      },
      preprocessorOptions: {
        less: {
          additionalData:
            '@import "@/assets/less/variables.less"; @import "@/assets/less/mixins.less";',
        },
      },
    },
  };
});
