import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import Button from 'src/components/Button'
import { DateSpan } from 'src/components/Datetime'
import { getApis } from 'src/helpers/api/api.helper'
import { serverSidePropsWithSession } from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { SessionUser } from 'src/types/User.type'

type Props = {
	game: Game
}

const GameDetailPage: NextPage<Props> = ({ game }: Props) => {
	return (
		<div className='container py-24'>
			<div className='mx-auto' style={{ maxWidth: 600 }}>
				<div className='bg-white shadow p-8 space-y-6 mb-8'>
					<div>
						<p className='text-sm font-light text-gray-500'>劇本名稱</p>
						<p className='text-3xl'>{game.title}</p>
					</div>

					<div>
						<p className='text-sm font-light text-gray-500'>時間日期</p>
						<p className='text-3xl'>
							<DateSpan format='yyyy/MM/dd HH:mm'>{game.startAt}</DateSpan>
						</p>
					</div>

					<div>
						<p className='text-sm font-light text-gray-500'>場地</p>
						<p className='text-3xl'>{game.city?.name || ''}</p>
					</div>

					<div>
						<p className='text-sm font-light text-gray-500'>帶團DM</p>
						<p className='text-3xl'>{game.dm?.name || ''}</p>
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

				<div className='px-8'>
					<a
						data-ripplet
						className='block text-center bg-primary text-white hover:text-white text-lg px-2 py-2 rounded'
					>
						報名
					</a>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const { id } = context.params
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
