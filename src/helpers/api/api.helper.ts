import { City } from 'types/City.type'
import { Game } from 'types/Game.type'
import { User } from 'types/User.type'

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

export type ApiGetParams = {
	_q?: string
	_sort?: string
	_start?: string | number
	_limit?: string | number
}
