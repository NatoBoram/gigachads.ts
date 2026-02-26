import { describe, test } from "vitest"
import { newUrl } from "./new_url.ts"

describe("newUrl", () => {
	const expected = "https://example.org/path/param"

	test("leading and trailing slash", ({ expect }) => {
		const url = newUrl("/param", new URL("https://example.org/path/"))
		expect(url.toString()).toBe(expected)
	})

	test("trailing slash", ({ expect }) => {
		const url = newUrl("param", new URL("https://example.org/path/"))
		expect(url.toString()).toBe(expected)
	})

	test("leading slash", ({ expect }) => {
		const url = newUrl("/param", new URL("https://example.org/path"))
		expect(url.toString()).toBe(expected)
	})

	test("no slash", ({ expect }) => {
		const url = newUrl("param", new URL("https://example.org/path"))
		expect(url.toString()).toBe(expected)
	})
})
