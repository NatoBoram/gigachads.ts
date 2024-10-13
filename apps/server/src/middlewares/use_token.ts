import type { RequestHandler } from "express"
import { TOKEN } from "../env.ts"
import type { LocalsObj } from "../express/locals_obj.ts"
import type { ParamsDictionary } from "../express/params_dictionary.ts"
import type { ParsedQs } from "../express/parsed_qs.ts"

// eslint-disable-next-line func-style
export const useToken: RequestHandler<
	ParamsDictionary,
	undefined,
	undefined,
	ParsedQs,
	LocalsObj
> = (req, res, next) => {
	if (!req.headers.authorization) return void res.sendStatus(401)
	if (req.headers.authorization !== `Bearer ${TOKEN}`)
		return void res.sendStatus(403)

	next()
}
