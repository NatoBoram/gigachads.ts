import type {
	GetTodosParams,
	GetTodosResponse,
} from "@natoboram/gigachads.ts-client"
import type { RequestHandler } from "express"
import type { ParamsDictionary } from "../express/index.js"
import type { LocalsObj } from "../express/locals_obj.js"
import { todos } from "../models/todo.js"

// eslint-disable-next-line func-style
export const getTodos: RequestHandler<
	ParamsDictionary,
	GetTodosResponse,
	undefined,
	GetTodosParams,
	LocalsObj
> = (req, res) => {
	const found = todos.filter(todo => {
		const query = req.query.done === undefined || todo.done === req.query.done
		const search =
			req.query.search === undefined || todo.text.includes(req.query.search)

		return query && search
	})

	const limit = Number(req.query.limit ?? 10)
	const page = Number(req.query.page ?? 0)

	if (isNaN(limit) || isNaN(page)) return void res.sendStatus(400)
	if (Math.round(limit) !== limit || Math.round(page) !== page)
		return void res.sendStatus(400)
	if (limit < 1 || page < 0) return void res.sendStatus(400)

	const content = found.slice(page * limit, page * limit + limit)
	if (content.length === 0) res.status(204)
	else res.status(200)
	return void res.json({ content, limit, page })
}
