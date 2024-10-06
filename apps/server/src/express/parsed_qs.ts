export interface ParsedQs {
	readonly [key: string]: ParsedQs | ParsedQs[] | string[] | string | undefined
}
