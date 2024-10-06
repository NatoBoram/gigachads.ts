import gigachads from "@natoboram/gigachads.ts-config/eslint.config.js"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(...gigachads, {
	languageOptions: {
		globals: { ...globals.node },
		parserOptions: {
			ecmaVersion: "latest",
			project: "./tsconfig.eslint.json",
			sourceType: "module",
		},
	},
})
