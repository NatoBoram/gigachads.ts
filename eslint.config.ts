import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import type { Linter } from "eslint"
import { defineConfig } from "eslint/config"

const config: Linter.Config[] = defineConfig(...gigachads, {
	languageOptions: {
		globals: {},
		parserOptions: {
			ecmaVersion: "latest",
			project: "./tsconfig.eslint.json",
			sourceType: "module",
		},
	},
})

export default config
