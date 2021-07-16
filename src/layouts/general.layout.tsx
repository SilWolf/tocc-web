import NextLink from 'next/link'

import React, { useContext } from 'react'

import Switch from 'src/components/Form/Switch'

import { AppContext } from 'pages/_app'

const GeneralLayout: React.FC = ({ children }) => {
	const { isDarkMode, toggleDarkMode } = useContext(AppContext)

	return (
		<>
			<div className='bg-gray-200 dark:bg-gray-900'>
				<div className='bg-yellow-900 dark:bg-gray-800 dark py-3 shadow fixed top-0 left-0 right-0 z-10'>
					<div className='container'>
						<div className='flex items-center gap-x-4'>
							<div className='flex-none'>
								<NextLink href='/' passHref>
									<a>
										<img src='/images/tocc-logo-w.png' className='h-6' alt='' />
									</a>
								</NextLink>
							</div>
							<div className='flex-none'>
								<a href='#'>世界</a>
							</div>
							<div className='flex-1'></div>

							<div className='flex-none'>
								<Switch checked={isDarkMode} onChange={toggleDarkMode} />
							</div>
							<div className='flex-none'>
								<NextLink href='/admin/player' passHref>
									<a>管理員後台</a>
								</NextLink>
							</div>
							<div className='flex-none'>
								<NextLink href='/character/1/profile' passHref>
									<a>我的角色</a>
								</NextLink>
							</div>
							<div className='flex-none'>
								<NextLink href='/auth/login' passHref>
									<a>登入</a>
								</NextLink>
							</div>
						</div>
					</div>
				</div>

				<div className='min-h-screen flex flex-col'>
					<div className='flex-1'>{children}</div>

					<div className='dark flex-none bg-yellow-900 dark:bg-gray-800 py-4'>
						<div className='container space-y-1'>
							<div className='flex gap-x-2 justify-between items-center'>
								<div className='flex-none text-sm'>
									<div>Copyright</div>
									<div className='space-x-4'>
										<a href='#'>Link</a>
										<a href='#'>Link</a>
										<a href='#'>Link</a>
										<a href='#'>Link</a>
									</div>
								</div>
								<div className='flex-none space-x-6 text-2xl'>
									<a href='#'>
										<i className='bi-telegram'></i>
									</a>
									<a href='#'>
										<i className='bi-facebook'></i>
									</a>
									<a href='#'>
										<i className='bi-discord'></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default GeneralLayout
