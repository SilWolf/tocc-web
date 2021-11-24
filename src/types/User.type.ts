import { Character } from '.'
import { City } from './City.type'
import { Entity } from './utils/Entity.type'
import { Media } from './utils/Media.type'

export type User = Entity & {
	username: string
	name: string
	displayName: string
	email?: string
	provider?: string
	role?: UserRole
	confirmed?: boolean
	blocked?: boolean
	phone?: string
	portraitImage?: Media
	code?: string
	city?: City
}

export enum USER_ROLE {
	PLAYER = 'Player',
	DM = 'Dungeon Master',
	NORMAL = 'Authenticated',
}

export type UserRole = Entity & {
	name: USER_ROLE
	type: string
	description: string
}

export type SessionUser = {
	jwt: string
	user: User
	isLogined: boolean
}

export const ROLE = {
	DUNGEON_MASTER: 'Dungeon Master',
	PLAYER: 'Player',
}

export type PlayerVerification = Entity & {
	verificationCode: string
	playerCode: string
	name: string
	nickname: string
	characters: Character[]
	city: City
}

export type PlayerVerificationRegister_Req = {
	verificationCode: string
	name: string
	nickname: string
	email: string
}
