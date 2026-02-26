import type { GlobalFetch, Response } from "./interfaces/index.ts"
import type {
	DeleteTodoResponse,
	GetTodoResponse,
	GetTodosQuery,
	GetTodosResponse,
	PatchTodoBody,
	PatchTodoResponse,
	PostTodoBody,
	PostTodoResponse,
	PutTodoBody,
	PutTodoResponse,
	TodoParams,
} from "./interfaces/todo.ts"
import { newUrl } from "./new_url.ts"

export class GigachadsServerClient {
	readonly #base: URL
	readonly #fetch: GlobalFetch
	readonly #token: string

	constructor(base: URL, fetch: GlobalFetch, token: string) {
		this.#base = base
		this.#fetch = fetch
		this.#token = token
	}

	async deleteTodo(
		id: TodoParams["id"],
	): Promise<Response<DeleteTodoResponse>> {
		const url = newUrl(`/todos/${id}`, this.#base)
		return this.#delete(url)
	}

	async getTodo(id: TodoParams["id"]): Promise<Response<GetTodoResponse>> {
		const url = newUrl(`/todos/${id}`, this.#base)
		return this.#get(url)
	}

	async getTodos(query: GetTodosQuery): Promise<Response<GetTodosResponse>> {
		const url = newUrl("/todos", this.#base, { ...query })
		return this.#get(url)
	}

	async patchTodo(
		id: TodoParams["id"],
		body: PatchTodoBody,
	): Promise<Response<PatchTodoResponse>> {
		const url = newUrl(`/todos/${id}`, this.#base)
		return this.#patch(url, body)
	}

	async postTodo(body: PostTodoBody): Promise<Response<PostTodoResponse>> {
		const url = newUrl("/todos", this.#base)
		return this.#post(url, body)
	}

	async putTodo(
		id: TodoParams["id"],
		body: PutTodoBody,
	): Promise<Response<PutTodoResponse>> {
		const url = newUrl(`/todos/${id}`, this.#base)
		return this.#put(url, body)
	}

	async #delete<T, E = unknown>(
		input: URL,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.#fetch(input, {
			headers: this.#deleteHeaders(headers),
			method: "DELETE",
		})
	}

	#deleteHeaders(init?: HeadersInit): Headers {
		const headers = new Headers(init)

		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.#token}`)

		return headers
	}

	async #get<T, E = unknown>(
		input: URL,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.#fetch(input, {
			headers: this.#getHeaders(headers),
			method: "GET",
		})
	}

	#getHeaders(init?: HeadersInit): Headers {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.#token}`)

		return headers
	}

	async #patch<T, E = unknown>(
		input: URL,
		body: unknown,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.#fetch(input, {
			headers: this.#patchHeaders(headers),
			method: "PATCH",
			body: JSON.stringify(body),
		})
	}

	#patchHeaders(init?: HeadersInit): Headers {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.#token}`)
		if (!headers.has("Content-Type"))
			headers.set("Content-Type", "application/json")

		return headers
	}

	async #post<T, E = unknown>(
		input: URL,
		body: unknown,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.#fetch(input, {
			headers: this.#postHeaders(headers),
			method: "POST",
			body: JSON.stringify(body),
		})
	}

	#postHeaders(init?: HeadersInit): Headers {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.#token}`)
		if (!headers.has("Content-Type"))
			headers.set("Content-Type", "application/json")

		return headers
	}

	async #put<T, E = unknown>(
		input: URL,
		body: unknown,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.#fetch(input, {
			headers: this.#putHeaders(headers),
			method: "PUT",
			body: JSON.stringify(body),
		})
	}

	#putHeaders(init?: HeadersInit): Headers {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.#token}`)
		if (!headers.has("Content-Type"))
			headers.set("Content-Type", "application/json")

		return headers
	}
}
