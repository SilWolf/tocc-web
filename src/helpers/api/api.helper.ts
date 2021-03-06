import { City } from 'types/City.type'
import {
	Game,
	Game_Req,
	GameCheckItem,
	GameSignUp,
	GameSignUp_Req,
	GameSignUpIdAndStatus,
} from 'types/Game.type'
import {
	PlayerVerification,
	PlayerVerificationRegister_Req,
	User,
} from 'types/User.type'

import { DataTableState } from 'src/components/DataTable'
import { Character } from 'src/types'
import { Promotion } from 'src/types/Promotion.type'
import { Race } from 'src/types/Race.type'
import { Media } from 'src/types/utils/Media.type'

import { ExtendedAxiosRequestConfig, getInstance } from './api.service'

export type ApiGetParams = {
	_q?: string
	_sort?: string
	_start?: string | number
	_limit?: string | number
}

export const convertDataTableStateToApiParams = (
	state: DataTableState<Record<string, unknown>>
): ApiGetParams => {
	const newApiParams: ApiGetParams = {}

	if (state.sortBy?.length > 0) {
		newApiParams._sort = state.sortBy
			.map((sortBy) => `${sortBy.id}:${sortBy.desc ? 'DESC' : 'ASC'}`)
			.join(',')
	}

	if (state.pageSize) {
		newApiParams._limit = state.pageSize

		if (state.pageIndex !== undefined) {
			newApiParams._start = state.pageSize * state.pageIndex || 0
		}
	}

	return newApiParams
}

