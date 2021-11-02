import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React from 'react'

import Dropdown from 'src/components/Dropdown'
import { useUser } from 'src/hooks/auth.hook'
import Footer from 'src/widgets/Footer'

import cns from 'classnames'

const routes = [
	{
		label: '概覽',
		path: '/',
		icon: <i className='bi bi-speedometer2'></i>,
	},
	{
		label: '玩家',
		path: '/player',
		icon: <i className='bi bi-person-fill'></i>,
	},
	{
		label: '玩家角色',
		path: '/character',
		icon: <i className='ra ra-fedora'></i>,
	},
	{
		label: '劇本',
		path: '/game',
		icon: <i className='ra ra-perspective-dice-four'></i>,
	},
	{
		label: '城市',
		path: '/city',
		icon: <i className='ra ra-bridge'></i>,
	},
	{
		label: 'NPC',
		path: '/npc',
		icon: <i className='ra ra-double-team'></i>,
	},
	{
		label: '組織',
		path: '/organization',
		icon: <i className='ra ra-castle-flag'></i>,
	},
	{
		label: '知識',
		path: '/knowledge',
		icon: <i className='ra ra-book'></i>,
	},
	{
		label: '物品',
		path: '/item',
		icon: <i className='ra ra-key-basic'></i>,
	},
]

const AdminLayout: React.FC = ({ children }) => {
	const user = useUser()
	const { pathname } = useRouter()

	return (
		<>
			<div className='bg-white h-screen flex items-stretch min-w-0'>
				<div className='admin-sidebar flex-none contianer w-64 bg-gray-800'>
					<div className='h-full flex flex-col items-stretch'>
						<div className='flex-none'>
							<div className='p-4'>
								<img src='/images/tocc-logo-w.png' alt='logo' />
							</div>
						</div>
						<div className='flex-1'>
							<div>
								{routes.map((route) => (
									<NextLink
										key={route.path}
										href={`/admin${route.path}`}
										passHref
									>
										<a
											data-ripplet
											className={cns(
												'block w-full py-3 px-4 text-left bg-opacity-70 text-black hover:text-black',
												pathname === `/admin${route.path}`
													? 'bg-primary'
													: 'bg-white'
											)}
										>
											<div className='space-x-4'>
												<span className='text-lg'>{route.icon}</span>
												<span>{route.label}</span>
											</div>
										</a>
									</NextLink>
								))}
							</div>
						</div>
						<div className='flex-none'>
							<NextLink href={`/`} passHref>
								<a
									data-ripplet
									className='block w-full py-3 px-4 text-left text-white hover:text-white'
								>
									<div className='space-x-4'>
										<span className='text-lg'>
											<i className='bi bi-box-arrow-left'></i>
										</span>
										<span>返回網站</span>
									</div>
								</a>
							</NextLink>
						</div>
					</div>
				</div>

				<div className='flex-1 flex flex-col min-h-0 min-w-0'>
					<div className='flex-none bg-gray-800 shadow z-10 text-white'>
						<div className='px-8 py-3'>
							<div className='flex justify-end items-center gap-x-8'>
								<div className='flex gap-x-2'>
									<button data-ripplet className='h-9 w-9'>
										<div>
											<i className='bi bi-envelope'></i>
										</div>
									</button>
									<button data-ripplet className='h-9 w-9'>
										<div>
											<i className='bi bi-bell'></i>
										</div>
									</button>
									{user ? (
										<div className='ml-2'>
											<Dropdown
												header={
													<div className='flex gap-x-2'>
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
													<NextLink href='/auth/logout' passHref>
														<a href='' className='block py-1 text-red-900'>
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
					</div>

					<div className='flex-1 flex flex-col overflow-y-auto min-w-0'>
						<div className='flex-1'>
							<div className='h-full p-8'>{children}</div>
						</div>

						<div className='flex-none bg-gray-800 text-white py-2 px-8'>
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminLayout
