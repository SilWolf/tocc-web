import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { DateSpan } from 'src/components/Datetime'
import { getApis } from 'src/helpers/api/api.helper'

import {
	GetServerSidePropsContextWithIronSession,
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { SessionUser } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

type Props = {
	games: Game[]
}

const AdminIndexPage: NextPage<Props> = ({ games }: Props) => {
	console.log(games)
	return (
		<>
			<h2>待跑劇本</h2>
			<div className='grid laptop:grid-cols-2 gap-4'>
				{games.map((game) => {
					return (
						<div className='parchment space-y-2'>
							<h2>
								[{game.code}] {game.title}
							</h2>

							<div className='grid tablet:grid-cols-3 laptop:grid-cols-3 gap-4'>
								<div className='tablet:col-span-2 laptop:col-span-2'>
									<table>
										<tr>
											<td>日期時間: </td>
											<td className='pl-2 font-bold'>
												<DateSpan format='yyyy年MM月dd日'>
													{game.startAt}
												</DateSpan>{' '}
												<DateSpan format='HH:mm'>{game.startAt}</DateSpan>
												{' - '}
												<DateSpan format='HH:mm'>{game.endAt}</DateSpan>
											</td>
										</tr>
										<tr>
											<td>城市(店舖): </td>
											<td className='pl-2 font-bold'>
												{game.city?.name || ''} ({game.city?.code || ''})
											</td>
										</tr>
										<tr>
											<td>等級: </td>
											<td className='pl-2 font-bold'>
												Lv. {game.lvMin}-{game.lvMax}
											</td>
										</tr>
										<tr>
											<td>人數: </td>
											<td className='pl-2 font-bold'>
												{game.capacityMin}-{game.capacityMax}人
											</td>
										</tr>
									</table>

									<div className='space-y-1'>
										{game.gameSignUps?.map((gameSignUp) => {
											const { character, player } = gameSignUp
											return (
												<div
													className={classNames(
														'flex gap-x-1 items-center pl-1 pr-1',
														gameSignUp.status === 'pending'
															? 'bg-pending-light'
															: gameSignUp.status === 'accepted'
															? 'bg-accepted-light'
															: 'bg-rejected-light'
													)}
												>
													<div className='flex-none text-xs text-black opacity-40'>
														<i
															className={classNames(
																gameSignUp.status === 'pending'
																	? 'bi bi-hourglass-split'
																	: gameSignUp.status === 'accepted'
																	? 'bi bi-check-lg'
																	: 'bi bi-x-lg'
															)}
														></i>
													</div>
													<div>
														<StrapiImg
															className={classNames('w-10 h-10')}
															image={character.portraitImage}
															size='thumbnail'
															alt=''
														/>
													</div>
													<div className='flex-1'>
														<p className='text-normal leading-4'>
															{character.code} {character.name}
														</p>
														<p className='text-xs leading-3 opacity-80'>
															{player.code} {player.name}
														</p>
													</div>
												</div>
											)
										})}
									</div>
								</div>

								<div>
									<h3 className='mb-2'>待辦事項</h3>
									<div className='space-y-1'>
										<div className='flex gap-x-2 line-through opacity-30'>
											<div>
												<i className='bi bi-check-square-fill'></i>
											</div>
											<div>發佈遊戲</div>
										</div>
										<div className='flex gap-x-2'>
											<div>
												<i className='bi bi-square'></i>
											</div>
											<div>回應 月月 的報名</div>
										</div>
										<div className='flex gap-x-2'>
											<div>
												<i className='bi bi-square'></i>
											</div>
											<div>回應 月月 的報名</div>
										</div>
										<div className='flex gap-x-2'>
											<div>
												<i className='bi bi-square'></i>
											</div>
											<div>回應 月月 的報名</div>
										</div>
										<div className='flex gap-x-2'>
											<div>
												<i className='bi bi-square'></i>
											</div>
											<div>回應 月月 的報名</div>
										</div>
										<div className='flex gap-x-2'>
											<div>
												<i className='bi bi-square'></i>
											</div>
											<div>跑劇本</div>
										</div>
										<div className='flex gap-x-2'>
											<div>
												<i className='bi bi-square'></i>
											</div>
											<div>派獎勵、XP</div>
										</div>
										<div className='flex gap-x-2'>
											<div>
												<i className='bi bi-square'></i>
											</div>
											<div>後記、情報更新</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = ProtectAdminPage(
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const apis = getApis({ jwt: sessionUser?.jwt })

			const games = await apis.getDMPendingGames()

			for (const game of games) {
				if (game.gameSignUps) {
					game.gameSignUps = game.gameSignUps.sort((a, b) => {
						if (a.status !== b.status) {
							if (a.status === 'accepted') {
								return -1
							} else if (b.status === 'accepted') {
								return 1
							} else if (a.status === 'pending') {
								return -1
							} else if (b.status === 'pending') {
								return 1
							}
						}

						return a.createdAt && b.createdAt && a.createdAt > b.createdAt
							? 1
							: -1
					})
				}
			}

			return {
				props: { games },
			}
		}
	)
)

export default AdminIndexPage
