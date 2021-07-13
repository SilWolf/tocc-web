import { Entity } from './utils/Entity.type'
import { Media } from './utils/Media.type'

export type User = Entity & {
	username: string
	name: string
	email?: string
	provider?: string
	role?: string
	confirmed?: boolean
	blocked?: boolean
	phone?: string
	portraitImage?: Media
	code?: string
}

export type SessionUser = {
	jwt: string
	user: User
	isLogined: boolean
}
