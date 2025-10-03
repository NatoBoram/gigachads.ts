import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import type { Linter } from "eslint"
import { defineConfig } from "eslint/config"
import { fileURLToPath } from "node:url"

const config: Linter.Config[] = defineConfig(...gigachads, {
	languageOptions: {
		globals: {},
		parserOptions: {
			ecmaVersion: "latest",
			project: fileURLToPath(
				new URL("./tsconfig.eslint.json", import.meta.url),
			),
			sourceType: "module",
		},
	},
})

export default config
