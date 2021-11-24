import { Character, Character_Simple } from './Character.type'
import { City } from './City.type'
import { User } from './User.type'
import { Entity } from './utils/Entity.type'

export enum GAME_STATUS {
	NEW = 'new',
	DRAFT = 'draft',
	PUBLISHED = 'published',
	CONFIRMED = 'confirmed',
	COMPLETED = 'completed',
	DONE = 'done',
	CLOSED = 'closed',
}

export type GameOutlineItem = {
	id: string
	description: string
	rewards: GameOutlineReward[]
	remark: string
}

export type GameOutlineReward = {
	id: string
	isPerPlayer: boolean
	amount: number
	unit: string
	remark: string
}

export type GameOutlineRewardCharacterMap = Record<
	string,
	{
		rewardId: string
		denominator: number
		characterMap: Record<
			string,
			{
				characterId: string
				ratio: number
			}
		>
	}
>

export type Game = Entity & {
	title: string
	code: string
	description?: string
	startAt?: string | null
	endAt?: string | null
	timeLengthInMin?: number
	worldStartAt?: string | null
	worldEndAt?: string | null
	lvMin?: number
	lvMax?: number
	capacityMin?: number
	capacityMax?: number
	tags?: string
	remark?: string
	dm?: User
	characters?: Character[]
	gameSignUps?: GameSignUp[]
	gameSignUpCounting?: {
		accepted: number
		rejected: number
		pending: number
	}
	status?: GAME_STATUS

	journals?: string[]
	city?: City

	outline?: GameOutlineItem[]
	outlineRewardCharacterMap?: GameOutlineRewardCharacterMap

	publishedAt?: string
}

export type Game_Req = Omit<
	Game,
	'dm' | 'characters' | 'city' | 'gameSignUps'
> & {
	dm?: string
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
	timeLengthInMin: 0,
	worldStartAt: '',
	worldEndAt: '',
	lvMin: 1,
	lvMax: 1,
	capacityMin: 3,
	capacityMax: 6,
	tags: '',
	remark: '',
	status: GAME_STATUS.NEW,
	city: undefined,
	dm: undefined,
	characters: [],
	gameSignUps: [],
}

export const gameDefaultValue_Req: Game_Req = {
	...gameDefaultValue,
	city: '',
	dm: '',
}

export enum GAME_SIGN_UP_STATUS {
	ACCEPTED = 'accepted',
	PENDING = 'pending',
	REJECTED_FULL = 'rejected_full',
	REJECTED_INVALID_LEVEL = 'rejected_invalidLevel',
	REJECTED_INVALID_CITY = 'rejected_invalidCity',
	REJECTED_NOT_PRIORITIZE = 'rejected_notPrioritize',
}

export type GameSignUp = Entity & {
	game: Game
	character: Character_Simple
	player: User
	status: GAME_SIGN_UP_STATUS
	remarks: string
}

export type GameSignUpIdAndStatus = Pick<GameSignUp, 'id' | 'status'>

export type GameSignUp_Req = {
	character: string
	game: string
	remarks: string
}

export type GameChecklist = {
	id: string
	name: string
	idCard: string
	pos: number
	idBoard: string
	checkItems: GameCheckItem[]
}

export type GameCheckItem = {
	idChecklist: string
	state: 'complete' | 'incomplete'
	id: string
	name: string
	pos: number
	due?: string
	idMember?: string
}
