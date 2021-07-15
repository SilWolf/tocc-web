import { Entity } from './utils/Entity.type'

export type Character = Entity & {
	name: string
	type?: string
	level?: number
	xp?: number
	gp?: number
	clses?: string[]
	code?: string
	city?: string
	player?: string
}
