import type {
	PostTodoBody,
	PostTodoQuery,
	PostTodoResponse,
	TodosParams,
} from "@natoboram/gigachads.ts-client"
import { randomUUID } from "crypto"
import type { RequestHandler } from "express"
import type { LocalsObj } from "../express/locals_obj.ts"
import { todos } from "../models/todo.ts"

// eslint-disable-next-line func-style
export const postTodo: RequestHandler<
	TodosParams,
	PostTodoResponse,
	PostTodoBody,
	PostTodoQuery,
	LocalsObj
> = (req, res) => {
	const todo = { done: false, id: randomUUID(), text: req.body.text }
	todos.push(todo)
	return void res.json(todo)
}
