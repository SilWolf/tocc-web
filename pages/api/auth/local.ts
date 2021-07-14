import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'
import withSession from '../../../hooks/withSession.hook'

import { postLogin } from '../../../apis/api.helper'
import { SessionUser } from '../../../types/User.type'

type NextIronRequest = NextApiRequest & { session: Session }

export default withSession(
	async (req: NextIronRequest, res: NextApiResponse) => {
		const { identifier, password } = await req.body

		try {
			// we check that the user exists on GitHub and store some data in session
			const result = await postLogin(identifier, password)
			const sessionUser: SessionUser = {
				isLogined: true,
				user: result.user,
				jwt: result.jwt,
			}

			req.session.set('sessionUser', sessionUser)
			await req.session.save()

			res.json(sessionUser)
		} catch (error) {
			const { response: fetchResponse } = error
			res.status(fetchResponse?.status || 500).json(error.message)
		}
	}
)
