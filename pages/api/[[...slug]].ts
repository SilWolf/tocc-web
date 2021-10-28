import { NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-iron-session'

import { SessionUser } from 'types/User.type'

import apis, {
	AxiosMethod,
	ExtendedAxiosRequestConfig,
} from 'helpers/api/api.service'
import withSession from 'hooks/withSession.hook'

type NextIronRequest = NextApiRequest & { session?: Session }

export default withSession(
	async (req: NextIronRequest, res: NextApiResponse) => {
		const { slug, ...query } = req.query
		const config: ExtendedAxiosRequestConfig = {
			url: (slug as string[]).join('/'),
			method: req.method as AxiosMethod,
			params: query,
			data: req.body,
		}

		const sessionUser = req.session?.get<SessionUser>('sessionUser')
		if (sessionUser) {
			config.headers = {
				Authorization: `Bearer ${sessionUser.jwt}`,
			}
		}

		await apis
			.rawRequest(config)
			.then((response) => {
				res.status(response.status).json(response.data)
			})
			.catch((error) => {
				res.status(error.response.status).json(error.response.data)
			})
	}
)
