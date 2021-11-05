import { GetServerSideProps } from 'next'

import { getApis } from 'helpers/api/api.helper'

import {
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser } from 'src/types/User.type'

import AdminGameDetailPage from './[id]'

export const getServerSideProps: GetServerSideProps = ProtectAdminPage(
	serverSidePropsWithSession(async ({ req: { session } }) => {
		const sessionUser = session.get<SessionUser>('sessionUser')
		const apis = getApis({ jwt: sessionUser?.jwt })

		const [cities, dms] = await Promise.all([apis.getCities(), apis.getDMs()])

		return {
			props: {
				isNew: true,
				cities,
				dms,
			},
		}
	})
)

export default AdminGameDetailPage
