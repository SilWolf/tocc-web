import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'

import { SessionUser } from 'types/User.type'

import apis from 'helpers/api/api.helper'
import withSession from 'hooks/withSession.hook'

type NextIronRequest = NextApiRequest & { session: Session }

export default withSession(
	async (req: NextIronRequest, res: NextApiResponse) => {
		const { identifier, password } = await req.body

		try {
			// we check that the user exists on GitHub and store some data in session
			const result = await apis.postLogin(identifier, password)
			const sessionUser: SessionUser = {
				isLogined: true,
				user: result.user,
				jwt: result.jwt,
			}

			req.session.set('sessionUser', sessionUser)
			await req.session.save()

			res.json(sessionUser)
		} catch (error: any) {
			res.status(error.response.status).json(error.response.data)
		}
	}
)
