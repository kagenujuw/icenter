// rollup.config.js
import PluginVue from "rollup-plugin-vue";
import PluginNodeResolve from "@rollup/plugin-node-resolve";
import PluginPostCss from "rollup-plugin-postcss";
import PluginCommonJS from "@rollup/plugin-commonjs";

export default {
  input: "main.js",
  output: [
    {
        file: "dist/index.js",
        format: "iife",
    },
    {
        file: "dist/index-es.js",
        format: "es",
    },
    {
        file: "dist/index-cjs.js",
        format: "cjs",
    },
    {
      file: 'dist/index.amd.js',
      format: 'amd'
    },
    {
      file: 'dist/index.umd.js',
      name: 'index',
      format: 'umd'
    },
  ],
  // output: {
  //   format: "es",
  //   dir: "dist",
  // },
  plugins: [
    PluginVue(),
    PluginNodeResolve(),
    PluginPostCss(),
    PluginCommonJS(),
  ],
};
