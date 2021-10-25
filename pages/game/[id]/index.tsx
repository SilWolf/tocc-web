import { GetServerSideProps, NextPage } from 'next'

import React from 'react'

import Button from 'src/components/Button'
import { DateSpan } from 'src/components/Datetime'
import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { SessionUser } from 'src/types/User.type'

type Props = {
	game: Game
}

const GameDetailPage: NextPage<Props> = ({ game }: Props) => {
	return (
		<div className='container py-24'>
			<div className='mx-auto' style={{ maxWidth: 800 }}>
				<div className='parchment framed space-y-6 mb-8'>
					<p className='text-right'>
						第三紀元{' '}
						<DateSpan format='yyyy年MM月dd日'>{game.worldStartAt}</DateSpan>
					</p>

					<h1 className='text-center'>{game.title}</h1>

					<p className='text-center italic'>{game.description}</p>

					<div className='text-center pt-8 pb-8'>
						<img
							src='/images/divider-1.png'
							alt='divider'
							className='opacity-30 w-1/2 mx-auto'
						/>
					</div>

					<div className='flex justify-center gap-12'>
						<div className='flex-none'>
							<p className='text-2xl'>
								<DateSpan format='yyyy/MM/dd HH:mm'>{game.startAt}</DateSpan>
							</p>
							<p className='text-sm font-light text-gray-500'>時間日期</p>
						</div>

						<div className='flex-none'>
							<p className='text-2xl'>
								{game.city?.name || ''} ({game.city?.code || ''})
							</p>
							<p className='text-sm font-light text-gray-500'>場地</p>
						</div>
					</div>

					<div className='flex justify-center gap-12'>
						<div className='flex-none'>
							<p className='text-2xl'>{game.dm?.name || ''}</p>
							<p className='text-sm font-light text-gray-500'>DM</p>
						</div>

						<div className='flex-none'>
							<p className='text-2xl'>
								Lv. {game.lvMin}-{game.lvMax}
							</p>
							<p className='text-sm font-light text-gray-500'>等級範圍</p>
						</div>

						<div className='flex-none'>
							<p className='text-2xl'>
								{game.capacityMin}-{game.capacityMax}人
							</p>
							<p className='text-sm font-light text-gray-500'>人數</p>
						</div>
					</div>

					<div className='text-center pt-8'>
						<img
							src='/images/divider-1.png'
							alt='divider'
							className='opacity-30 w-1/2 mx-auto'
						/>
					</div>

					<div className='text-right'>
						<Button>報名</Button>
					</div>
				</div>

				<div className='bg-white shadow p-8 space-y-6 mb-8'>
					<div className='form-group'>
						<p className='text-sm font-light text-gray-500'>選擇角色</p>
						<select>
							<option>123</option>
						</select>
					</div>
				</div>

				<div className='text-right'>
					<Button>報名</Button>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const id = context.params?.id as string
			if (!id) {
				return {
					notFound: true,
				}
			}

			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const _apis = getApis({ jwt: sessionUser?.jwt })

			const game = await _apis.getGameById(id)

			if (!game) {
				return {
					notFound: true,
				}
			}

			return {
				props: {
					game,
				}, // will be passed to the page component as props
			}
		}
	)

export default GameDetailPage
