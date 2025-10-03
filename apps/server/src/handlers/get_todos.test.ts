import type {
	GetTodosQuery,
	GetTodosResponse,
} from "@natoboram/gigachads.ts-client"
import { randomUUID } from "node:crypto"
import { beforeEach, describe, test, vi } from "vitest"
import { todos } from "../models/todo.ts"
import { getTodos } from "./get_todos.ts"

type Request = Parameters<typeof getTodos>[0]
type Response = Parameters<typeof getTodos>[1]

describe("getTodos", () => {
	beforeEach(() => {
		todos.length = 0

		todos.push({ id: randomUUID(), text: "test1", done: false })
		todos.push({ id: randomUUID(), text: "test2", done: true })
		todos.push({ id: randomUUID(), text: "test3", done: false })
	})

	test("200", async ({ expect }) => {
		const req = { query: { search: "test2", done: true } } as Request

		const response = await new Promise<GetTodosResponse>(resolve => {
			const res = { json: resolve, status: (_: number) => res } as Response
			getTodos(req, res, vi.fn())
		})

		const id = todos[1]?.id
		if (!id) throw new Error("todo not found", { cause: { todos, id } })

		expect(response).toMatchObject<GetTodosResponse>({
			content: [{ done: true, id, text: "test2" }],
			limit: 10,
			page: 0,
		})
	})

	test("204", async ({ expect }) => {
		const req = { query: { page: 2 } } as Request

		const status = await new Promise<number>(resolve => {
			const res = { status: resolve } as Response
			getTodos(req, res, vi.fn())
		})

		expect(status).toBe(204)
	})

	describe("400", () => {
		test("invalid limit", async ({ expect }) => {
			const req = {
				query: { limit: "test" } as unknown as GetTodosQuery,
			} as Request

			const response = await new Promise(resolve => {
				const res = { sendStatus: resolve } as Response
				getTodos(req, res, vi.fn())
			})

			expect(response).toBe(400)
		})

		test("float limit", async ({ expect }) => {
			const req = { query: { limit: 1.5 } as GetTodosQuery } as Request

			const response = await new Promise(resolve => {
				const res = { sendStatus: resolve } as Response
				getTodos(req, res, vi.fn())
			})

			expect(response).toBe(400)
		})

		test("limit less than 1", async ({ expect }) => {
			const req = { query: { limit: 0 } } as Request

			const response = await new Promise(resolve => {
				const res = { sendStatus: resolve } as Response
				getTodos(req, res, vi.fn())
			})

			expect(response).toBe(400)
		})
	})
})
