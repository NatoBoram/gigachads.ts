import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import tseslint from "typescript-eslint"

export default tseslint.config(
	...gigachads,
	{
		languageOptions: {
			globals: {},
			parserOptions: {
				ecmaVersion: "latest",
				project: "./tsconfig.eslint.json",
				sourceType: "module",
			},
		},
	},
	{
		ignores: [
			".pnpm-store/",
			"dist/",
			"docs/",
			"node_modules/",
			"package-lock.json",
			"pnpm-lock.yaml",
		],
	},
)
