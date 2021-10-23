import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React, { useContext } from 'react'

import Switch from 'src/components/Form/Switch'
import styles from './layout.module.css'

import cns from 'classnames'
import { AppContext } from 'pages/_app'
import Footer from 'src/widgets/Footer'

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
	const { isDarkMode, toggleDarkMode } = useContext(AppContext)

	return (
		<>
			<div className='h-screen flex items-stretch bg-gray-200 dark:bg-gray-900 min-w-0'>
				<div className='admin-sidebar dark flex-none contianer w-64 px-4 bg-gray-800'>
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
												? 'bg-white bg-opacity-90 text-black dark:text-black hover:text-black'
												: ''
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
					<div className='dark flex-none bg-gray-800 shadow z-10'>
						<div className='px-8 py-3'>
							<div className='flex justify-end items-center gap-x-8'>
								<NextLink href='/' passHref>
									<a>網站首頁</a>
								</NextLink>

								<div className='space-x-2'>
									<div className='inline-block'>
										<Switch checked={isDarkMode} onChange={toggleDarkMode} />
									</div>
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

									<div
										className={(styles.toolbarUser, 'inline-block space-x-2')}
									>
										<img
											src='https://truth.bahamut.com.tw/s01/s202107/67a49d3735452b130336e55976859bbf.JPG'
											alt=''
											className='inline-block rounded-full h-9 w-9 border-2 border-white'
										/>
										<span className='uppercase'>Dicky</span>
										<div className='toolbar-user-menu'>abc</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='flex-1 flex flex-col overflow-y-auto min-w-0'>
						<div className='flex-1'>
							<div className='h-full p-8'>{children}</div>
						</div>

						<div className='flex-none dark bg-gray-800 dark:bg-gray-800 text-white py-2 px-8'>
							<div className='container'>
								<Footer />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminLayout
