import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
// 导入terser插件进行代码压缩
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': pathResolve("src")
    }
  },
  plugins: [
    vue(),
    visualizer({open: true}),
    viteCompression({
      verbose: true, // 输出压缩成功
      disable: true, // 是否禁用
      threshold: 10240, // 体积大于阈值会被压缩，单位是b
      algorithm: 'gzip', // 压缩算法
      ext: '.gz', // 生成的压缩包后缀
      deleteOriginFile: true, // 是否删除原文件
    }),
  ],
  build: {
    cssCodeSplit: false, // css不进行打包拆分
    chunkSizeWarningLimit: 700, // 打包体积超过700kb控制台才提示
    brotliSize: true,
    minify: 'terser', // 压缩代码
    rollupOptions: {
      plugins: [],
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
         // 模块化拆分包（一个模块一个js）,可以不使用，会增加请求次数
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
            // return 'vendor';
          }
        }
      }
    }
  }
})
