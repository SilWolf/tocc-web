import React, { useCallback, useMemo, useState } from 'react'
import {
	Controller as RHFController,
	useFieldArray,
	useForm,
} from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

import Modal, { ModalProps } from 'src/components/Modal'
import { Character } from 'src/types'
import {
	GameOutlineItem,
	GameOutlineReward,
	GameOutlineRewardCharacterMap,
} from 'src/types/Game.type'
import styles from './GameOutlineAndRewardTable.module.css'

import StrapiImg from '../StrapiImg'
import classNames from 'classnames'
import { nanoid } from 'nanoid'

const REWARD_UNITS = ['gp', 'xp']

const RewardAmountDisplay = React.memo(
	(props: {
		amount: number
		unit: string
		isPerPlayer?: boolean
		showOnZero?: boolean
	}) => {
		if (
			(props.amount === 0 && !props.showOnZero) ||
			props.amount === undefined
		) {
			return <></>
		}

		return (
			<span>
				{props.isPerPlayer === undefined
					? ''
					: props.isPerPlayer === true
					? '每人 '
					: '平分 '}
				{props.amount.toFixed(0)} {props.unit}
			</span>
		)
	}
)

type GameOutlineItemModalProps = Omit<ModalProps, 'onChange'> & {
	outlineItem: GameOutlineItem
	onChange: (value: GameOutlineItem) => void
	onCancel: () => void
}

const GameOutlineItemModal = ({
	outlineItem,
	onChange,
	onCancel,
	...others
}: GameOutlineItemModalProps) => {
	const {
		handleSubmit: rhfHandleSubmit,
		control: rhfControl,
		register,
	} = useForm<GameOutlineItem>({ defaultValues: outlineItem })

	const rewardFA = useFieldArray({
		control: rhfControl,
		name: 'rewards',
		keyName: 'rewardId',
	})

	const handleClickRemoveRewardItem = useCallback(
		(index) => () => {
			rewardFA.remove(index)
		},
		[rewardFA]
	)

	const handleClickAppendRewardItem = useCallback(() => {
		rewardFA.append({
			id: nanoid(12),
			amount: 0,
			unit: 'gp',
			isPerPlayer: false,
		})
	}, [rewardFA])

	const handleSubmit = useCallback(
		(value) => {
			onChange(value)
		},
		[onChange]
	)

	const handleClickCancel = useCallback(() => {
		onCancel()
	}, [onCancel])

	return (
		<Modal
			{...others}
			className={classNames(others.className, styles.gameOutlineModal)}
		>
			<form onSubmit={rhfHandleSubmit(handleSubmit)}>
				<input type='hidden' {...register('id')} />
				<table className='outline-rewards-table'>
					<tbody>
						<tr>
							<th>情節</th>
							<td>
								<textarea rows={2} {...register('description')}></textarea>
							</td>
						</tr>
						<tr>
							<th>獎勵</th>
							<td>
								<table className='outline-reward-item-table'>
									<thead>
										<tr>
											<th className='w-24'>派發方式</th>
											<th className='w-24'>數量</th>
											<th className='w-24'>類型</th>
											<th className='w-8'></th>
										</tr>
									</thead>
									<tbody>
										{rewardFA.fields.map((field, fieldI) => (
											<tr key={fieldI}>
												<td>
													<input
														type='hidden'
														{...register(`rewards.${fieldI}.id`)}
													/>
													<select
														{...register(`rewards.${fieldI}.isPerPlayer`, {
															setValueAs: (value) => value === 'true',
														})}
													>
														<option value='false'>平分</option>
														<option value='true'>每人</option>
													</select>
												</td>
												<td>
													<input
														type='number'
														{...register(`rewards.${fieldI}.amount`, {
															valueAsNumber: true,
														})}
													/>
												</td>
												<td>
													<RHFController
														name={`rewards.${fieldI}.unit`}
														control={rhfControl}
														render={({ field: { onChange, value } }) => (
															<CreatableSelect
																options={REWARD_UNITS}
																onChange={onChange}
																value={value}
															/>
														)}
													/>
												</td>
												<td className='text-center'>
													<button
														type='button'
														onClick={handleClickRemoveRewardItem(fieldI)}
													>
														<i className='bi bi-dash-circle-fill text-red-500'></i>
													</button>
												</td>
											</tr>
										))}
									</tbody>
									<tfoot>
										<tr>
											<td colSpan={4} className='text-green-500 pl-4 pt-4'>
												<button
													type='button'
													onClick={handleClickAppendRewardItem}
												>
													<i className='bi bi-plus-circle-fill'></i> 新增獎勵
												</button>
											</td>
										</tr>
									</tfoot>
								</table>
							</td>
						</tr>
						<tr>
							<th>備註</th>
							<td>
								<textarea rows={2} {...register('remark')}></textarea>
							</td>
						</tr>
						<tr>
							<th></th>
							<td>
								<div className='space-x-2'>
									<button type='submit' className='button button-primary'>
										儲存
									</button>
									<button
										type='button'
										className='button'
										onClick={handleClickCancel}
									>
										取消
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</Modal>
	)
}

