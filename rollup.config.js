/* eslint-env node */

import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import resolve from "@rollup/plugin-node-resolve";
import strato from "@buidlerlabs/hedera-strato-js/rollup-plugin";
import { terser } from "rollup-plugin-terser";

import dotenv from "dotenv";
dotenv.config();

export default async function getConfig() {
  return {
    context: "window",
    external: ["lodash-es/merge"],
    input:
      "/home/eedris/projects/veot/node_modules/@buidlerlabs/hedera-strato-js/lib.esm/index.js",
    output: [
      {
        file: "/home/eedris/projects/veot/strato.js",
        format: "esm",
        paths: {
          "lodash-es/merge": "https://unpkg.com/lodash-es@4.17.21/merge.js"
        },
        plugins: [terser()],
        sourcemap: true
      }
    ],
    plugins: [
      strato({
        includeCompiler: false,
        sourceMap: true
      }),
      resolve({
        extensions: [".ts", ".js"],
        mainFields: ["browser", "module", "main"],
        preferBuiltins: false
      }),
      commonjs({
        esmExternals: true,
        requireReturnsDefault: "preferred"
      }),
      nodePolyfills({
        sourceMap: true
      }),
      babel({
        babelHelpers: "runtime",
        extensions: [".ts"],
        plugins: [["@babel/plugin-transform-runtime", { regenerator: true }]],
        presets: [
          ["@babel/env", { targets: "> 0.25%, not dead" }],
          ["@babel/typescript"]
        ]
      }),
      json()
    ],
    treeshake: true
  };
}
