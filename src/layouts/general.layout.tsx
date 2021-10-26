import NextLink from 'next/link'

import React from 'react'

import { useUser } from 'src/hooks/auth.hook'
import Footer from 'src/widgets/Footer'

const GeneralLayout: React.FC = ({ children }) => {
	const user = useUser()

	return (
		<>
			<div>
				<div className='bg-yellow-900 dark:bg-gray-800 dark py-3 shadow fixed top-0 left-0 right-0 z-10'>
					<div className='container'>
						<div className='flex items-center gap-x-6'>
							<div className='flex-none'>
								<NextLink href='/' passHref>
									<a>
										<img src='/images/tocc-logo-w.png' className='h-6' alt='' />
									</a>
								</NextLink>
							</div>
							{/* <div className='flex-none'>
								<a href='#'>WIKI</a>
							</div>
							<div className='flex-none'>
								<NextLink href='/character/1/profile' passHref>
									<a>我的角色</a>
								</NextLink>
							</div>
							<div className='flex-none'>
								<NextLink href='/character/1/profile' passHref>
									<a>商店</a>
								</NextLink>
							</div> */}
							<div className='flex-1'></div>
							{/* 
							<div className='flex-none'>
								<Switch checked={isDarkMode} onChange={toggleDarkMode} />
							</div> */}
							{/* <div className='flex-none'>
								<NextLink href='/admin/player' passHref>
									<a>管理員後台</a>
								</NextLink>
							</div> */}
							{!user && (
								<div className='flex-none'>
									<NextLink href='/auth/login' passHref>
										<a>登入</a>
									</NextLink>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='min-h-screen flex flex-col'>
					<div className='flex-1'>{children}</div>

					<div className='dark flex-none bg-yellow-900 dark:bg-gray-800 py-4'>
						<div className='container'>
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default GeneralLayout
