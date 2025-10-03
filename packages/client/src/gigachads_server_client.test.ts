import { randomUUID } from "node:crypto"
import { describe, test, vi } from "vitest"
import { GigachadsServerClient } from "./gigachads_server_client.ts"

type FetchParameters = Parameters<typeof globalThis.fetch>

function setup() {
	const base = new URL("http://localhost:3000")
	const fetch = vi.fn()
	const token = randomUUID()
	const client = new GigachadsServerClient(base, fetch, token)

	return { base, client, fetch, token }
}

describe("GigachadsServerClient", () => {
	test("getTodos", async ({ expect }) => {
		const { client, token, fetch, base } = setup()
		await client.getTodos({ limit: 10, page: 1 })

		const headers = new Headers()
		headers.set("Accept", "application/json")
		headers.set("Authorization", `Bearer ${token}`)

		const url = new URL("todos", base)
		url.searchParams.set("limit", "10")
		url.searchParams.set("page", "1")

		const init: RequestInit = { headers, method: "GET" }

		expect(fetch).toBeCalledWith<FetchParameters>(url, init)
	})

	test("getTodo", async ({ expect }) => {
		const { client, token, fetch, base } = setup()
		const id = randomUUID()
		await client.getTodo(id)

		const headers = new Headers()
		headers.set("Accept", "application/json")
		headers.set("Authorization", `Bearer ${token}`)

		const url = new URL(`todos/${id}`, base)
		const init: RequestInit = { headers, method: "GET" }

		expect(fetch).toBeCalledWith<FetchParameters>(url, init)
	})

	test("deleteTodo", async ({ expect }) => {
		const { client, token, fetch, base } = setup()
		const id = randomUUID()
		await client.deleteTodo(id)

		const headers = new Headers()
		headers.set("Authorization", `Bearer ${token}`)

		const url = new URL(`todos/${id}`, base)
		const init = { headers, method: "DELETE" }

		expect(fetch).toBeCalledWith<FetchParameters>(url, init)
	})

	test("patchTodo", async ({ expect }) => {
		const { client, token, fetch, base } = setup()
		const id = randomUUID()
		const body = { done: true }
		await client.patchTodo(id, body)

		const headers = new Headers()
		headers.set("Accept", "application/json")
		headers.set("Authorization", `Bearer ${token}`)
		headers.set("Content-Type", "application/json")

		const url = new URL(`todos/${id}`, base)
		const init: RequestInit = {
			headers,
			method: "PATCH",
			body: JSON.stringify(body),
		}

		expect(fetch).toBeCalledWith<FetchParameters>(url, init)
	})

	test("postTodo", async ({ expect }) => {
		const { client, token, fetch, base } = setup()
		const body = { text: "test" }
		await client.postTodo(body)

		const headers = new Headers()
		headers.set("Accept", "application/json")
		headers.set("Authorization", `Bearer ${token}`)
		headers.set("Content-Type", "application/json")

		const url = new URL("todos", base)
		const init: RequestInit = {
			headers,
			method: "POST",
			body: JSON.stringify(body),
		}

		expect(fetch).toBeCalledWith<FetchParameters>(url, init)
	})

	test("putTodo", async ({ expect }) => {
		const { client, token, fetch, base } = setup()
		const id = randomUUID()
		const body = { done: true, text: "test" }
		await client.putTodo(id, body)

		const headers = new Headers()
		headers.set("Accept", "application/json")
		headers.set("Authorization", `Bearer ${token}`)
		headers.set("Content-Type", "application/json")

		const url = new URL(`todos/${id}`, base)
		const init: RequestInit = {
			headers,
			method: "PUT",
			body: JSON.stringify(body),
		}

		expect(fetch).toBeCalledWith<FetchParameters>(url, init)
	})
})
