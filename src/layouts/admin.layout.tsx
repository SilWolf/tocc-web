import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import Dropdown from 'src/components/Dropdown'
import apis from 'src/helpers/api/api.helper'
import { useUser } from 'src/hooks/auth.hook'
import { User } from 'src/types'
import Footer from 'src/widgets/Footer'
import StrapiImg from 'src/widgets/StrapiImg'
import styles from './admin.layout.module.css'

import cns from 'classnames'

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
		label: '玩家角色',
		path: 'character',
		icon: <i className='ra ra-fedora'></i>,
	},
	{
		label: '城市',
		path: 'city',
		icon: <i className='ra ra-bridge'></i>,
	},
	{
		label: 'NPC',
		path: 'npc',
		icon: <i className='ra ra-double-team'></i>,
	},
	{
		label: '組織',
		path: 'organization',
		icon: <i className='ra ra-castle-flag'></i>,
	},
	{
		label: '知識',
		path: 'knowledge',
		icon: <i className='ra ra-book'></i>,
	},
	{
		label: '物品',
		path: 'item',
		icon: <i className='ra ra-key-basic'></i>,
	},
]

const AdminLayout: React.FC = ({ children }) => {
	const { pathname } = useRouter()
	const { user: storedUser } = useUser()

	const { data: user, refetch } = useQuery<User | null>(
		['user', 'me'],
		apis.getMe,
		{
			staleTime: 5 * 60 * 1000, // 5mins
			enabled: !!storedUser,
			initialData: storedUser,
		}
	)

	useEffect(() => {
		if (storedUser && refetch) {
			refetch()
		}
	}, [refetch, storedUser])

	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true)

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
										pathname === `/admin/${route.path}` ? 'active' : ''
									)}
								>
									<span className='route-link-icon'>{route.icon}</span>
									<span className='route-link-text'>{route.label}</span>
								</a>
							</NextLink>
						))}
					</div>
					<div className='sidebar-footer'>
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
