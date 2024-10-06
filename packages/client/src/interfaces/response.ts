export type Response<T, E = unknown> = ErrorResponse<E> | OkResponse<T>

export interface OkResponse<T> extends globalThis.Response {
	readonly ok: true
	readonly json: () => Promise<T>
}

export interface ErrorResponse<E> extends globalThis.Response {
	readonly ok: false
	readonly json: () => Promise<E>
}
