import type {
	GetTodoBody,
	GetTodoParams,
	GetTodoQuery,
	GetTodoResponse,
} from "@natoboram/gigachads.ts-client"
import type { RequestHandler } from "express"
import type { LocalsObj } from "../express/locals_obj.ts"
import { todos } from "../models/todo.ts"

// eslint-disable-next-line func-style
export const getTodo: RequestHandler<
	GetTodoParams,
	GetTodoResponse,
	GetTodoBody,
	GetTodoQuery,
	LocalsObj
> = (req, res) => {
	const found = todos.find(todo => todo.id === req.params.id)
	if (!found) return void res.sendStatus(404)

	return void res.json(found)
}
