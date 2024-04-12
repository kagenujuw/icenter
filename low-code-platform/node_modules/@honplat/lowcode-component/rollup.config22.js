// rollup.config.js
import PluginVue from "rollup-plugin-vue";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import PluginCommonJS from "@rollup/plugin-commonjs";
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import terser from '@rollup/plugin-terser';
// import styleImport, { ElementPlusResolve } from 'vite-plugin-style-import'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

export default {
  input: "index.js",
  output: [
    // {
    //     file: "dist/index.js",
    //     format: "iife",
    // },
    // {
    //     file: "dist/index-es.js",
    //     format: "es",
    // },
    // {
    //     file: "dist/index-cjs.js",
    //     format: "cjs",
    // },
    // {
    //   file: 'dist/index.amd.js',
    //   format: 'amd'
    // },
    {
      file: 'dist/index.umd.js',
      name: 'index',
      format: 'umd'
    },
  ],
  // output: {
  //   format: "esm",
  // },
  plugins: [
    // Components({
    //   dirs: ['src/lib'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
    //   resolvers: [ElementPlusResolver()]
    // }),
    // createStyleImportPlugin({
    //   resolves: [ElementPlusResolve()],
    //   libs: [
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `element-plus/theme-chalk/${name}.css`
    //       }
    //     }
    //   ]
    // }),
    PluginVue(),
    nodeResolve(),
    postcss({plugins: [autoprefixer()]}),
    PluginCommonJS(),
    // terser()
  ],
  build: {
    rollupOptions: {
      external: ['element-plus', 'vue', 'vue-router', '@element-plus/icons-vue']
    }
  }

};
