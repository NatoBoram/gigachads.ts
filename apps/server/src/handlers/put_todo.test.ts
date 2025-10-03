import type { PutTodoResponse } from "@natoboram/gigachads.ts-client"
import { randomUUID } from "node:crypto"
import { beforeEach, describe, test, vi } from "vitest"
import { todos, type Todo } from "../models/todo.ts"
import { putTodo } from "./put_todo.ts"

type Request = Parameters<typeof putTodo>[0]
type Response = Parameters<typeof putTodo>[1]

describe("putTodo", () => {
	beforeEach(() => {
		todos.length = 0
	})

	test("200", async ({ expect }) => {
		const todo: Todo = { id: randomUUID(), text: "test", done: false }
		todos.push(todo)

		const req = {
			params: { id: todo.id },
			body: { done: true, text: "text" },
		} as Request

		const response = await new Promise<PutTodoResponse>(resolve => {
			const res = { json: resolve } as Response
			putTodo(req, res, vi.fn())
		})

		expect(response).toMatchObject<PutTodoResponse>({
			done: true,
			id: todo.id,
			text: "text",
		})
	})

	test("404", async ({ expect }) => {
		const req = {
			params: { id: randomUUID() },
			body: { done: true, text: "text" },
		} as Request

		const status = await new Promise<number>(resolve => {
			const res = { sendStatus: resolve } as Response
			putTodo(req, res, vi.fn())
		})

		expect(status).toBe(404)
	})

	test("500", async ({ expect }) => {
		const todo: Todo = { id: randomUUID(), text: "test", done: false }
		todos.push(todo)

		const req = {
			params: { id: todo.id },
			body: { done: true, text: "text" },
		} as Request

		// Simulate a bug where the found index does not exist
		vi.spyOn(todos, "findIndex").mockReturnValue(1)

		const status = await new Promise<number>(resolve => {
			const res = { sendStatus: resolve, json: () => res } as Response
			putTodo(req, res, vi.fn())
		})

		expect(status).toBe(500)
	})
})
