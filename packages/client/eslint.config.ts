import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import type { Linter } from "eslint"
import { defineConfig } from "eslint/config"
import { fileURLToPath } from "node:url"

const config: Linter.Config[] = defineConfig(
	...gigachads,
	{
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
	},
	{
		ignores: [
			".pnpm-store/",
			"coverage/",
			"dist/",
			"docs/",
			"node_modules/",

			"package-lock.json",
			"pnpm-lock.yaml",
		],
	},
)

export default config
