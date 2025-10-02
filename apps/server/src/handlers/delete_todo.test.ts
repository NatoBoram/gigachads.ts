import { randomUUID } from "node:crypto"
import { beforeEach, describe, test, vi } from "vitest"
import { todos, type Todo } from "../models/todo.ts"
import { deleteTodo } from "./delete_todo.ts"

type Request = Parameters<typeof deleteTodo>[0]
type Response = Parameters<typeof deleteTodo>[1]

describe("deleteTodo", () => {
	beforeEach(() => {
		todos.length = 0
	})

	test("200", async ({ expect }) => {
		const todo: Todo = { id: randomUUID(), text: "test", done: false }
		todos.push(todo)

		const req = { params: { id: todo.id } } as Request

		await new Promise<void>(resolve => {
			const res = { json: resolve } as Response
			deleteTodo(req, res, vi.fn())
		})

		expect(todos.find(t => t.id === todo.id)).toBeUndefined()
	})

	test("404", async ({ expect }) => {
		const req = { params: { id: randomUUID() } } as Request

		const status = await new Promise(resolve => {
			const res = { sendStatus: resolve } as Response
			deleteTodo(req, res, vi.fn())
		})

		expect(status).toBe(404)
	})
})
