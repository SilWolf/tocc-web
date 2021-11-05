import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React from 'react'

import { DateSpan } from 'src/components/Datetime'
import MedievalButton from 'src/components/MedievalButton'
import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { SessionUser } from 'src/types/User.type'

type Props = {
	pendingGames: Game[]
}

const GamesPage: NextPage<Props> = ({ pendingGames }) => {
	return (
		<div className='container'>
			{pendingGames.map((game) => (
				<div key={game.id}>
					<div className='parchment framed'>
						<div className='flex gap-x-4 items-start'>
							<div className='flex-none w-24 text-center'>
								<p className='text-4xl font-thin'>10</p>
								<p className='text-3xl font-thin'>Oct</p>
							</div>
							<div className='flex-1'>
								<h2>{game.title}</h2>
								<p className='text-gray-400'>{game.description}</p>

								<div className='flex gap-x-8 text-2xl mt-8 mb-8'>
									<div className='flex-1'>
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

									<div className='flex-1'>
										<div className='flex gap-x-4'>
											<div className='flex-none'>
												<i className='ra ra-fw ra-bridge'></i>
											</div>
											<div className='flex-1'>
												{game.city?.name || ''}({game.city?.shopName || ''})
											</div>
										</div>
									</div>

									<div className='flex-1'>
										<div className='flex gap-x-4'>
											<div className='flex-none'>
												<i className='bi bi-people-fill'></i>
											</div>
											<div className='flex-1'>3/6</div>
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
		</div>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const _apis = getApis({ jwt: sessionUser?.jwt })

			const [pendingGames] = await Promise.all([_apis.getPendingGames()])

			return {
				props: {
					pendingGames,
				}, // will be passed to the page component as props
			}
		}
	)

export default GamesPage
