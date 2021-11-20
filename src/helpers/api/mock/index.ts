import { City, Game, User } from 'types'

import { GAME_STATUS } from 'src/types/Game.type'

import citiesJson from './data/cities.json'
import dmsJson from './data/dms.json'
import gameJson from './data/game.json'
import { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const mock = (instance: AxiosInstance): void => {
	const mock = new MockAdapter(instance)

	mock
		.onGet('/games')
		.reply<Game[]>(200, [
			gameJson as Game,
			{ ...(gameJson as Game), status: GAME_STATUS.DRAFT },
			{ ...(gameJson as Game), status: GAME_STATUS.CONFIRMED },
			{ ...(gameJson as Game), status: GAME_STATUS.COMPLETED },
			{ ...(gameJson as Game), status: GAME_STATUS.CLOSED },
			{ ...(gameJson as Game), status: GAME_STATUS.DONE },
		])
	mock.onGet('/games?_pending=true').reply<Game[]>(200, [gameJson as Game])

	mock.onGet(/\/games\/\w+/).reply<Game>(200, gameJson as Game)

	mock
		.onGet('/users?role.type=dungeon_master')
		.reply<User[]>(200, dmsJson as User[])
	mock.onGet('/cities').reply<City[]>(200, citiesJson)
}
