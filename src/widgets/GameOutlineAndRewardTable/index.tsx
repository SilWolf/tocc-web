import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	Controller as RHFController,
	useFieldArray,
	useForm,
} from 'react-hook-form'

import { Input } from 'src/components/Form'
import Modal, { ModalProps } from 'src/components/Modal'
import RewardAmountDisplay from 'src/components/RewardAmountDisplay'
import RewardTypeSelector from 'src/components/RewardTypeSelector'
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
			if (confirm('確認要刪除嗎？')) {
				rewardFA.remove(index)
			}
		},
		[rewardFA]
	)

	const handleClickAppendRewardItem = useCallback(() => {
		rewardFA.append({
			id: nanoid(12),
			amount: 0,
			unit: 'xp',
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
							<th>
								<p className='mt-2'>情節</p>
							</th>
							<td>
								<Input
									type='text'
									{...register('description')}
									helperText={
										<p>
											<p>例1. 打敗路上的劫匪，搜刮他們的隨身物品</p>
											<p>例2. 發現了在死胡同裡的寶藏</p>
										</p>
									}
								/>
							</td>
						</tr>
						<tr>
							<th className='pt-2'>獎勵</th>
							<td>
								<table className='outline-reward-item-table'>
									<thead>
										<tr>
											<th>派發方式</th>
											<th>數量</th>
											<th>類型</th>
											<th>備註</th>
											<th></th>
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
														className='w-24'
													/>
												</td>
												<td>
													<RHFController
														control={rhfControl}
														name={`rewards.${fieldI}.unit`}
														render={({ field: { onChange, value } }) => (
															<RewardTypeSelector
																value={value}
																onChange={onChange}
															/>
														)}
													/>
												</td>
												<td className='pl-4'>
													<input
														type='text'
														{...register(`rewards.${fieldI}.remark`)}
													/>
												</td>
												<td className='text-center'>
													<button
														type='button'
														onClick={handleClickRemoveRewardItem(fieldI)}
														className='ml-2'
													>
														<i className='bi bi-dash-circle-fill text-red-500'></i>
													</button>
												</td>
											</tr>
										))}
										<tr>
											<td></td>
											<td></td>
											<td className='text-xs text-gray-500'>
												<p>例. 英雄值、公會名望、某某好感度</p>
												<p>知識度、特殊貨幣</p>
											</td>
											<td className='pl-4 text-xs text-gray-500'>
												<p>例1. 要ｘ回合解決遭遇才有</p>
												<p>例2. 寶藏位於某某處</p>
											</td>
											<td></td>
										</tr>
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
							<th>
								<p className='mt-2'>備註</p>
							</th>
							<td>
								<Input
									type='textarea'
									rows={2}
									{...register('remark')}
									helperText={
										<>
											<p>例1. 這個情節要先與某人交談才能進行</p>
											<p>例2. 如果在前面讓某人退場，就無法觸發此情節</p>
										</>
									}
								/>
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
	onChangeOutline?: (outline: GameOutlineItem[]) => void
	onChangeOutlineRewardCharacterMap?: (
		outlineRewardCharacterMap: GameOutlineRewardCharacterMap
	) => void
	isChangeable?: boolean
}

const GameOutlineAndRewardTable = ({
	outline: _outline,
	outlineRewardCharacterMap: _outlineRewardCharacterMap,
	characters,
	onChangeOutline,
	onChangeOutlineRewardCharacterMap,
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
				forceShow?: boolean
			}
		> = {
			xp: {
				amount: 0,
				unit: 'xp',
				characterMap: {},
				forceShow: true,
			},
			gp: {
				amount: 0,
				unit: 'gp',
				characterMap: {},
				forceShow: true,
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
			if (confirm('確定要刪除嗎？')) {
				setOutline((prev) => {
					prev.splice(index, 1)
					return [...prev]
				})
			}
		},
		[]
	)

	const handleClickAppendOutlineItem = useCallback(() => {
		setActiveOutlineItem({
			current: {
				id: nanoid(16),
				description: '',
				rewards: [
					{
						id: nanoid(16),
						isPerPlayer: true,
						amount: 0,
						unit: 'xp',
						remark: '',
					},
				],
				remark: '',
			},
			index: outline.length,
		})
	}, [outline])

	useEffect(() => {
		setOutline(_outline)
	}, [_outline])

	useEffect(() => {
		setOutlineRewardCharacterMap(_outlineRewardCharacterMap)
	}, [_outlineRewardCharacterMap])

	useEffect(() => {
		onChangeOutline?.(outline)
	}, [onChangeOutline, outline])

	useEffect(() => {
		onChangeOutlineRewardCharacterMap?.(outlineRewardCharacterMap)
	}, [onChangeOutlineRewardCharacterMap, outlineRewardCharacterMap])

	return (
		<>
			<table
				className={classNames(styles.gameOutlineAndRewardTable, {
					changeable: isChangeable,
				})}
			>
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
					{Object.entries(unitSummaryDetailMap)
						.filter(([, summary]) => summary.amount !== 0 || summary.forceShow)
						.map(([unit, summary]) => (
							<tr key={unit}>
								<td></td>
								<td className='character-reward-summary-unit-td'>{unit}</td>
								{characters.map((character) => (
									<td
										key={character.id}
										className='character-reward-summary-td'
									>
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
