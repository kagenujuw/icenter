import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'index',
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','element-plus', 'vuedraggable'], // 注意看这里
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'element-plus': 'elementPlus'
        }
      }
    }
  }
})