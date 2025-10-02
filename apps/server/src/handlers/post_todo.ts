import type {
	PostTodoBody,
	PostTodoQuery,
	PostTodoResponse,
	TodosParams,
} from "@natoboram/gigachads.ts-client"
import { randomUUID } from "crypto"
import type { Locals, RequestHandler } from "express"
import { todos } from "../models/todo.ts"

type PostTodo = RequestHandler<
	TodosParams,
	PostTodoResponse,
	PostTodoBody,
	PostTodoQuery,
	Locals
>

export const postTodo: PostTodo = ((req, res) => {
	const todo = { done: false, id: randomUUID(), text: req.body.text }
	todos.push(todo)
	return void res.json(todo)
}) satisfies PostTodo
