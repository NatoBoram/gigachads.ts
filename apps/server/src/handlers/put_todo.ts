import type {
	PutTodoBody,
	PutTodoQuery,
	PutTodoResponse,
	TodoParams,
} from "@natoboram/gigachads.ts-client"
import type { Locals, RequestHandler } from "express"
import type { Mutable } from "../interfaces/mutable.ts"
import type { Todo } from "../models/todo.ts"
import { todos } from "../models/todo.ts"

type PutTodo = RequestHandler<
	TodoParams,
	PutTodoResponse,
	PutTodoBody,
	PutTodoQuery,
	Locals
>

export const putTodo: PutTodo = ((req, res) => {
	const index = todos.findIndex(todo => todo.id === req.params.id)
	if (index === -1) return void res.sendStatus(404)

	const found: Mutable<Todo> | undefined = todos[index]
	if (!found) return void res.sendStatus(500)

	found.done = req.body.done
	found.text = req.body.text

	todos[index] = found
	return void res.json(found)
}) satisfies PutTodo
