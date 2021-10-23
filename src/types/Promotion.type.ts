import { Entity } from './utils/Entity.type'
import { Media } from './utils/Media.type'

export type Promotion = Entity & {
	image: Media
}
