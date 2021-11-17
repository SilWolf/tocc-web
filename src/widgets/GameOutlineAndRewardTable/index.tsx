import React, { useCallback, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import Modal, { ModalProps } from 'src/components/Modal'
import { Character } from 'src/types'
import { GameOutlineItem, GameOutlineReward } from 'src/types/Game.type'
import styles from './GameOutlineAndRewardTable.module.css'

import StrapiImg from '../StrapiImg'
import classNames from 'classnames'
import { nanoid } from 'nanoid'

const GameOutlineRewardSpan = React.memo(
	({ reward }: { reward: GameOutlineReward }) => {
		return (
			<span>
				{[
					reward.isPerPlayer ? '每人' : '平分',
					reward.amount,
					reward.type === 'others' ? reward.othersName : reward.type,
				].join(' ')}
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
			type: 'gp',
			othersName: '',
			amount: 0,
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
											<th className='font-thin text-sm'>(其他請註明)</th>
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
													<select {...register(`rewards.${fieldI}.type`)}>
														<option value='gp'>GP</option>
														<option value='xp'>XP</option>
														<option value='others'>其他</option>
													</select>
												</td>
												<td>
													<input
														type='text'
														{...register(`rewards.${fieldI}.othersName`)}
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
											<td colSpan={5} className='text-green-500 pl-4 pt-4'>
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
	characters: Character[]
	onChange: (outline: GameOutlineItem[]) => void
}

const GameOutlineTable = ({
	outline: _outline,
	characters,
	onChange,
}: Props) => {
	const [outline, setOutline] = useState<GameOutlineItem[]>(_outline || [])
	const rewardMap = useMemo(() => {
		return outline.reduce<
			Record<
				string,
				{ reward: GameOutlineReward; display: string; unit: string }
			>
		>((prev, outlineItem) => {
			for (const reward of outlineItem.rewards) {
				prev[reward.id] = {
					reward: reward,
					display: [
						reward.isPerPlayer ? '每人' : '平分',
						reward.amount,
						reward.type === 'others' ? reward.othersName : reward.type,
					].join(' '),
					unit: reward.type === 'others' ? reward.othersName : reward.type,
				}
			}
			return prev
		}, {})
	}, [outline])

	const [rewardCharacterRatioMap, setRewardCharacterRatioMap] = useState<
		Record<string, Record<string, number | undefined>>
	>({})

	const handleClickRewardCharacterRatio = useCallback(
		(rewardId, characterId) => () => {
			setRewardCharacterRatioMap((prev) => {
				if (!prev[rewardId]) {
					prev[rewardId] = {}
				}
				if (!prev[rewardId][characterId]) {
					prev[rewardId][characterId] = 1
				} else {
					prev[rewardId][characterId] = undefined
				}

				return { ...prev }
			})
		},
		[setRewardCharacterRatioMap]
	)

	const [detailMap, summaryMap] = useMemo(() => {
		const detailMap: Record<
			string,
			Record<
				string,
				{
					amount: number
					display: string
					unit: string
				}
			>
		> = {}
		const summaryMap: Record<
			string,
			{
				amount: number
				display: string
				unit: string
				characterMap: Record<
					string,
					{
						amount: number
						display: string
						unit: string
					}
				>
			}
		> = {
			xp: {
				amount: 0,
				display: '',
				unit: 'xp',
				characterMap: {},
			},
			gp: {
				amount: 0,
				display: '',
				unit: 'gp',
				characterMap: {},
			},
		}

		for (const rewardId in rewardCharacterRatioMap) {
			const reward = rewardMap[rewardId].reward

			if (
				Object.values(rewardCharacterRatioMap[rewardId]).findIndex(
					(item) => item !== undefined
				) === -1
			) {
				continue
			}

			const denominator = reward.isPerPlayer
				? 1
				: Object.values(rewardCharacterRatioMap[rewardId]).reduce<number>(
						(prev, curr) => {
							prev += curr !== undefined && !isNaN(curr) ? Math.abs(curr) : 0
							return prev
						},
						0
				  )

			if (denominator === 0) {
				continue
			}

			if (!detailMap[rewardId]) {
				detailMap[rewardId] = {}
			}

			const unit = reward.type === 'others' ? reward.othersName : reward.type
			if (!summaryMap[unit]) {
				summaryMap[unit] = {
					amount: 0,
					display: '',
					unit: unit,
					characterMap: {},
				}
			}

			const characterMap = rewardCharacterRatioMap[rewardId]
			for (const characterId in characterMap) {
				if (
					characterMap[characterId] !== undefined &&
					!isNaN(characterMap[characterId] as number)
				) {
					const amount =
						(reward.amount * (characterMap[characterId] as number)) /
						denominator
					detailMap[rewardId][characterId] = {
						amount,
						display: amount.toFixed(0),
						unit: unit,
					}

					if (summaryMap[unit].characterMap[characterId] === undefined) {
						summaryMap[unit].characterMap[characterId] = {
							amount: 0,
							display: '',
							unit: unit,
						}
					}

					summaryMap[unit].characterMap[characterId].amount += amount
				}
			}
		}

		for (const rewardId in summaryMap) {
			for (const characterId in summaryMap[rewardId].characterMap) {
				if (summaryMap[rewardId]?.characterMap[characterId]) {
					summaryMap[rewardId].characterMap[characterId].display =
						summaryMap[rewardId].characterMap[characterId].amount.toFixed()
				}
			}
		}

		return [detailMap, summaryMap]
	}, [rewardCharacterRatioMap, rewardMap])

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
				onChange(newPrev)
			}
			setActiveOutlineItem(undefined)
		},
		[activeOutlineItem, onChange, outline]
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
			<table className={styles.gameOutlineTable}>
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
						<th className='w-56 text-center'>操作</th>
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
											{rewardMap[outlineItemReward.id].display}
										</td>

										{characters.map((character) => {
											const { display, unit } =
												detailMap[outlineItemReward.id]?.[character.id] || {}
											return (
												<td
													className='character-reward-map-td'
													key={character.id}
													onClick={handleClickRewardCharacterRatio(
														outlineItemReward.id,
														character.id
													)}
												>
													{display} {unit}
												</td>
											)
										})}

										{outlineItemRewardIndex === 0 && (
											<td
												rowSpan={outlineItem.rewards.length}
												className='text-center'
											>
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
							<button
								type='button'
								className='p-2 text-green-500'
								onClick={handleClickAppendOutlineItem}
							>
								<i className='bi bi-plus-circle-fill'></i> 新增情節
							</button>
						</td>
					</tr>
					{Object.entries(summaryMap).map(([unit, summary]) => (
						<tr key={unit}>
							<td></td>
							<td className='character-reward-summary-unit-td'>{unit}</td>
							{characters.map((character) => (
								<td key={character.id} className='character-reward-summary-td'>
									{summary.characterMap[character.id]?.amount !== undefined
										? `${summary.characterMap[character.id]?.display} ${unit}`
										: ''}
								</td>
							))}
							<td></td>
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

export default GameOutlineTable
