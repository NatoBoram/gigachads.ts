import type { PatchTodoResponse } from "@natoboram/gigachads.ts-client"
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

	test("done", async ({ expect }) => {
		const todo: Todo = { id: randomUUID(), text: "test", done: false }
		todos.push(todo)

		const req = { params: { id: todo.id }, body: { done: true } } as Request

		const response = await new Promise<PatchTodoResponse>(resolve => {
			const res = { json: resolve } as Response
			patchTodo(req, res, vi.fn())
		})

		expect(response).toMatchObject<PatchTodoResponse>({
			done: true,
			id: todo.id,
			text: "test",
		})
	})

	test("text", async ({ expect }) => {
		const todo: Todo = { id: randomUUID(), text: "test", done: false }
		todos.push(todo)

		const req = { params: { id: todo.id }, body: { text: "text" } } as Request

		const response = await new Promise<PatchTodoResponse>(resolve => {
			const res = { json: resolve } as Response
			patchTodo(req, res, vi.fn())
		})

		expect(response).toMatchObject<PatchTodoResponse>({
			done: false,
			id: todo.id,
			text: "text",
		})
	})

	test("both", async ({ expect }) => {
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

	test("invalid done", async ({ expect }) => {
		const todo: Todo = { id: randomUUID(), text: "test", done: false }
		todos.push(todo)

		const req = {
			params: { id: todo.id },
			body: { done: "true" },
		} as unknown as Request

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
			body: { text: 0 },
		} as unknown as Request

		const status = await new Promise(resolve => {
			const res = { sendStatus: resolve } as Response
			patchTodo(req, res, vi.fn())
		})

		expect(status).toBe(400)
	})
})
