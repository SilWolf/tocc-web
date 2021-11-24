import { GetServerSideProps, NextPage } from 'next'

import React from 'react'

import {
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'

const AdminDashboardPage: NextPage = () => {
	return <></>
}

export const getServerSideProps: GetServerSideProps = ProtectAdminPage(
	serverSidePropsWithSession(async () => {
		return {
			redirect: {
				destination: '/admin/dashboard',
				permanent: true,
			},
		}
	})
)

export default AdminDashboardPage