type Props = {
	outline: GameOutlineItem[]
	outlineRewardCharacterMap: GameOutlineRewardCharacterMap
	characters: Character[]
	onChange?: (
		outline: GameOutlineItem[],
		outlineRewardCharacterMap: GameOutlineRewardCharacterMap
	) => void
	isChangeable?: boolean
}

const GameOutlineAndRewardTable = ({
	outline: _outline,
	outlineRewardCharacterMap: _outlineRewardCharacterMap,
	characters,
	onChange,
	isChangeable = true,
}: Props) => {
	const [outline, setOutline] = useState<GameOutlineItem[]>(_outline || [])
	const rewardMap = useMemo(() => {
		return outline.reduce<
			Record<string, { reward: GameOutlineReward; unit: string }>
		>((prev, outlineItem) => {
			for (const reward of outlineItem.rewards) {
				prev[reward.id] = {
					reward: reward,
					unit: reward.unit,
				}
			}
			return prev
		}, {})
	}, [outline])

	const [outlineRewardCharacterMap, setOutlineRewardCharacterMap] =
		useState<GameOutlineRewardCharacterMap>(_outlineRewardCharacterMap)

	const handleClickRewardCharacterRatio = useCallback(
		(rewardId, characterId) => () => {
			setOutlineRewardCharacterMap((prev) => {
				const reward = rewardMap[rewardId]?.reward
				if (!reward) {
					return { ...prev }
				}

				if (!prev[rewardId]) {
					prev[rewardId] = {
						rewardId: rewardId,
						denominator: 0,
						characterMap: {},
					}
				}

				if (!prev[rewardId].characterMap[characterId]) {
					prev[rewardId].characterMap[characterId] = {
						characterId: characterId,
						ratio: 0,
					}
				}

				if (prev[rewardId].characterMap[characterId].ratio === 0) {
					prev[rewardId].characterMap[characterId].ratio = 1
				} else {
					prev[rewardId].characterMap[characterId].ratio = 0
				}

				if (reward.isPerPlayer) {
					prev[rewardId].denominator = 1
				} else {
					prev[rewardId].denominator = Object.values(
						prev[rewardId].characterMap
					).reduce<number>((prev, characterReward) => {
						prev += characterReward && characterReward.ratio !== 0 ? 1 : 0
						return prev
					}, 0)
				}

				return { ...prev }
			})
		},
		[rewardMap]
	)

	const [rewardCharacterAmountMap, unitSummaryDetailMap] = useMemo(() => {
		const rewardCharacterAmountMap: Record<
			string,
			Record<string, { amount: number }>
		> = {}
		const unitSummaryDetailMap: Record<
			string,
			{
				amount: number
				unit: string
				characterMap: Record<
					string,
					{
						amount: number
					}
				>
			}
		> = {
			xp: {
				amount: 0,
				unit: 'xp',
				characterMap: {},
			},
			gp: {
				amount: 0,
				unit: 'gp',
				characterMap: {},
			},
		}

		for (const rewardId in outlineRewardCharacterMap) {
			rewardCharacterAmountMap[rewardId] = {}
			const reward = rewardMap[rewardId]?.reward

			if (!reward) {
				continue
			}

			const unit = reward.unit
			if (!unitSummaryDetailMap[unit]) {
				unitSummaryDetailMap[unit] = {
					amount: 0,
					unit: unit,
					characterMap: {},
				}
			}

			for (const characterId in outlineRewardCharacterMap[rewardId]
				.characterMap) {
				const rewardRealtime = outlineRewardCharacterMap[rewardId]
				const character = rewardRealtime.characterMap[characterId]

				const amount =
					rewardRealtime.denominator > 0
						? (reward.amount / rewardRealtime.denominator) * character.ratio
						: 0

				rewardCharacterAmountMap[rewardId][characterId] = {
					amount: amount,
				}

				unitSummaryDetailMap[unit].amount += amount
				if (!unitSummaryDetailMap[unit].characterMap[characterId]) {
					unitSummaryDetailMap[unit].characterMap[characterId] = {
						amount: 0,
					}
				}
				unitSummaryDetailMap[unit].characterMap[characterId].amount += amount
			}
		}

		return [rewardCharacterAmountMap, unitSummaryDetailMap]
	}, [outlineRewardCharacterMap, rewardMap])

	const [activeOutlineItem, setActiveOutlineItem] = useState<
		{ current: GameOutlineItem; index: number } | undefined
	>(undefined)

	const handleClickEditOutlineItem = useCallback(
		(outlineItem: GameOutlineItem, index: number) => () => {
			setActiveOutlineItem({ current: outlineItem, index })
		},
		[]
	)

	const handleChangeOutlineItem = useCallback(
		(value: GameOutlineItem) => {
			if (activeOutlineItem) {
				const newPrev = [...outline]
				newPrev[activeOutlineItem.index] = value

				setOutline(newPrev)
			}
			setActiveOutlineItem(undefined)
		},
		[activeOutlineItem, outline]
	)

	const handleCancelOutlineItem = useCallback(() => {
		setActiveOutlineItem(undefined)
	}, [])

	const handleClickMoveUpOutlineItem = useCallback(
		(outlineItem: GameOutlineItem, index: number) => () => {
			setOutline((prev) => {
				prev.splice(index - 1, 0, prev.splice(index, 1)[0])
				return [...prev]
			})
		},
		[]
	)

	const handleClickMoveDownOutlineItem = useCallback(
		(outlineItem: GameOutlineItem, index: number) => () => {
			setOutline((prev) => {
				prev.splice(index + 1, 0, prev.splice(index, 1)[0])
				return [...prev]
			})
		},
		[]
	)

	const handleClickRemoveOutlineItem = useCallback(
		(outlineItem: GameOutlineItem, index: number) => () => {
			setOutline((prev) => {
				prev.splice(index, 1)
				return [...prev]
			})
		},
		[]
	)

	const handleClickAppendOutlineItem = useCallback(() => {
		setActiveOutlineItem({
			current: {
				id: nanoid(16),
				description: '',
				rewards: [],
				remark: '',
			},
			index: outline.length,
		})
	}, [outline])

	return (
		<>
			<table className={styles.gameOutlineAndRewardTable}>
				<thead>
					<tr>
						<th>情節</th>
						<th className='reward-td'>獎勵</th>
						{characters.map((character) => (
							<th key={character.id} className='w-32 text-center text-xs'>
								<div>
									<StrapiImg
										className='w-8 h-8 mx-auto'
										size='thumbnail'
										image={character.portraitImage}
									/>
								</div>
								<span>{character.nickname}</span>
							</th>
						))}
						<th className='w-56 text-center'>{isChangeable && '操作'}</th>
					</tr>
				</thead>
				<tbody>
					{outline.map((outlineItem, outlineItemI) =>
						outlineItem.rewards.map(
							(outlineItemReward, outlineItemRewardIndex) => {
								return (
									<tr key={outlineItemReward.id}>
										{outlineItemRewardIndex === 0 && (
											<td rowSpan={outlineItem.rewards.length}>
												{outlineItem.description}
											</td>
										)}
										<td className='reward-td'>
											<RewardAmountDisplay
												isPerPlayer={outlineItemReward.isPerPlayer}
												amount={outlineItemReward.amount}
												unit={outlineItemReward.unit}
											/>
										</td>

										{characters.map((character) => {
											return (
												<td
													className='character-reward-map-td'
													key={character.id}
													onClick={
														isChangeable
															? handleClickRewardCharacterRatio(
																	outlineItemReward.id,
																	character.id
															  )
															: undefined
													}
												>
													<RewardAmountDisplay
														amount={
															rewardCharacterAmountMap[outlineItemReward.id]?.[
																character.id
															]?.amount
														}
														unit={outlineItemReward.unit}
													/>
												</td>
											)
										})}

										{outlineItemRewardIndex === 0 && (
											<td
												rowSpan={outlineItem.rewards.length}
												className='text-center'
											>
												{isChangeable && (
													<div className='space-x-3'>
														<button
															type='button'
															onClick={handleClickEditOutlineItem(
																outlineItem,
																outlineItemI
															)}
														>
															修改
														</button>
														<button
															type='button'
															onClick={handleClickMoveUpOutlineItem(
																outlineItem,
																outlineItemI
															)}
															disabled={outlineItemI <= 0}
														>
															移上
														</button>
														<button
															type='button'
															onClick={handleClickMoveDownOutlineItem(
																outlineItem,
																outlineItemI
															)}
															disabled={outlineItemI >= outline.length - 1}
														>
															移下
														</button>
														<button
															type='button'
															className='text-red-500'
															onClick={handleClickRemoveOutlineItem(
																outlineItem,
																outlineItemI
															)}
														>
															刪除
														</button>
													</div>
												)}
											</td>
										)}
									</tr>
								)
							}
						)
					)}
				</tbody>
				<tfoot>
					<tr>
						<td>
							{isChangeable && (
								<button
									type='button'
									className='p-2 text-green-500'
									onClick={handleClickAppendOutlineItem}
								>
									<i className='bi bi-plus-circle-fill'></i> 新增情節
								</button>
							)}
						</td>
					</tr>
					{Object.entries(unitSummaryDetailMap).map(([unit, summary]) => (
						<tr key={unit}>
							<td></td>
							<td className='character-reward-summary-unit-td'>{unit}</td>
							{characters.map((character) => (
								<td key={character.id} className='character-reward-summary-td'>
									<RewardAmountDisplay
										amount={summary.characterMap[character.id]?.amount}
										unit={unit}
									/>
								</td>
							))}
							<td className='font-bold'>
								={' '}
								<RewardAmountDisplay
									amount={summary.amount}
									unit={unit}
									showOnZero={true}
								/>
							</td>
						</tr>
					))}
				</tfoot>
			</table>

			{activeOutlineItem?.current && (
				<GameOutlineItemModal
					open={true}
					outlineItem={activeOutlineItem.current}
					onChange={handleChangeOutlineItem}
					onCancel={handleCancelOutlineItem}
				/>
			)}
		</>
	)
}

export default GameOutlineAndRewardTable
