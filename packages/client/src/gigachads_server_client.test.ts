import { describe, test } from "vitest"
import { GigachadsServerClient } from "./gigachads_server_client.ts"

describe("GigachadsServerClient", () => {
	test("constructor", ({ expect }) => {
		const url = new URL("http://localhost:3000")
		const token = "473e17dd-286b-4aee-8892-d25e368d717b"
		const client = new GigachadsServerClient(url, fetch, token)
		expect(client).toBeInstanceOf(GigachadsServerClient)
	})
})
