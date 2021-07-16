import NextLink from 'next/link'

import React from 'react'

const GeneralLayout: React.FC = ({ children }) => {
	return (
		<>
			<div className='bg-yellow-900 py-1 fixed top-0 left-0 right-0'>
				<div className='container'>
					<div className='flex gap-x-2'>
						<div className='flex-none'>
							<NextLink href='/' passHref>
								<a>TOCC Web</a>
							</NextLink>
						</div>
						<div className='flex-none'>
							<a href='#'>世界</a>
						</div>
						<div className='flex-1'></div>

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

				<div className='flex-none bg-yellow-900 text-white py-4'>
					<div className='container space-y-1'>
						<div className='flex gap-x-2 justify-between items-center'>
							<div className='flex-none'>
								<div>Copyright</div>
								<div className='space-x-2'>
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
		</>
	)
}

export default GeneralLayout
