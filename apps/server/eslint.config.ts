import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import type { Linter } from "eslint"
import { defineConfig } from "eslint/config"
import globals from "globals"

const config: Linter.Config[] = defineConfig(...gigachads, {
	languageOptions: {
		globals: { ...globals.node },
		parserOptions: {
			ecmaVersion: "latest",
			project: "./tsconfig.eslint.json",
			sourceType: "module",
		},
	},
})

export default config
