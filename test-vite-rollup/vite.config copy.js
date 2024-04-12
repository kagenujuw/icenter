import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'nf-ui-element-plus',
      fileName: (format) => `nf-ui-element-plus.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      // external: ['vue','nf-ui-controller','element-plus'], // 注意看这里
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'nf-ui-controller': 'nfUIController',
          'element-plus': 'elementPlus'
        }
      }
    }
  }
})