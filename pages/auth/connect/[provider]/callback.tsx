import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useContext, useEffect } from 'react'

import apis from 'helpers/api/api.helper'

import {
	NextIronRequest,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser, User, USER_ROLE } from 'src/types/User.type'

import { AppContext } from 'pages/_app'

type Props = {
	user: User
}

const AuthConnectGoogleCallbackPage: NextPage<Props> = ({ user }: Props) => {
	const router = useRouter()
	const { setStoredUser } = useContext(AppContext)

	useEffect(() => {
		setStoredUser(user)
		if (user.role?.name === USER_ROLE.NORMAL) {
			router.replace('/auth/register')
		} else {
			router.replace('/')
		}
	}, [router, setStoredUser, user])

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
			if (!provider) {
				return RESPONSE_IF_FAIL
			}

			const accessToken = query?.access_token as string | undefined
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
