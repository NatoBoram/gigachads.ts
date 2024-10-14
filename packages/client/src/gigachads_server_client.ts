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

export class GigachadsServerClient {
	constructor(
		private readonly base: URL,
		private readonly fetch: GlobalFetch,
		private readonly token: string,
	) {}

	async deleteTodo(
		id: TodoParams["id"],
	): Promise<Response<DeleteTodoResponse>> {
		const url = this.gcUrl(`/todos/${id}`)
		return this.delete(url)
	}

	async getTodo(id: TodoParams["id"]): Promise<Response<GetTodoResponse>> {
		const url = this.gcUrl(`/todos/${id}`)
		return this.get(url)
	}

	async getTodos(query: GetTodosQuery): Promise<Response<GetTodosResponse>> {
		const url = this.gcUrl("/todos", { ...query })
		return this.get(url)
	}

	async patchTodo(
		id: TodoParams["id"],
		body: PatchTodoBody,
	): Promise<Response<PatchTodoResponse>> {
		const url = this.gcUrl(`/todos/${id}`)
		return this.patch(url, body)
	}

	async postTodo(body: PostTodoBody): Promise<Response<PostTodoResponse>> {
		const url = this.gcUrl("/todos")
		return this.post(url, body)
	}

	async putTodo(
		id: TodoParams["id"],
		body: PutTodoBody,
	): Promise<Response<PutTodoResponse>> {
		const url = this.gcUrl(`/todos/${id}`)
		return this.put(url, body)
	}

	private async delete<T, E = unknown>(
		input: URL,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.fetch(input, {
			headers: this.deleteHeaders(headers),
			method: "DELETE",
		})
	}

	private deleteHeaders(init?: HeadersInit) {
		const headers = new Headers(init)

		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.token}`)

		return headers
	}

	/** Creates a full URL to be used to make API requests.
	 *
	 * Before creating the final URL, leading slashes are removed from the path
	 * and a trailing slash is added to the base.
	 */
	private gcUrl(path: string, query?: Record<string, unknown>): URL {
		const url = new URL(
			// The path should not start with a slash
			path.replace(/^\/+/, ""),
			// The base should end with a slash
			this.base.toString().replace(/([^/]$)/, "$1/"),
		)

		if (query)
			for (const [name, value] of Object.entries(query)) {
				if (value instanceof Date)
					url.searchParams.set(name, value.toISOString())
				else url.searchParams.set(name, String(value))
			}

		return url
	}

	private async get<T, E = unknown>(
		input: URL,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.fetch(input, {
			headers: this.getHeaders(headers),
			method: "GET",
		})
	}

	private getHeaders(init?: HeadersInit) {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.token}`)

		return headers
	}

	private async patch<T, E = unknown>(
		input: URL,
		body: unknown,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.fetch(input, {
			headers: this.patchHeaders(headers),
			method: "PATCH",
			body: JSON.stringify(body),
		})
	}

	private patchHeaders(init?: HeadersInit) {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.token}`)
		if (!headers.has("Content-Type"))
			headers.set("Content-Type", "application/json")

		return headers
	}

	private async post<T, E = unknown>(
		input: URL,
		body: unknown,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.fetch(input, {
			headers: this.postHeaders(headers),
			method: "POST",
			body: JSON.stringify(body),
		})
	}

	private postHeaders(init?: HeadersInit) {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.token}`)
		if (!headers.has("Content-Type"))
			headers.set("Content-Type", "application/json")

		return headers
	}

	private async put<T, E = unknown>(
		input: URL,
		body: unknown,
		headers: HeadersInit = {},
	): Promise<Response<T, E>> {
		return this.fetch(input, {
			headers: this.putHeaders(headers),
			method: "PUT",
			body: JSON.stringify(body),
		})
	}

	private putHeaders(init?: HeadersInit) {
		const headers = new Headers(init)

		if (!headers.has("Accept")) headers.set("Accept", "application/json")
		if (!headers.has("Authorization"))
			headers.set("Authorization", `Bearer ${this.token}`)
		if (!headers.has("Content-Type"))
			headers.set("Content-Type", "application/json")

		return headers
	}
}
