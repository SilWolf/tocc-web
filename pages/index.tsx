import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React from 'react'

import BgImage from 'src/components/BgImage'
import { DateSpan } from 'src/components/Datetime'
import MedievalButton from 'src/components/MedievalButton'
import ReactHTML from 'src/components/ReactHTML'
import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { Promotion } from 'src/types/Promotion.type'
import { SessionUser } from 'src/types/User.type'
import FacebookPageEmbed from 'src/widgets/FacebookPageEmbed'

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
				className='absolute top-10 left-0 right-0 h-80 bg-cover bg-center'
				style={{ backgroundImage: 'url("/images/homepage-bg.jpg")' }}
			></div>

			<div className='container mt-56 flex-1 space-y-8'>
				{pendingGames.map((game) => (
					<div key={game.id}>
						<div className='parchment framed'>
							<div className='flex gap-x-4 items-start'>
								<div className='flex-none w-32 text-center'>
									<p className='text-3xl font-thin'>
										<DateSpan format='MM月dd日'>{game.startAt}</DateSpan>
									</p>
								</div>
								<div className='flex-1'>
									<h2>{game.title}</h2>
									<ReactHTML>{game.description}</ReactHTML>

									<div className='grid grid-cols-2 gap-x-8 text-2xl mt-8 mb-8'>
										<div>
											<div className='flex gap-x-4'>
												<div className='flex-none'>
													<i className='bi bi-clock'></i>
												</div>
												<div className='flex-1'>
													<DateSpan format='yyyy/MM/dd HH:mm'>
														{game.startAt}
													</DateSpan>
												</div>
											</div>
										</div>

										<div>
											<div className='flex gap-x-4'>
												<div className='flex-none'>
													<i className='ra ra-fw ra-bridge'></i>
												</div>
												<div className='flex-1'>
													{game.city?.name || ''}({game.city?.shopName || ''})
												</div>
											</div>
										</div>

										<div>
											<div className='flex gap-x-4'>
												<div className='flex-none'>
													<i className='bi bi-people-fill'></i>
												</div>
												<div className='flex-1'>
													{game.capacityMin}至{game.capacityMax}人
												</div>
											</div>
										</div>

										<div>
											<div className='flex gap-x-4'>
												<div className='flex-none'>
													<i className='bi bi-people-fill'></i>
												</div>
												<div className='flex-1'>
													Lv. {game.lvMin}-{game.lvMax}
												</div>
											</div>
										</div>
									</div>

									<NextLink href={`/game/${game.id}?signUp=true`} passHref>
										<MedievalButton>報名</MedievalButton>
									</NextLink>
								</div>
							</div>
						</div>
					</div>
				))}

				<div>
					<div className='parchment'>
						<h2 className='mb-2'>最新活動</h2>
						<div>
							<Swiper slidesPerView={1} spaceBetween={0}>
								{promotions.map((promotion) => (
									<SwiperSlide key={promotion.id}>
										<div className='w-full aspect-w-12 aspect-h-5 tablet:aspect-h-8'>
											<BgImage className='w-full' src={promotion.image.url} />
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>

				<div className='flex flex-col tablet:flex-row gap-x-6 gap-y-8'>
					<div className='flex-1'>
						<div className='parchment'>
							<h2 className='mb-2'>隨機條目</h2>
							<div className='card'>（建立中）</div>
						</div>
					</div>
					<div className='flex-none'>
						<FacebookPageEmbed />
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
