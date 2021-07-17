import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'

import { SessionUser } from 'types/User.type'

import { getAuthProviderCallback } from 'helpers/api/api.helper'
import withSession from 'hooks/withSession.hook'

type NextIronRequest = NextApiRequest & { session: Session }

export default withSession(
	async (req: NextIronRequest, res: NextApiResponse) => {
		const provider = req.query?.provider as string
		const accessToken = req.body?.accessToken as string

		try {
			const result = await getAuthProviderCallback(provider, accessToken)
			const sessionUser: SessionUser = {
				isLogined: true,
				user: result.user,
				jwt: result.jwt,
			}

			req.session.set('sessionUser', sessionUser)
			await req.session.save()

			res.json(sessionUser)
		} catch (error) {
			console.log(error)
			const { response: fetchResponse } = error
			res.status(fetchResponse?.status || 500).json(error.message)
		}
	}
)
