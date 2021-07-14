import { Entity } from './utils/Entity.type'

export type City = Entity & {
	name: string
	code: string
	shopName?: string
	shopAddress?: string
}
