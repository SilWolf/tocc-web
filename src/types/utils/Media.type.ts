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
	formats?: Partial<
		Record<
			'thumbnail' | 'small' | 'medium' | 'large',
			Omit<Media, 'id' | 'formats'>
		>
	>
	path?: string | null
	provider?: string
	related?: string[]
	url?: string
}
