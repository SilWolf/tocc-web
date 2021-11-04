import { Entity } from './utils/Entity.type'

export type Deity = Entity & {
	name: string
	nameEn?: string
	code?: string
}
