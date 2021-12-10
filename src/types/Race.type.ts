import { Entity } from './utils/Entity.type'

export type Race = Entity & {
	name: string
	code?: string
	nameEn?: string
	order: number
	isSelectable?: boolean
	isParentRace: boolean
	introduction?: string
	parentRace?: string
}
