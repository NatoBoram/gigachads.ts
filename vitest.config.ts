import type { ViteUserConfig } from "vitest/config"
import { defineConfig } from "vitest/config"

const config: ViteUserConfig = defineConfig({
	test: {
		include: ["apps/*/src/**/*.test.ts", "packages/*/src/**/*.test.ts"],
		coverage: {
			include: ["apps/*/src/**/*.ts", "packages/*/src/**/*.ts"],
			reporter: ["html-spa", "json-summary", "text"],
		},
	},
})

export default config
