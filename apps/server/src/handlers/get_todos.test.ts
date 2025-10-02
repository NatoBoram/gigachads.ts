import type { GetTodosResponse } from "@natoboram/gigachads.ts-client"
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

	test("page", async ({ expect }) => {
		const req = { query: { limit: 1, page: 1 } } as Request

		const response = await new Promise<GetTodosResponse>(resolve => {
			const res = { json: resolve, status: (_: number) => res } as Response
			getTodos(req, res, vi.fn())
		})

		expect(response).toMatchObject<GetTodosResponse>({
			content: todos.slice(1, 2),
			limit: 1,
			page: 1,
		})
	})

	test("done", async ({ expect }) => {
		const req = { query: { done: true } } as Request

		const response = await new Promise<GetTodosResponse>(resolve => {
			const res = { json: resolve, status: (_: number) => res } as Response
			getTodos(req, res, vi.fn())
		})

		expect(response.content).toHaveLength(1)
	})

	test("search", async ({ expect }) => {
		const req = { query: { search: "test2" } } as Request

		const response = await new Promise<GetTodosResponse>(resolve => {
			const res = { json: resolve, status: (_: number) => res } as Response
			getTodos(req, res, vi.fn())
		})

		const id = todos[1]?.id
		if (!id) throw new Error("todo not found")

		expect(response).toMatchObject<GetTodosResponse>({
			content: [{ done: true, id, text: "test2" }],
			limit: 10,
			page: 0,
		})
	})

	test("204", async ({ expect }) => {
		const req = { query: { page: 2 } } as Request

		const response = await new Promise<GetTodosResponse>(resolve => {
			const res = { json: resolve, status: (_: number) => res } as Response
			getTodos(req, res, vi.fn())
		})

		expect(response).toMatchObject<GetTodosResponse>({
			content: [],
			limit: 10,
			page: 2,
		})
	})
})
