import { Background } from './Background.type'
import { City } from './City.type'
import { Cls } from './Cls.type'
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

	// Improvements
	level?: number
	xp?: number
	gp?: number

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
}

export const DEFAULT_CHARACTER: Required<Character> = {
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

	factCompletedGameCount: 0,
	factCollectedXP: 0,
	factCollectedGP: 0,
	factTouchedCharacterCount: 0,

	player: { id: '', username: '', name: '--', displayName: '--' },
	race: { id: '', name: '--' },
	clses: [{ id: '', name: '--' }],
	city: { id: '', name: '--', code: '' },
	background: { id: '', name: '--' },
}
