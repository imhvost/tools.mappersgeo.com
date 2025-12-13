import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve'

  return {
    plugins: [vue()],
    base: isDev ? '/' : '/work/fl/mappersgeo/wp-content/themes/mappersgeo/src/audit-quiz/',
    server: {
      port: 5173,
      proxy: {
        '/wp-json': {
          target: 'http://localhost/work/fl/mappersgeo',
          changeOrigin: true,
          secure: false,
        },
        '/wp-content/themes/mappers/fonts': {
          target: 'http://localhost/work/fl/mappersgeo',
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
      preprocessorOptions: {
        less: {
          additionalData:
            '@import "@/assets/less/variables.less"; @import "@/assets/less/mixins.less";',
        },
      },
    },
  }
})
