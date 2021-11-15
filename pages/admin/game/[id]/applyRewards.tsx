import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import { useCallback, useMemo, useState } from 'react'

import Breadcrumb from 'components/Breadcrumb'

import { getApis } from 'src/helpers/api/api.helper'
import {
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { GameOutlineReward, GameRecord } from 'src/types/Game.type'
import { SessionUser } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

type PageProps = {
	game: Game
	gameRecords: GameRecord[]
}

const AdminGameDetailApplyRewardsPage: NextPage<PageProps> = ({
	game,
	gameRecords,
}) => {
	const items = useMemo(() => {
		if (!game.outline) {
			return []
		}

		return game.outline.reduce<
			{
				id: string
				description: string
				reward: GameOutlineReward & { typeDisplay: string; display: string }
			}[]
		>((prev, outlineItem) => {
			for (const reward of outlineItem.rewards) {
				prev.push({
					id: (prev.length + 1).toString(),
					description: outlineItem.description,
					reward: {
						...reward,
						typeDisplay:
							reward.type !== 'others' ? reward.type : reward.othersName,
						display: `${reward.isPerPlayer ? '每人' : '平分'} ${
							reward.amount
						} ${reward.type !== 'others' ? reward.type : reward.othersName}`,
					},
				})
			}

			return prev
		}, [])
	}, [game])

	const [rewardDistributeMap, setRewardDistributeMap] = useState<
		Record<string, Record<string, number | undefined>>
	>({})

	const rewardDistributionDisplay = useMemo(() => {
		const result: Record<
			string,
			Record<
				string,
				{ amount: number; displayAmount: string; unit: string } | undefined
			>
		> = {}

		for (const itemId in rewardDistributeMap) {
			const item = items.find((item) => item.id === itemId)
			if (!item) {
				continue
			}

			const sum = item.reward.isPerPlayer
				? 1
				: Object.values(rewardDistributeMap[itemId]).reduce<number>(
						(prev, curr) => {
							prev += curr !== undefined ? Math.abs(curr) : 0
							return prev
						},
						0
				  )

			if (sum === 0) {
				continue
			}

			result[itemId] = Object.keys(rewardDistributeMap[itemId]).reduce<
				Record<
					string,
					{ amount: number; displayAmount: string; unit: string } | undefined
				>
			>((prev, characterId) => {
				const innerValue = rewardDistributeMap[itemId][characterId]

				if (innerValue !== undefined) {
					const _amount = (item.reward.amount * innerValue) / sum
					prev[characterId] = {
						amount: _amount,
						displayAmount: _amount.toFixed(0),
						unit: item.reward.typeDisplay,
					}
				}

				return prev
			}, {})
		}

		return result
	}, [items, rewardDistributeMap])

	const handleClickDistributeItem = useCallback(
		(itemId: string, characterId: string) => () => {
			setRewardDistributeMap((prev) => {
				if (!prev[itemId]) {
					prev[itemId] = {}
				}

				prev[itemId][characterId] = prev[itemId][characterId] ? undefined : 1

				return { ...prev }
			})
		},
		[]
	)

	return (
		<>
			<Breadcrumb>
				<NextLink href='/admin/dashboard' passHref>
					<a>DM後台</a>
				</NextLink>
				<NextLink href='/admin/game' passHref>
					<a>劇本</a>
				</NextLink>
				<NextLink href={`/admin/game/${game.id}`} passHref>
					<a>
						[{game.code}] {game.title}
					</a>
				</NextLink>
				<span>派發獎勵</span>
			</Breadcrumb>

			<table className='w-full general-table'>
				<thead>
					<tr>
						<td></td>
						<td></td>
						{gameRecords.map((record) => (
							<td className='text-xs text-center' key={record.id}>
								全選
							</td>
						))}
						<td></td>
					</tr>
					<tr>
						<th>項目</th>
						<th>獎勵</th>
						{gameRecords.map((record) => (
							<th key={record.id} className='w-32 text-center'>
								<div>
									<StrapiImg
										className='w-8 h-8 mx-auto'
										size='thumbnail'
										image={record.character.portraitImage}
									/>
								</div>
								<span>{record.character.name[0]}</span>
							</th>
						))}
						<th className='w-10'></th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.id}>
							<td>{item.description}</td>
							<td>{item.reward.display}</td>
							{gameRecords.map((record) => {
								const distributionItem =
									rewardDistributionDisplay[item.id]?.[record.character.id]

								return (
									<td
										key={record.id}
										className='text-center cursor-pointer'
										onClick={handleClickDistributeItem(
											item.id,
											record.character.id
										)}
									>
										{distributionItem
											? `${distributionItem.displayAmount} ${distributionItem.unit}`
											: '-'}
									</td>
								)
							})}
							<td className='text-xs text-center'>全選</td>
						</tr>
					))}
					<tr className='general-table-tr-empty'>
						<td></td>
						<td></td>
						{gameRecords.map((record) => (
							<td className='' key={record.id}></td>
						))}
						<td></td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						{gameRecords.map((record) => (
							<td className='' key={record.id}></td>
						))}
						<td></td>
					</tr>
				</tbody>
			</table>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = ProtectAdminPage(
	serverSidePropsWithSession(async ({ params, req: { session } }) => {
		const sessionUser = session.get<SessionUser>('sessionUser')
		const apis = getApis({ jwt: sessionUser?.jwt })

		if (!params?.id) {
			return {
				notFound: true,
			}
		}

		const [game] = await Promise.all([apis.getGameById(params.id as string)])

		if (!game) {
			return {
				notFound: true,
			}
		}

		const [gameRecords] = await Promise.all([
			apis.getGameRecordsByGameId(params.id as string),
		])

		return {
			props: {
				game,
				gameRecords,
			},
		}
	})
)

export default AdminGameDetailApplyRewardsPage
