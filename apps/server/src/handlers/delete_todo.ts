import type {
	DeleteTodoBody,
	DeleteTodoQuery,
	DeleteTodoResponse,
	TodoParams,
} from "@natoboram/gigachads.ts-client"
import type { Locals, RequestHandler } from "express"
import { todos } from "../models/todo.ts"

type DeleteTodo = RequestHandler<
	TodoParams,
	DeleteTodoResponse,
	DeleteTodoBody,
	DeleteTodoQuery,
	Locals
>

export const deleteTodo: DeleteTodo = ((req, res) => {
	const index = todos.findIndex(todo => todo.id === req.params.id)
	if (index === -1) return void res.sendStatus(404)

	todos.splice(index, 1)
	return void res.json()
}) satisfies DeleteTodo
