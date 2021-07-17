import { City } from 'types/City.type'
import { Game } from 'types/Game.type'
import { User } from 'types/User.type'

import { DataTableState } from 'src/components/DataTable'
import { Character } from 'src/types'

import api, { ExtendedAxiosRequestConfig } from './api.service'

export const postLogin = async (
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
}

export const getMe = async (): Promise<User> => {
	return api.get<User>('/auth/me')
}

export const getGames = async (): Promise<Game[]> => api.get<Game[]>('/games')

export const dmGetGames = async (
	config: ExtendedAxiosRequestConfig
): Promise<Game[]> =>
	api.get<Game[]>('/games', {
		cache: { maxAge: 5 * 60 * 1000 },
		...config,
	})

export const getGamesCount = async (): Promise<number> =>
	api.get<number>('games/count', { cache: { maxAge: 5 * 60 * 1000 } })

export const getGameById = async (id: string): Promise<Game> =>
	api.get<Game>(`/games/${id}`)

export const getCities = async (): Promise<City[]> =>
	api.get<City[]>('/cities', { cache: { maxAge: 5 * 60 * 1000 } })

export const getDMs = async (): Promise<User[]> =>
	api.get<User[]>('/users?role.type=dungeon_master', {
		cache: { maxAge: 5 * 60 * 1000 },
	})

export const dmGetCities = async (): Promise<City[]> =>
	api.get<City[]>('/dm/cities', { cache: { maxAge: 5 * 60 * 1000 } })

export const dmGetCharacters = async (
	config: ExtendedAxiosRequestConfig
): Promise<Character[]> =>
	api.get<Character[]>('/characters', {
		cache: { maxAge: 5 * 60 * 1000 },
		...config,
	})

export const getCharactersCount = async (): Promise<number> =>
	api.get<number>('/characters/count', { cache: { maxAge: 5 * 60 * 1000 } })

export const dmGetPlayers = async ({
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
	})

export const getPlayersCount = async (): Promise<number> =>
	api.get<number>('/users/count', {
		params: {
			'role.name': 'Authenticated',
		},
		cache: { maxAge: 5 * 60 * 1000 },
	})

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

export const getAuthProviderCallback = (
	provider: string,
	accessToken: string
): Promise<{
	jwt: string
	user: User
}> =>
	api.get(`/auth/${provider}/callback`, {
		params: { access_token: accessToken },
	})
