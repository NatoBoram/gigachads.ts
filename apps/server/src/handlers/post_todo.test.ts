import type { PostTodoResponse } from "@natoboram/gigachads.ts-client"
import type { UUID } from "node:crypto"
import { beforeEach, describe, test, vi } from "vitest"
import { todos } from "../models/todo.ts"
import { postTodo } from "./post_todo.ts"

type Request = Parameters<typeof postTodo>[0]
type Response = Parameters<typeof postTodo>[1]

describe("postTodo", () => {
	beforeEach(() => {
		todos.length = 0
	})

	test("200", async ({ expect }) => {
		const req = { body: { text: "test" } } as Request

		const response = await new Promise<PostTodoResponse>(resolve => {
			const res = { json: resolve } as Response
			postTodo(req, res, vi.fn())
		})

		expect(response).toMatchObject<PostTodoResponse>({
			done: false,
			id: expect.any(String) as UUID,
			text: "test",
		})

		expect(todos).toHaveLength(1)
	})
})
