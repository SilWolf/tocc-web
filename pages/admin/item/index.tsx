import { GetServerSideProps, NextPage } from 'next'

import { ProtectAdminPage } from 'src/hooks/withSession.hook'

const AdminIndexPage: NextPage = () => {
	return (
		<>
			<div className='space-y-4'>
				<div>建造城堡中……</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = ProtectAdminPage()

export default AdminIndexPage
