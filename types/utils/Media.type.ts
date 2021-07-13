import { Entity } from './Entity.type'

export type Media = Entity & {
	name?: string
	alternativeText?: string
	caption?: string
	hash?: string
	ext?: string
	mime?: string
	size?: number
	width?: number
	height?: number
	formats?: Record<'thumbnail', Omit<Media, 'id'>>
	path?: string | null
	provider?: string
	related?: string[]
	url?: string
}
