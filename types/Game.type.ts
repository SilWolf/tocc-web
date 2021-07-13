import { Character } from './Character.type'
import { City } from './City.type'
import { User } from './User.type'
import { Entity } from './utils/Entity.type'

export type GameRaw = {
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
	status?: string

	characterAndRewards?: GameReward[]
	journals?: string[]
	city?: City

	publishedAt?: string
}

export type GameReward = Entity & {
	gp: number
	xp: number
	remark: string
	items: string[]
	character: Character
}

export type Game = GameRaw & Entity

export const gameDefaultValue: GameRaw = {
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
	status: 'draft',
}
