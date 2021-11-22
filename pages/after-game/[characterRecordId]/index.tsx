import { GetServerSideProps, NextPage } from 'next'

import React, { useMemo } from 'react'

import { getApis } from 'helpers/api/api.helper'

import MedievalButton from 'src/components/MedievalButton'
import RewardAmountDisplay from 'src/components/RewardAmountDisplay'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { CharacterRecord } from 'src/types/Character.type'
import { SessionUser } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

type PageProps = {
	characterRecord: CharacterRecord
}

const AfterGamePage: NextPage<PageProps> = ({ characterRecord }) => {
	const { character, game } = characterRecord

	const characterRecordRewardEntries = useMemo(
		() => Object.entries(characterRecord.reward),
		[characterRecord]
	)

	const characterAttribute = useMemo<Record<string, number>>(
		() => ({
			xp: character.xp || 0,
			gp: character.gp || 0,
			...(character.attribute || {}),
		}),
		[character]
	)

	return (
		<>
			<div className='container'>
				<div className='parchment framed'>
					<div className='max-w-screen-mobile mx-auto mt-8 space-y-12'>
						<div>
							<h1 className='mb-2'>任務完成報告</h1>
							<p>
								茲證明 <strong>{character.name}</strong> 完成了{' '}
								<strong>
									[{game.code}] {game.title}
								</strong>{' '}
								的任務。
							</p>
							<p>請查閱以下報酬無誤，並在最下方蓋章以接受獎勵。</p>
						</div>
						<div className='grid grid-cols-2 gap-16'>
							{characterRecordRewardEntries.map(
								([unit, characterRecordReward]) => (
									<div key={unit}>
										<h3 className='border-b border-gray-400 uppercase'>
											{unit}
										</h3>
										<table className='w-full'>
											{characterRecordReward.details.map((detail, detailI) => (
												<tr key={detailI}>
													<td>{detail.description}</td>
													<td className='text-right'>{detail.amount}</td>
												</tr>
											))}
										</table>
										<h3 className='text-right'>
											<RewardAmountDisplay
												amount={characterRecordReward.amount}
												unit={unit}
												showOnZero={true}
											/>
										</h3>
									</div>
								)
							)}
						</div>

						<div className='text-center'>
							<img
								src='/images/divider-1.png'
								alt='divider'
								className='opacity-30 w-1/2 mx-auto'
							/>
						</div>

						<div className='flex mx-auto max-w-screen-mobile gap-x-6'>
							<div className='w-32 text-center'>
								<div>
									<StrapiImg
										className='w-32 h-32 mx-auto'
										size='medium'
										image={characterRecord.character.portraitImage}
									/>
								</div>
							</div>

							<div className='flex-1'>
								<h3>{characterRecord.character.name}</h3>
								<table>
									{characterRecordRewardEntries.map(
										([unit, characterRecordReward]) => (
											<tr key={unit}>
												<td>
													<RewardAmountDisplay
														amount={characterAttribute[unit] || 0}
														unit={unit}
														showOnZero={true}
													/>
												</td>
												<td className='text-accepted px-4'>
													<i className='bi bi-caret-right-fill'></i>
												</td>
												<td className='text-accepted'>
													<span>
														<RewardAmountDisplay
															amount={
																(characterAttribute[unit] || 0) +
																characterRecordReward.amount
															}
															unit={unit}
															showOnZero={true}
														/>
													</span>
												</td>
											</tr>
										)
									)}
								</table>
							</div>
						</div>

						<div className='text-center'>
							<MedievalButton type='button' color='success'>
								接受獎勵
							</MedievalButton>
						</div>
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

			const { params } = context

			const [characterRecord] = await Promise.all([
				_apis.getCharacterRecordById(params?.characterRecordId as string),
			])

			if (!characterRecord) {
				return {
					notFound: true,
				}
			}

			return {
				props: {
					characterRecord,
				},
			}
		}
	)

export default AfterGamePage
