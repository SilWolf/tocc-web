import { GetServerSideProps, GetServerSidePropsResult, NextPage } from 'next'

import * as api from 'helpers/api/api.helper'

const AuthConnectGoogleCallbackPage: NextPage = () => {
	return (
		<>
			<p>Loading...</p>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	params,
	query,
}) => {
	const RESPONSE_IF_FAIL: GetServerSidePropsResult<unknown> = {
		redirect: {
			destination: '/auth/login?error=true&connect=google',
			permanent: false,
		},
	}

	try {
		const provider = params?.provider as string | undefined

		if (!provider) {
			return RESPONSE_IF_FAIL
		}

		const accessToken = query?.access_token as string | undefined

		if (!accessToken) {
			return RESPONSE_IF_FAIL
		}

		await api.getAuthProviderCallback(provider, accessToken)

		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	} catch (_) {
		return RESPONSE_IF_FAIL
	}
}

export default AuthConnectGoogleCallbackPage
