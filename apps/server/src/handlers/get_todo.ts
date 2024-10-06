import type { UUID } from "crypto"
import type { RequestHandler } from "express"
import type { ParamsDictionary, ParsedQs } from "../express/index.js"
import type { LocalsObj } from "../express/locals_obj.js"
import type { Todo } from "../models/todo.js"
import { todos } from "../models/todo.js"

interface GetTodoParams extends ParamsDictionary {
	readonly id: UUID
}

// eslint-disable-next-line func-style
export const getTodo: RequestHandler<
	GetTodoParams,
	Todo,
	undefined,
	ParsedQs,
	LocalsObj
> = (req, res) => {
	const found = todos.find(todo => todo.id === req.params.id)
	if (!found) return void res.sendStatus(404)

	return void res.json(found)
}
