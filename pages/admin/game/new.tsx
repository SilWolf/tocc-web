import { GetServerSideProps } from 'next'

import { getApis } from 'helpers/api/api.helper'

import {
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game, GAME_STATUS } from 'src/types/Game.type'
import { SessionUser } from 'src/types/User.type'

import AdminGameDetailPage from './[id]'

export const getServerSideProps: GetServerSideProps = ProtectAdminPage(
	serverSidePropsWithSession(async (ctx) => {
		const sessionUser = ctx.req.session.get<SessionUser>('sessionUser')
		const apis = getApis({ jwt: sessionUser?.jwt })

		const [cities, dms] = await Promise.all([apis.getCities(), apis.getDMs()])

		const startAt = new Date()
		startAt.setMinutes(0, 0, 0)
		startAt.setUTCHours(startAt.getUTCHours() + 1)

		const endAt = new Date(startAt.getTime())
		endAt.setUTCHours(endAt.getUTCHours() + 4)

		const worldStartAt = new Date(startAt.getTime())
		worldStartAt.setUTCFullYear(worldStartAt.getUTCFullYear() - 758)

		let game: Game = {
			id: '',
			_id: '',
			city: cities[0],
			dm: sessionUser?.user,
			title: '',
			code: '',
			startAt: startAt.toISOString(),
			endAt: endAt.toISOString(),
			timeLengthInMin: 240,
			worldStartAt: worldStartAt.toISOString(),
			worldEndAt: worldStartAt.toISOString(),
			capacityMin: 3,
			capacityMax: 6,
			lvMin: 2,
			lvMax: 4,
			outline: [],
			status: GAME_STATUS.NEW,
		}

		if (ctx.query.clone) {
			const _cloneGameId = ctx.query.clone as string
			const _clonedGame = await apis.getGameById(_cloneGameId)
			if (_clonedGame) {
				game = {
					...game,
					title: _clonedGame.title,
					description: _clonedGame.description || '',
					remark: _clonedGame.remark || '',
					capacityMin: _clonedGame.capacityMin,
					capacityMax: _clonedGame.capacityMax,
					lvMin: _clonedGame.lvMin,
					lvMax: _clonedGame.lvMax,
					city: _clonedGame.city,
					outline: _clonedGame.outline || [],
				}
			}
		}

		return {
			props: {
				isNew: true,
				cities,
				dms,
				game,
			},
		}
	})
)

export default AdminGameDetailPage
