import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import type { Linter } from "eslint"
import { defineConfig } from "eslint/config"
import globals from "globals"
import { fileURLToPath } from "node:url"

const config: Linter.Config[] = defineConfig(...gigachads, {
	languageOptions: {
		globals: { ...globals.node },
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
