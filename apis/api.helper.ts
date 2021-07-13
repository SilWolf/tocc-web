import api from './api.service'
import { User } from '../types/User.type'
import { Game } from '../types/Game.type'

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
