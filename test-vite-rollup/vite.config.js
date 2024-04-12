import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path' // 主要用于alias文件路径别名
const pathResolve = (dir) => resolve(__dirname, '.', dir)

// 发布库的设置
const lib = defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'nf-tool',
      fileName: (format) => `nf-tool.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

// 开发模式、生产模式
const project = (url) => {
  return defineConfig({
    plugins: [vue()],
    devtools: true,
    resolve: {
      alias: {
        '/@': resolve(__dirname, '.', 'src'),
        '/nf-tool': pathResolve('lib/main.js') //
      }
    },
    base: url,
    // 打包配置
    build: {
      sourcemap: true,
      outDir: 'distp', // 指定输出路径，要和库的包区分开
      assetsDir: 'static/img/', // 指定生成静态资源的存放路径
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js1/[name]-[hash].js',
          entryFileNames: 'static/js2/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        },
        brotliSize: false, // 不统计
        target: 'esnext', 
        minify: 'esbuild' // 混淆器，terser构建后文件体积更小
      }
    }
  })
}

// 用  loadEnv 读取模式，然后返回对应的 defineConfig 
export default ({ mode }) => {
  const url = loadEnv(mode, process.cwd()).VITE_BASEURL
  console.log(222, url)
  if (url === 'lib') {
    // 打包库文件
    return lib
  } else {
    // 开发模式、生产模式
    return project(url)
  }
}