import { Entity } from './utils/Entity.type'

export type City = Entity & {
	name: string
	code: string
	shopName?: string
	shopAddress?: string
	charactersCount?: number
	playersCount?: number
	level?: number
	prosperity?: number
	prosperityMax?: number
}
