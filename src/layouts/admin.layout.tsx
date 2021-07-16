import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React from 'react'

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
			<div className='h-screen flex items-stretch bg-gray-200 min-w-0'>
				<div className='admin-sidebar flex-none contianer w-64 px-4 bg-gray-800'>
					<div className='relative'>
						<div className='py-4'>
							<img src='/images/tocc-logo-w.png' />
						</div>

						<div className='py-2 space-y-2'>
							{routes.map((route) => (
								<NextLink
									key={route.path}
									href={`/admin/${route.path}`}
									passHref
								>
									<a
										data-ripplet
										className={cns(
											'block w-full py-3 px-4 text-left rounded',
											pathname.startsWith(`/admin/${route.path}`)
												? 'bg-white bg-opacity-90 text-black hover:text-black'
												: 'inverted'
										)}
									>
										{route.label}
									</a>
								</NextLink>
							))}
						</div>
					</div>
				</div>

				<div className='flex-1 flex flex-col min-h-0 min-w-0'>
					<div className='flex-none bg-gray-800 text-white shadow z-10'>
						<div className='px-8 py-3'>
							<div className='flex justify-end items-center gap-x-8'>
								<NextLink href='/' passHref>
									<a className='inverted'>網站首頁</a>
								</NextLink>

								<div className='space-x-2'>
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

									<div className='inline-block space-x-2'>
										<img
											src='https://truth.bahamut.com.tw/s01/s202107/67a49d3735452b130336e55976859bbf.JPG'
											alt=''
											className='inline-block rounded-full h-9 w-9 border-2 border-white'
										/>
										<span className='uppercase'>Dicky</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='flex-1 flex flex-col overflow-y-auto min-w-0'>
						<div className='flex-1'>
							<div className='h-full p-8'>{children}</div>
						</div>

						<div className='flex-none bg-gray-800 text-white py-2 px-8'>
							<div className='space-y-1'>
								<div className='flex gap-x-2 justify-between items-center'>
									<div className='flex-none'>
										<div>Copyright</div>
										<div className='space-x-4'>
											<a href='#' className='inverted'>
												Link
											</a>
											<a href='#' className='inverted'>
												Link
											</a>
											<a href='#' className='inverted'>
												Link
											</a>
											<a href='#' className='inverted'>
												Link
											</a>
										</div>
									</div>
									<div className='flex-none space-x-6 text-2xl'>
										<a href='#' className='inverted'>
											<i className='bi-telegram'></i>
										</a>
										<a href='#' className='inverted'>
											<i className='bi-facebook'></i>
										</a>
										<a href='#' className='inverted'>
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
