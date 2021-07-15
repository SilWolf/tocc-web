import { Game, User, City } from 'types'

import MockAdapter from 'axios-mock-adapter'
import { AxiosInstance } from 'axios'

import gameJson from './data/game.json'
import dmsJson from './data/dms.json'
import citiesJson from './data/cities.json'

export const mock = (instance: AxiosInstance): void => {
	const mock = new MockAdapter(instance)

	mock
		.onGet('/games')
		.reply<Game[]>(200, [
			gameJson,
			{ ...gameJson, status: 'draft' },
			{ ...gameJson, status: 'confirmed' },
			{ ...gameJson, status: 'completed' },
			{ ...gameJson, status: 'closed' },
			{ ...gameJson, status: 'done' },
		])

	mock.onGet(/\/games\/\w+/).reply<Game>(200, gameJson)

	mock.onGet('/users?role.type=dungeon_master').reply<User[]>(200, dmsJson)
	mock.onGet('/cities').reply<City[]>(200, citiesJson)
}
