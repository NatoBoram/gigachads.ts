import type {
	PatchTodoBody,
	PatchTodoQuery,
	PatchTodoResponse,
	TodoParams,
} from "@natoboram/gigachads.ts-client"
import type { RequestHandler } from "express"
import type { LocalsObj } from "../express/locals_obj.ts"
import type { Mutable } from "../interfaces/mutable.ts"
import { todos, type Todo } from "../models/todo.ts"

// eslint-disable-next-line func-style
export const patchTodo: RequestHandler<
	TodoParams,
	PatchTodoResponse,
	PatchTodoBody,
	PatchTodoQuery,
	LocalsObj
> = (req, res) => {
	const index = todos.findIndex(todo => todo.id === req.params.id)
	if (index === -1) return void res.sendStatus(404)

	const found: Mutable<Todo> | undefined = todos[index]
	if (!found) return void res.sendStatus(500)

	for (const [key, value] of Object.entries(req.body)) {
		if (key === "id") return void res.sendStatus(400)

		if (key === "done") {
			if (typeof value !== "boolean") return void res.sendStatus(400)
			found.done = value
		}

		if (key === "text") {
			if (typeof value !== "string") return void res.sendStatus(400)
			found.text = value
		}
	}

	todos[index] = found
	return void res.json(found)
}
