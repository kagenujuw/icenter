import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import globalStyle from '@originjs/vite-plugin-global-style';

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 8888,
    open: true,
    hmr: true,
    proxy: {
      "/api": 'http://127.0.0.1:8990/'
    }
  },
  resolve: {
    alias: {
      '@': pathResolve("src")
    }
  },
  plugins: [
    vue(),
    globalStyle({
      sourcePath: './src/assets/css',
      lessEnabled: true
    })
  ],
  build: {
    outDir:"dist", 
    emptyOutDir:true,
    rollupOptions: {
      // 资源出口路径(如：图片、css等)
      output: {
        assetFileNames: function (assetInfo) {
          const name = assetInfo.name;
          if (/.css$/.test(name)) {
            return "assets/css/[name]-[hash].[ext]";
          } else if (/.[jpe?g|png|gif]$/.test(name)) {
            return "assets/images/[name]-[hash].[ext]";
          } else {
            return "assets/[ext]/[name]-[hash].[ext]";
          }
        },
      }
      
    }
  }
})
