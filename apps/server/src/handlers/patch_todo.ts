import type {
	PatchTodoBody,
	PatchTodoQuery,
	PatchTodoResponse,
	TodoParams,
} from "@natoboram/gigachads.ts-client"
import type { Locals, RequestHandler } from "express"
import type { Mutable } from "../interfaces/mutable.ts"
import type { Todo } from "../models/todo.ts"
import { todos } from "../models/todo.ts"

type PatchTodo = RequestHandler<
	TodoParams,
	PatchTodoResponse,
	PatchTodoBody,
	PatchTodoQuery,
	Locals
>

export const patchTodo: PatchTodo = ((req, res) => {
	if (typeof req.body !== "object") return void res.sendStatus(400)

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
}) satisfies PatchTodo
