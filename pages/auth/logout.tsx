import { GetServerSideProps, NextPage } from 'next'

import { useEffect } from 'react'

import { useUser } from 'src/hooks/auth.hook'
import {
	GetServerSidePropsContextWithIronSession,
	ProtectAuthPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'

const AuthLogoutPage: NextPage = () => {
	const { clearUser } = useUser()

	useEffect(() => {
		clearUser()
		if (typeof window !== 'undefined') {
			window.location.href = '/'
		}
	}, [clearUser])
	return <></>
}

export const getServerSideProps: GetServerSideProps = ProtectAuthPage(
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			context.req.session.unset('sessionUser')
			await context.req.session.save()

			return {
				props: {},
			}
		}
	)
)

export default AuthLogoutPage
