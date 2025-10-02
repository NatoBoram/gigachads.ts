import type { Locals, RequestHandler } from "express"
import type { ParamsDictionary } from "express-serve-static-core"
import type { ParsedQs } from "qs"
import { TOKEN } from "../env.ts"

type UseToken = RequestHandler<
	ParamsDictionary,
	undefined,
	undefined,
	ParsedQs,
	Locals
>

export const useToken: UseToken = ((req, res, next) => {
	if (!req.headers.authorization) return void res.sendStatus(401)
	if (req.headers.authorization !== `Bearer ${TOKEN}`)
		return void res.sendStatus(403)

	next()
}) satisfies UseToken
