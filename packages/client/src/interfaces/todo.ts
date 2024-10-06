import type { UUID } from "crypto"

export type PatchTodoResponse = GetTodoResponse
export type PostTodoResponse = GetTodoResponse
export type PutTodoResponse = GetTodoResponse

export interface GetTodoParams {
	readonly id: UUID
}

export interface GetTodoResponse {
	readonly done: boolean
	readonly id: UUID
	readonly text: string
}

export interface GetTodosParams {
	readonly done?: boolean
	readonly limit?: number
	readonly page?: number
	readonly search?: string
}

export interface GetTodosResponse {
	readonly content: GetTodoResponse[]
	readonly limit: number
	readonly page: number
}

export interface PatchTodoBody {
	readonly done?: boolean
	readonly text?: string
}

export interface PostTodoBody {
	readonly text: string
}

export interface PutTodoBody {
	readonly done: boolean
	readonly text: string
}
