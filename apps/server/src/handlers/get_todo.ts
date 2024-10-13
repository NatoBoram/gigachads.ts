import type { UUID } from "crypto"
import type { RequestHandler } from "express"
import type { ParamsDictionary, ParsedQs } from "../express/index.ts"
import type { LocalsObj } from "../express/locals_obj.ts"
import type { Todo } from "../models/todo.ts"
import { todos } from "../models/todo.ts"

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
