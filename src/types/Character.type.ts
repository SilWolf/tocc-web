import { Game } from '.'
import { Background } from './Background.type'
import { City } from './City.type'
import { Cls } from './Cls.type'
import { Deity } from './Deity.type'
import { Race } from './Race.type'
import { User } from './User.type'
import { Entity } from './utils/Entity.type'
import { Media } from './utils/Media.type'

export type Character = Entity & {
	// Essential
	name: string
	nickname?: string
	code?: string
	type?: string

	// Profile
	portraitImage?: Media
	coverImage?: Media

	// Improvements
	level?: number
	levelWithClsesString?: string
	xp?: number
	gp?: number
	attribute?: Record<string, number>

	// Bio
	bioSaying?: string
	bioTitle?: string
	bioOrganization?: string
	bioRole?: string
	bioBelief?: string
	bioPersonalityTrait?: string
	bioIdeal?: string
	bioBond?: string
	bioFlaw?: string
	bioDescription?: string
	bioAppearance?: string
	bioStory?: string

	// Fact
	factCompletedGameCount?: number
	factCollectedXP?: number
	factCollectedGP?: number
	factTouchedCharacterCount?: number

	// Relationship
	player?: User
	race?: Race
	clses?: Cls[]
	city?: City
	background?: Background
	deity?: Deity
}

export type Character_Simple = Omit<
	Character,
	'player' | 'race' | 'clses' | 'city' | 'background' | 'deity'
> & {
	player: string
	race: string
	clses: string[]
	city: string
	background: string
	deity: string
}

export const DEFAULT_CHARACTER: Character = {
	id: '',
	_id: '',
	__v: 0,
	createdAt: '',
	updatedAt: '',
	deletedAt: '',
	createdBy: '',
	updatedBy: '',
	deletedBy: '',

	name: '',
	nickname: '',
	code: '',
	type: '',
	portraitImage: {
		id: '',
		url: '',
	},
	level: 0,
	levelWithClsesString: '',
	xp: 0,
	gp: 0,

	bioSaying: '--',
	bioTitle: '--',
	bioOrganization: '--',
	bioRole: '--',
	bioBelief: '--',
	bioPersonalityTrait: '--',
	bioIdeal: '--',
	bioBond: '--',
	bioFlaw: '--',
	bioDescription: '--',
	bioAppearance: '--',
	bioStory: '--',

	factCompletedGameCount: 0,
	factCollectedXP: 0,
	factCollectedGP: 0,
	factTouchedCharacterCount: 0,

	player: { id: '', username: '', name: '--', displayName: '--' },
	race: { id: '', name: '--', order: 0, isParentRace: false },
	clses: [{ id: '', name: '--' }],
	city: { id: '', name: '--', code: '' },
	background: { id: '', name: '--' },
	deity: { id: '', name: '--' },
}

export type CharacterRecord = Entity & {
	subject: string
	content: string
	worldStartAt: string
	worldEndAt: string
	reward: Record<string, CharacterRecordRewardItem>
	character: Character
	player: User
	game: Game
}

export type CharacterRecordRewardItem = {
	amount: number
	details: CharacterRecordRewardItemDetailItem[]
}

export type CharacterRecordRewardItemDetailItem = {
	description: string
	amount: number
	metadata: {
		outlineItemId: string
		rewardId: string
	}
}
