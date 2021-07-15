import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'

import { SessionUser } from 'types/User.type'

import withSession from 'hooks/withSession.hook'

type NextIronRequest = NextApiRequest & { session: Session }

export default withSession(
	async (req: NextIronRequest, res: NextApiResponse) => {
		const user = req.session.get<SessionUser>('sessionUser')
		console.log('getMe', user)

		if (user) {
			// in a real world application you might read the user id from the session and then do a database request
			// to get more information on the user if needed
			res.json({
				...user,
				isLogined: true,
			})
		} else {
			res.json({
				isLogined: false,
			})
		}
	}
)
