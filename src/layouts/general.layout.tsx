import NextLink from 'next/link'

import React from 'react'

import Dropdown from 'src/components/Dropdown'
import { useUser } from 'src/hooks/auth.hook'
import { USER_ROLE } from 'src/types/User.type'
import Footer from 'src/widgets/Footer'

const GeneralLayout: React.FC = ({ children }) => {
	const user = useUser()

	return (
		<>
			<div>
				<div className='bg-yellow-900 py-3 shadow fixed top-0 left-0 right-0 z-10'>
					<div className='container'>
						<div className='flex items-center gap-x-6 text-white'>
							<div className='flex-none'>
								<NextLink href='/' passHref>
									<a>
										<img src='/images/tocc-logo-w.png' className='h-6' alt='' />
									</a>
								</NextLink>
							</div>
							<div className='flex-1 space-x-6'>
								<NextLink href='/game' passHref>
									<a>劇本</a>
								</NextLink>

								<NextLink href='/map' passHref>
									<a>世界地圖</a>
								</NextLink>

								{user && user.role?.name === USER_ROLE.DM && (
									<NextLink href='/admin' passHref>
										<a>管理員後台</a>
									</NextLink>
								)}
							</div>
							{user ? (
								<div className='flex-none'>
									<Dropdown
										header={
											<div className='flex items-center gap-x-2'>
												<img
													className='h-8 w-8 bg-gray-800'
													src={user.portraitImage?.formats?.thumbnail?.url}
													alt=''
												/>
												<div>
													<h6>{user.name}</h6>
													<p className='text-white text-xs leading-3'>
														{user.role?.name}
													</p>
												</div>
											</div>
										}
									>
										<div
											className='parchment'
											style={{ borderWidth: 8, minWidth: 140 }}
										>
											<NextLink href='/auth/account' passHref>
												<a href='' className='block py-1 pl-2'>
													<i className='bi bi-person-circle mr-2'></i>
													<span>帳號</span>
												</a>
											</NextLink>
											<NextLink href='/auth/logout' passHref>
												<a href='' className='block py-1 pl-2 text-red-900'>
													<i className='bi bi-box-arrow-right mr-2'></i>
													<span>登出</span>
												</a>
											</NextLink>
										</div>
									</Dropdown>
								</div>
							) : (
								<div className='flex-none'>
									<NextLink href='/auth/login' passHref>
										<a>登入</a>
									</NextLink>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='min-h-screen flex flex-col pt-24'>
					<div className='flex-1'>{children}</div>

					<div className='flex-none bg-yellow-900 text-white py-4'>
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
