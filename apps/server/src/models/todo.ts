import type { UUID } from "crypto"

export interface Todo {
	readonly done: boolean
	readonly id: UUID
	readonly text: string
}

export const todos: Todo[] = []
