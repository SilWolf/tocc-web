import { GetServerSideProps, NextPage } from 'next'

import React from 'react'

import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser } from 'src/types/User.type'

type Props = {}

const ShopPage: NextPage<Props> = () => {
	return <div className='container'></div>
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const _apis = getApis({ jwt: sessionUser?.jwt })

			return {
				props: {}, // will be passed to the page component as props
			}
		}
	)

export default ShopPage
