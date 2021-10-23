import { GetServerSideProps, NextPage } from 'next'

import { ProtectAdminPage } from 'src/hooks/withSession.hook'

const AdminIndexPage: NextPage = () => {
	return (
		<>
			<div className='space-y-4'>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
				<div className='bg-yellow-100 h-96'></div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = ProtectAdminPage()

export default AdminIndexPage
