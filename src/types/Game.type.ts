import { Character } from './Character.type'
import { City } from './City.type'
import { User } from './User.type'
import { Entity } from './utils/Entity.type'

export type GameStatus =
	| string
	| 'new'
	| 'draft'
	| 'published'
	| 'confirmed'
	| 'completed'
	| 'done'
	| 'closed'

export type Game = Entity & {
	title: string
	code: string
	description?: string
	startAt?: string
	endAt?: string
	worldStartAt?: string
	worldEndAt?: string
	lvMin?: number
	lvMax?: number
	capacityMin?: number
	capacityMax?: number
	tags?: string
	remark?: string
	dm?: User
	characters?: Character[]
	status?: GameStatus

	journals?: string[]
	city?: City

	publishedAt?: string
}

export type Game_Req = Omit<Game, 'dm' | 'characters' | 'city'> & {
	dm?: string
	characters?: string[]
	city?: string
}

export type GameReward = Entity & {
	gp: number
	xp: number
	remark: string
	items: string[]
	character: Character
}

export type GameReward_Req = Omit<GameReward, 'character'> & {
	character: string
}

export const gameDefaultValue: Game = {
	id: '',
	title: '',
	code: '',
	description: '',
	startAt: '',
	endAt: '',
	worldStartAt: '',
	worldEndAt: '',
	lvMin: 1,
	lvMax: 1,
	capacityMin: 3,
	capacityMax: 6,
	tags: '',
	remark: '',
	status: 'new',
	city: undefined,
	dm: undefined,
	characters: [],
}

export const gameDefaultValue_Req: Game_Req = {
	...gameDefaultValue,
	city: '',
	dm: '',
	characters: [],
}

export type GameSignUp = Entity & {
	game: Game
	character: Character
	player: User
	status: 'pending' | 'accepted' | 'rejected'
	remarks: string
}

export type GameSignUp_Req = {
	character: string
	game: string
	remarks: string
}
