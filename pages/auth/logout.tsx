import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import { useContext, useEffect } from 'react'

import {
	GetServerSidePropsContextWithIronSession,
	ProtectAuthPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'

import { AppContext } from 'pages/_app'

const AuthLogoutPage: NextPage = () => {
	const router = useRouter()
	const { setStoredUser } = useContext(AppContext)

	useEffect(() => {
		setStoredUser(undefined)
		router.replace('/')
	}, [setStoredUser, router])
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
