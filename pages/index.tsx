import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'
import BgImage from 'src/components/BgImage'
import Button from 'src/components/Button'
import { DateSpan } from 'src/components/Datetime'

import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { Promotion } from 'src/types/Promotion.type'
import { SessionUser } from 'src/types/User.type'
import { Swiper, SwiperSlide } from 'swiper/react'

type PageProps = {
	pendingGames: Game[]
	promotions: Promotion[]
}

const HomePage: NextPage<PageProps> = ({
	pendingGames,
	promotions,
}: PageProps) => {
	return (
		<>
			<div
				className='h-64 bg-center bg-cover'
				style={{ backgroundImage: 'url("/images/homepage-bg.jpg")' }}
			></div>

			<div className='container py-12 flex-1'>
				<div className='grid grid-cols-3 gap-x-6 gap-y-8'>
					<div
						className={pendingGames?.length > 1 ? 'col-span-3' : 'col-span-1'}
					>
						<h3 className='mb-2'>招募中</h3>
						<div
							className={classNames(
								'grid gap-x-6 gap-y-4',
								pendingGames?.length > 1 ? 'col-span-3' : 'col-span-1'
							)}
						>
							{pendingGames.map((game) => (
								<div key={game.id}>
									<div className='card'>
										<h4>{game.title}</h4>
										<p className='text-sm text-gray-600 mb-2'>
											DM: {game.dm?.name || ''}
										</p>
										<p className='text-sm text-gray-600 paragraph-ellipsis-3'>
											{game.description}
										</p>
										<div className='h-px bg-gray-200 my-4'></div>
										<div className='flex items-end gap-x-2'>
											<div className='flex-1'>
												<div>
													<i className='ra ra-fw ra-bridge'></i>
													<span>
														{' '}
														{game.city?.name || ''}({game.city?.shopName || ''})
													</span>
												</div>
												<div>
													<i className='bi bi-clock'></i>
													<span>
														{' '}
														<DateSpan format='yyyy/MM/dd HH:mm'>
															{game.startAt}
														</DateSpan>
													</span>
												</div>
												<div>
													<i className='bi bi-people-fill'></i>
													<span> 3/6</span>
													<i className='ra ra-fw ra-level-three ml-4'></i>
													<span>
														{' '}
														Lv.{game.lvMin}-{game.lvMax}
													</span>
												</div>
											</div>
											<div className='flex-none'>
												<NextLink href='/' passHref>
													<a
														data-ripplet
														className='bg-primary text-white hover:text-white px-2 py-1 rounded'
													>
														報名
													</a>
												</NextLink>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					<div
						className={pendingGames?.length > 1 ? 'col-span-3' : 'col-span-2'}
					>
						<h3 className='mb-2'>最新活動</h3>
						<Swiper slidesPerView={1} spaceBetween={0}>
							{promotions.map((promotion) => (
								<SwiperSlide key={promotion.id}>
									<BgImage src={promotion.image.url} className='h-96' />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className='col-span-2 card'>
						<h3>海城週聞</h3>
					</div>
					<div className='card row-span-2'>
						<h3>角色動態</h3>
					</div>
					<div className='col-span-2 card'>
						<h3>你知道嗎?</h3>
					</div>
					<div className='col-span-3 card'>
						<h3>外部連結</h3>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const _apis = getApis({ jwt: sessionUser?.jwt })

			const [pendingGames, promotions] = await Promise.all([
				_apis.getPendingGames(),
				_apis.getPromotions(),
			])

			return {
				props: {
					pendingGames,
					promotions,
				}, // will be passed to the page component as props
			}
		}
	)

export default HomePage
