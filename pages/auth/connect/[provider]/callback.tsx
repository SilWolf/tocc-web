import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useEffect } from 'react'

import apis from 'helpers/api/api.helper'

import { useUser } from 'src/hooks/auth.hook'
import {
	NextIronRequest,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser, User } from 'src/types/User.type'

type Props = {
	user: User
}

const AuthConnectGoogleCallbackPage: NextPage<Props> = ({ user }: Props) => {
	const router = useRouter()

	useUser(user)
	useEffect(() => {
		router.replace('/')
	})

	return (
		<>
			<p>Loading...</p>
		</>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(async ({ req, params, query }) => {
		const RESPONSE_IF_FAIL: GetServerSidePropsResult<any> = {
			redirect: {
				destination: '/auth/login?error=true&connect=google',
				permanent: false,
			},
		}

		const _req = req as NextIronRequest

		try {
			const provider = params?.provider as string | undefined
			console.log(provider)
			if (!provider) {
				return RESPONSE_IF_FAIL
			}

			const accessToken = query?.access_token as string | undefined
			console.log(accessToken)
			if (!accessToken) {
				return RESPONSE_IF_FAIL
			}

			const result = await apis.getAuthProviderCallback(provider, accessToken)
			const sessionUser: SessionUser = {
				isLogined: true,
				user: result.user,
				jwt: result.jwt,
			}

			_req.session.set('sessionUser', sessionUser)
			await _req.session.save()

			return {
				props: {
					user: sessionUser.user,
				},
			}
		} catch (_) {
			return RESPONSE_IF_FAIL
		}
	})

export default AuthConnectGoogleCallbackPage
