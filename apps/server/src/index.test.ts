import { test } from "vitest"
import * as index from "./index.ts"

test("index.ts", ({ expect }) => {
	expect(index).toBeDefined()
})
