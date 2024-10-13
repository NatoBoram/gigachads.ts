export type Response<T, E = unknown> = ErrorResponse<E> | OkResponse<T>

export interface ErrorResponse<E> extends globalThis.Response {
	readonly json: () => Promise<E>
	readonly ok: false
}

export interface OkResponse<T> extends globalThis.Response {
	readonly json: () => Promise<T>
	readonly ok: true
}
