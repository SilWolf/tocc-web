import { NextPage } from 'next'
import NextLink from 'next/link'

const Error403Page: NextPage = () => {
	return (
		<div className='container py-24 text-center space-y-8'>
			<h4>DM的地下城施工重地，非請勿進</h4>
			<div>
				<NextLink href='/' passHref>
					<a className='button button-primary'>返回首頁</a>
				</NextLink>
			</div>
		</div>
	)
}

export default Error403Page
