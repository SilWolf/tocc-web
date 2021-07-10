import React from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import cns from 'classnames'

const routes = [
	{
		label: '玩家',
		path: 'player',
	},
	{
		label: '玩家角色',
		path: 'character',
	},
	{
		label: '劇本',
		path: 'game',
	},
	{
		label: '城市',
		path: 'city',
	},
	{
		label: 'NPC',
		path: 'npc',
	},
	{
		label: '組織',
		path: 'organization',
	},
	{
		label: '知識',
		path: 'knowledge',
	},
	{
		label: '物品',
		path: 'item',
	},
]

const AdminLayout: React.FC = ({ children }) => {
	const { pathname } = useRouter()

	return (
		<>
			<div className='h-screen flex items-stretch bg-gray-200'>
				<div className='flex-none contianer w-64 px-4 bg-gray-800'>
					<div className='py-4'>TOCC Admin Panel</div>

					<div className='py-2 space-y-2'>
						{routes.map((route) => (
							<NextLink key={route.path} href={`/admin/${route.path}`} passHref>
								<a
									data-ripplet
									className={cns(
										'block w-full py-3 px-4 text-left text-white rounded',
										pathname.startsWith(`/admin/${route.path}`)
											? 'bg-blue-300'
											: ''
									)}
								>
									{route.label}
								</a>
							</NextLink>
						))}
					</div>
				</div>

				<div className='flex-1 flex flex-col min-h-0'>
					<div className='flex-none bg-gray-800 shadow z-10'>
						<div className='px-8 py-5'>
							<div className='flex'>
								<div className='pr-2 flex-none'>
									<NextLink href='/' passHref>
										<a>TOCC Admin Panel</a>
									</NextLink>
								</div>
								<div className='flex-auto'></div>
								<div className='px-2 flex-none'>
									<NextLink href='/character/1/profile' passHref>
										<a>我的角色</a>
									</NextLink>
								</div>
								<div className='pl-2 flex-none'>
									<NextLink href='/auth/login' passHref>
										<a>登入</a>
									</NextLink>
								</div>
							</div>
						</div>
					</div>

					<div className='flex-1 flex flex-col overflow-y-auto'>
						<div className='flex-1'>
							<div className='h-full p-8'>{children}</div>
						</div>

						<div className='flex-none  bg-gray-800 dark text-white py-2 px-8'>
							<div className='space-y-1'>
								<div className='flex gap-x-2 justify-between items-center'>
									<div className='flex-none'>
										<div>Copyright</div>
										<div className='divide-x-2'>
											<a href='#' className='pr-2'>
												Link
											</a>
											<a href='#' className='px-2'>
												Link
											</a>
											<a href='#' className='px-2'>
												Link
											</a>
											<a href='#' className='px-2'>
												Link
											</a>
										</div>
									</div>
									<div className='flex-none space-x-6 text-3xl'>
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
			</div>
		</>
	)
}

export default AdminLayout