export const getApis = (config?: { jwt?: string }) => {
	const api = getInstance(config)

	return {
		postRegister: async (
			username: string,
			password: string
		): Promise<{
			jwt: string
			user: User
		}> => {
			return api.post<{
				jwt: string
				user: User
			}>('/auth/local/register', {
				username,
				email: username,
				password,
			})
		},

		postLogin: async (
			identifier: string,
			password: string
		): Promise<{
			jwt: string
			user: User
		}> => {
			return api.post<{
				jwt: string
				user: User
			}>('/auth/local', {
				identifier,
				password,
			})
		},

		getMe: async (): Promise<User> => {
			return api.get<User>('/users/me')
		},

		getMyCharacters: async (): Promise<Character[]> =>
			api.get<Character[]>('/characters/me'),

		getGames: async (): Promise<Game[]> => api.get<Game[]>('/games'),
		getPendingGames: async (): Promise<Game[]> =>
			api.get<Game[]>('/games?_pending=true'),

		dmGetGames: async (config: ExtendedAxiosRequestConfig): Promise<Game[]> =>
			api.get<Game[]>('/games', {
				...config,
				params: {
					_sort: 'updatedAt:DESC',
					...config.params,
				},
			}),

		getGamesCount: async (): Promise<number> =>
			api.get<number>('games/count', { cache: { maxAge: 5 * 60 * 1000 } }),

		getGameById: async (id: string): Promise<Game> =>
			api.get<Game>(`/games/${id}`),

		getGameChecklistsById: async (id: string): Promise<GameCheckItem[]> =>
			api.get<GameCheckItem[]>(`/games/${id}/checklists`),

		getGameSignUpsByGameId: async (id: string): Promise<GameSignUp[]> =>
			api.get<GameSignUp[]>(`/game-sign-ups`, {
				params: {
					game: id,
					_sort: 'createdAt:ASC',
				},
			}),

		getCities: async (): Promise<City[]> =>
			api.get<City[]>('/cities', { cache: { maxAge: 5 * 60 * 1000 } }),

		getDMs: async (): Promise<User[]> =>
			api.get<User[]>('/users?role.type=dungeon_master', {
				cache: { maxAge: 5 * 60 * 1000 },
			}),

		dmGetCities: async (): Promise<City[]> =>
			api.get<City[]>('/dm/cities', { cache: { maxAge: 5 * 60 * 1000 } }),

		dmGetCharacters: async (
			config: ExtendedAxiosRequestConfig
		): Promise<Character[]> =>
			api.get<Character[]>('/characters', {
				cache: { maxAge: 5 * 60 * 1000 },
				...config,
			}),

		getCharactersCount: async (): Promise<number> =>
			api.get<number>('/characters/count', {
				cache: { maxAge: 5 * 60 * 1000 },
			}),

		getCharacterByName: async (name: string): Promise<Character | undefined> =>
			api
				.get<Character[]>('/characters', {
					params: { name },
					// cache: { maxAge: 5 * 60 * 1000 },
				})
				.then((characters) => characters[0]),

		getCharacterById: async (id: string): Promise<Character> =>
			api.get<Character>(`/characters/${id}`, {
				cache: { maxAge: 5 * 60 * 1000 },
			}),

		patchCharacterById: async (id: string, payload: any): Promise<Character> =>
			api.put<Character>(`/characters/${id}`, payload),

		dmGetPlayers: async ({
			params,
			...config
		}: ExtendedAxiosRequestConfig): Promise<User[]> =>
			api.get<User[]>('/users', {
				cache: { maxAge: 5 * 60 * 1000 },
				params: {
					'role.name': 'Authenticated',
					...params,
				},
				...config,
			}),

		getPlayersCount: async (): Promise<number> =>
			api.get<number>('/users/count', {
				params: {
					'role.name': 'Authenticated',
				},
				cache: { maxAge: 5 * 60 * 1000 },
			}),

		getPlayerById: async (id: string): Promise<User> =>
			api.get<User>(`/users/${id}`),

		getPromotions: async (): Promise<Promotion> =>
			api.get<Promotion>('/promotions', {
				cache: { maxAge: 5 * 60 * 1000 },
				...config,
			}),

		getAuthProviderCallback: async (
			provider: string,
			accessToken: string
		): Promise<{
			jwt: string
			user: User
		}> =>
			api.get(`/auth/${provider}/callback`, {
				params: { access_token: accessToken },
			}),

		postSignUp: async (
			gameId: string,
			payload: GameSignUp_Req
		): Promise<GameSignUp> => api.post(`/games/${gameId}/signUp`, payload),

		getMyGameSignUpsByGameId: async (gameId: string): Promise<GameSignUp> =>
			api.get(`/users/me/games/${gameId}/game-sign-ups`),

		getDMPendingGames: async (): Promise<Game[]> =>
			api.get(`/dms/me/games?_pending=true`),

		createOrUpdateGame: async (game: Game_Req): Promise<Game> => {
			if (!game.id) {
				return api.post(`/games`, game)
			} else {
				return api.put(`/games/${game.id}`, game)
			}
		},

		getGameCharactersById: async (id: string) =>
			api.get(`/games/${id}/characters`),

		patchGameToPublishById: async (id: string) =>
			api.patch(`/games/${id}/publish`, {}),

		patchGameToConfirmedById: async (
			id: string,
			gameSignUps: GameSignUpIdAndStatus[]
		) =>
			api.patch(`/games/${id}/confirm`, {
				gameSignUps,
			}),

		patchGameToCompletedById: async (id: string) =>
			api.patch(`/games/${id}/completed`, {}),

		getCharacterRecordById: async (id: string) =>
			api.get(`/character-records/${id}`),

		patchCharacterRecordToAcceptedById: async (id: string) =>
			api.patch(`/character-records/${id}/accept`, {}),

		getPlayerVerificationByCode: async (
			code: string
		): Promise<PlayerVerification> =>
			api.get<PlayerVerification>(`/player-verifications/${code}`),

		patchUserToPlayer: async (payload: PlayerVerificationRegister_Req) =>
			api.post(
				`/player-verifications/${payload.verificationCode}/register`,
				payload
			),

		postFile: async (file: File | Blob, filename?: string): Promise<Media> => {
			const formData = new FormData()
			formData.append('files', file, filename || (file as File).name)

			return api
				.post<Media[]>('/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((newImages) => newImages[0])
		},

		getRaces: async (): Promise<Race[]> => api.get('/races'),
	}
}

const apis = getApis()
export default apis
