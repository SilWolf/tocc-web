import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'

import * as api from 'helpers/api/api.helper'

import {
	NextIronRequest,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser } from 'src/types/User.type'

const AuthConnectGoogleCallbackPage: NextPage = () => {
	return (
		<>
			<p>Loading...</p>
		</>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(async ({ req, params, query }) => {
		const RESPONSE_IF_FAIL: GetServerSidePropsResult<unknown> = {
			redirect: {
				destination: '/auth/login?error=true&connect=google',
				permanent: false,
			},
		}

		const _req = req as NextIronRequest

		try {
			const provider = params?.provider as string | undefined

			if (!provider) {
				return RESPONSE_IF_FAIL
			}

			const accessToken = query?.access_token as string | undefined

			if (!accessToken) {
				return RESPONSE_IF_FAIL
			}

			const result = await api.getAuthProviderCallback(provider, accessToken)
			const sessionUser: SessionUser = {
				isLogined: true,
				user: result.user,
				jwt: result.jwt,
			}

			_req.session.set('sessionUser', sessionUser)
			await _req.session.save()

			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			}
		} catch (_) {
			return RESPONSE_IF_FAIL
		}
	})

export default AuthConnectGoogleCallbackPage
