import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], 
  plugins: { js },
  extends: ["js/recommended"],
  languageOptions: { globals: globals.node}
  },
  { files: ["**/*.js"], 
  languageOptions: { sourceType: "commonjs" } 
  },
  { 
   ignores: ['dist/**'], 
  },
  {
  "rules": {
    "no-unused-vars": ["warn", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": true,
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_"
      }]
    }
  }

]);
