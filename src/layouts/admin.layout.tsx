import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React, { useCallback, useContext, useState } from 'react'

import Dropdown from 'src/components/Dropdown'
import Footer from 'src/widgets/Footer'
import StrapiImg from 'src/widgets/StrapiImg'
import styles from './admin.layout.module.css'

import cns from 'classnames'
import { AppContext } from 'pages/_app'

const routes = [
	{
		label: '概覽',
		path: 'dashboard',
		icon: <i className='bi bi-speedometer2'></i>,
	},
	{
		label: '劇本',
		path: 'game',
		icon: <i className='ra ra-perspective-dice-four'></i>,
	},
	{
		label: '玩家',
		path: 'player',
		icon: <i className='bi bi-person-fill'></i>,
	},
	{
		label: '角色',
		path: 'character',
		icon: <i className='ra ra-fedora'></i>,
	},
]

const AdminLayout: React.FC = ({ children }) => {
	const { pathname } = useRouter()
	const { user } = useContext(AppContext)

	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)

	const handleClickCollapse = useCallback(() => {
		setIsSidebarCollapsed((prev) => !prev)
	}, [])

	return (
		<>
			<div className={styles.adminLayout}>
				<div className={cns('sidebar', isSidebarCollapsed ? 'collapsed' : '')}>
					<div className='sidebar-logo-wrapper'>
						<img src='/images/tocc-logo-w.png' alt='logo' />
					</div>
					<div className='sidebar-body'>
						{routes.map((route) => (
							<NextLink key={route.path} href={`/admin/${route.path}`} passHref>
								<a
									data-ripplet
									className={cns(
										'route-link',
										pathname.startsWith(`/admin/${route.path}`) ? 'active' : ''
									)}
								>
									<span className='route-link-icon'>{route.icon}</span>
									<span className='route-link-text'>{route.label}</span>
								</a>
							</NextLink>
						))}
					</div>
					<div className='sidebar-footer'>
						<a data-ripplet className='route-link' href='#'>
							<span className='route-link-icon'>
								<i className='bi bi-table'></i>
							</span>
							<span className='route-link-text'>
								CMS後台 <i className='bi bi-box-arrow-up-right'></i>
							</span>
						</a>
						<NextLink href={`/`} passHref>
							<a data-ripplet className='route-link'>
								<span className='route-link-icon'>
									<i className='bi bi-box-arrow-left'></i>
								</span>
								<span className='route-link-text'>返回網站</span>
							</a>
						</NextLink>
					</div>
				</div>

				<div className='main-content'>
					<div className='main-content-topbar'>
						<div className='main-content-topbar-left'>
							<button
								data-ripplet
								className='main-content-topbar-button'
								onClick={handleClickCollapse}
							>
								<i
									className={cns(
										'bi',
										isSidebarCollapsed
											? 'bi-arrow-bar-right'
											: 'bi-arrow-bar-left'
									)}
								></i>
							</button>
						</div>
						<div className='main-content-topbar-right'>
							<div className='flex gap-x-2'>
								<button data-ripplet className='main-content-topbar-button'>
									<i className='bi bi-envelope'></i>
								</button>
								<button data-ripplet className='main-content-topbar-button'>
									<i className='bi bi-bell'></i>
								</button>
								{user ? (
									<div className='ml-2'>
										<Dropdown
											header={
												<div className='flex items-center gap-x-2'>
													<div className='whitespace-nowrap'>
														<h5 className='leading-4 text-right'>
															{user.name}
														</h5>
														<p className='text-white text-xs font-thin leading-4 text-right'>
															{user.role?.name}
														</p>
													</div>
													<StrapiImg
														className='h-8 w-8 bg-gray-800'
														image={user.portraitImage}
														size='thumbnail'
														alt=''
													/>
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
