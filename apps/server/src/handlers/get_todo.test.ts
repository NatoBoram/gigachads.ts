import type { GetTodoResponse } from "@natoboram/gigachads.ts-client"
import { randomUUID } from "node:crypto"
import { beforeEach, describe, test, vi } from "vitest"
import { todos, type Todo } from "../models/todo.ts"
import { getTodo } from "./get_todo.ts"

type Request = Parameters<typeof getTodo>[0]
type Response = Parameters<typeof getTodo>[1]

describe("getTodo", () => {
	beforeEach(() => (todos.length = 0))

	test("200", async ({ expect }) => {
		const todo: Todo = { id: randomUUID(), text: "test", done: false }
		todos.push(todo)

		const req = { params: { id: todo.id } } as Request

		const found = await new Promise<GetTodoResponse>(resolve => {
			const res = { json: resolve } as Response
			getTodo(req, res, vi.fn())
		})

		expect(found).toMatchObject(todo)
	})

	test("404", async ({ expect }) => {
		const req = { params: { id: randomUUID() } } as Request

		const status = await new Promise(resolve => {
			const res = { sendStatus: resolve } as Response
			getTodo(req, res, vi.fn())
		})

		expect(status).toBe(404)
	})
})
