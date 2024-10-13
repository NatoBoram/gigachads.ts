import type {
	PutTodoBody,
	PutTodoParams,
	PutTodoQuery,
	PutTodoResponse,
} from "@natoboram/gigachads.ts-client"
import type { RequestHandler } from "express"
import type { LocalsObj } from "../express/locals_obj.ts"
import type { Mutable } from "../interfaces/mutable.ts"
import { todos, type Todo } from "../models/todo.ts"

// eslint-disable-next-line func-style
export const putTodo: RequestHandler<
	PutTodoParams,
	PutTodoResponse,
	PutTodoBody,
	PutTodoQuery,
	LocalsObj
> = (req, res) => {
	const index = todos.findIndex(todo => todo.id === req.params.id)
	if (index === -1) return void res.sendStatus(404)

	const found: Mutable<Todo> | undefined = todos[index]
	if (!found) return void res.sendStatus(500)

	found.done = req.body.done
	found.text = req.body.text

	todos[index] = found
	return void res.json(found)
}
