import type {
	DeleteTodoBody,
	DeleteTodoQuery,
	DeleteTodoResponse,
	TodoParams,
} from "@natoboram/gigachads.ts-client"
import type { RequestHandler } from "express"
import type { LocalsObj } from "../express/locals_obj.ts"
import { todos } from "../models/todo.ts"

// eslint-disable-next-line func-style
export const deleteTodo: RequestHandler<
	TodoParams,
	DeleteTodoResponse,
	DeleteTodoBody,
	DeleteTodoQuery,
	LocalsObj
> = (req, res) => {
	const index = todos.findIndex(todo => todo.id === req.params.id)
	if (index === -1) return void res.sendStatus(404)

	todos.splice(index, 1)
	return void res.json()
}
