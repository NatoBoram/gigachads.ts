import { describe, test, vi } from "vitest"
import { TOKEN } from "../env.ts"
import { useToken } from "./use_token.ts"

type Request = Parameters<typeof useToken>[0]
type Response = Parameters<typeof useToken>[1]

describe("useToken", () => {
	test("401", async ({ expect }) => {
		const req = { headers: {} } as Request

		const status = await new Promise<number>(resolve => {
			const res = { sendStatus: resolve } as Response
			useToken(req, res, vi.fn())
		})

		expect(status).toBe(401)
	})

	test("403", async ({ expect }) => {
		const req = { headers: { authorization: "Bearer" } } as Request

		const status = await new Promise<number>(resolve => {
			const res = { sendStatus: resolve } as Response
			useToken(req, res, vi.fn())
		})

		expect(status).toBe(403)
	})

	test("valid token", ({ expect }) => {
		const req = {
			headers: { authorization: `Bearer ${TOKEN}` },
		} as Request

		const res = {} as Response
		const next = vi.fn()
		useToken(req, res, next)

		expect(next).toBeCalled()
	})
})
