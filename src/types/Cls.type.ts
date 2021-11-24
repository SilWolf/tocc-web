import { Entity } from './utils/Entity.type'

export type Cls = Entity & {
	name: string
	nameEn?: string
	code?: string
	level?: number
}
