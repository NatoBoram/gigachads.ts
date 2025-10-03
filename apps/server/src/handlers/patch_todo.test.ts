import type {
	PatchTodoBody,
	PatchTodoResponse,
} from "@natoboram/gigachads.ts-client"
import { randomUUID } from "node:crypto"
import { beforeEach, describe, test, vi } from "vitest"
import { todos, type Todo } from "../models/todo.ts"
import { patchTodo } from "./patch_todo.ts"

type Request = Parameters<typeof patchTodo>[0]
type Response = Parameters<typeof patchTodo>[1]

describe("patchTodo", () => {
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

		const response = await new Promise<PatchTodoResponse>(resolve => {
			const res = { json: resolve } as Response
			patchTodo(req, res, vi.fn())
		})

		expect(response).toMatchObject<PatchTodoResponse>({
			done: true,
			id: todo.id,
			text: "text",
		})
	})

	test("404", async ({ expect }) => {
		const req = { params: { id: randomUUID() }, body: {} } as Request

		const status = await new Promise<number>(resolve => {
			const res = { sendStatus: resolve } as Response
			patchTodo(req, res, vi.fn())
		})

		expect(status).toBe(404)
	})

	describe("400", () => {
		test("no body", async ({ expect }) => {
			const todo: Todo = { id: randomUUID(), text: "test", done: false }
			todos.push(todo)

			const req = { params: { id: todo.id } } as Request

			const status = await new Promise(resolve => {
				const res = { sendStatus: resolve } as Response
				patchTodo(req, res, vi.fn())
			})

			expect(status).toBe(400)
		})

		test("invalid body", async ({ expect }) => {
			const todo: Todo = { id: randomUUID(), text: "test", done: false }
			todos.push(todo)

			const req = {
				params: { id: todo.id },
				body: { id: randomUUID() } as PatchTodoBody,
			} as Request

			const status = await new Promise(resolve => {
				const res = { sendStatus: resolve, json: () => res } as Response
				patchTodo(req, res, vi.fn())
			})

			expect(status).toBe(400)
		})

		test("invalid done", async ({ expect }) => {
			const todo: Todo = { id: randomUUID(), text: "test", done: false }
			todos.push(todo)

			const req = {
				params: { id: todo.id },
				body: { done: "true" } as unknown as PatchTodoBody,
			} as Request

			const status = await new Promise(resolve => {
				const res = { sendStatus: resolve } as Response
				patchTodo(req, res, vi.fn())
			})

			expect(status).toBe(400)
		})

		test("invalid text", async ({ expect }) => {
			const todo: Todo = { id: randomUUID(), text: "test", done: false }
			todos.push(todo)

			const req = {
				params: { id: todo.id },
				body: { text: 0 } as unknown as PatchTodoBody,
			} as Request

			const status = await new Promise(resolve => {
				const res = { sendStatus: resolve } as Response
				patchTodo(req, res, vi.fn())
			})

			expect(status).toBe(400)
		})
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
			patchTodo(req, res, vi.fn())
		})

		expect(status).toBe(500)
	})
})
