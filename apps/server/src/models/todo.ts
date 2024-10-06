import type { UUID } from "crypto"

export interface Todo {
	readonly id: UUID
	readonly text: string
	readonly done: boolean
}

export const todos: Todo[] = []
