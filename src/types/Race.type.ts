import { Entity } from './utils/Entity.type'

export type Race = Entity & {
	name: string
	code: string
	nameEn: string
	isSelectable: boolean
	isParentRace: boolean
	introduction: string
}
