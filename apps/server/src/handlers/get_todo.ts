import type {
	GetTodoBody,
	GetTodoQuery,
	GetTodoResponse,
	TodoParams,
} from "@natoboram/gigachads.ts-client"
import type { Locals, RequestHandler } from "express"
import { todos } from "../models/todo.ts"

type GetTodo = RequestHandler<
	TodoParams,
	GetTodoResponse,
	GetTodoBody,
	GetTodoQuery,
	Locals
>

export const getTodo: GetTodo = ((req, res) => {
	const found = todos.find(todo => todo.id === req.params.id)
	if (!found) return void res.sendStatus(404)

	return void res.json(found)
}) satisfies GetTodo
