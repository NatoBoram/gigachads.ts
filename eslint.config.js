import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import tseslint from "typescript-eslint"

export default tseslint.config(...gigachads, {
	languageOptions: {
		globals: {},
		parserOptions: {
			ecmaVersion: "latest",
			project: "./tsconfig.eslint.json",
			sourceType: "module",
		},
	},
})
