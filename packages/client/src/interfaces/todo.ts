import type { UUID } from "crypto"

export type DeleteTodoBody = undefined
export type DeleteTodoQuery = undefined
export type DeleteTodoResponse = undefined
export type GetTodoBody = undefined
export type GetTodoQuery = undefined
export type GetTodosBody = undefined
export type PatchTodoQuery = undefined
export type PatchTodoResponse = GetTodoResponse
export type PostTodoParams = undefined
export type PostTodoQuery = undefined
export type PostTodoResponse = GetTodoResponse
export type PutTodoQuery = undefined
export type PutTodoResponse = GetTodoResponse
export type TodosParams = undefined

export interface GetTodoResponse {
	readonly done: boolean
	readonly id: UUID
	readonly text: string
}

export interface GetTodosQuery {
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

export interface TodoParams {
	readonly id: UUID
}
