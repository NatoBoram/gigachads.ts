import type { Response } from "./response.ts"

export type Fetch<T, E = unknown> = (
	input: RequestInfo | URL,
	init?: RequestInit,
) => Promise<Response<T, E>>

export type GlobalFetch = typeof fetch
