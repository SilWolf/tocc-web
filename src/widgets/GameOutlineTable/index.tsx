import React, { useCallback, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import Modal, { ModalProps } from 'src/components/Modal'
import { GameOutlineItem, GameOutlineReward } from 'src/types/Game.type'
import styles from './GameOutlineTable.module.css'

import classNames from 'classnames'

const GameOutlineRewardSpan = React.memo(
	({ reward }: { reward: GameOutlineReward }) => {
		return (
			<p>
				{[
					reward.isPerPlayer ? '每人' : '平分',
					reward.amount,
					reward.type === 'others' ? reward.othersName : reward.type,
				].join(' ')}
			</p>
		)
	}
)

type GameOutlineItemModalProps = Omit<ModalProps, 'onChange'> & {
	value: GameOutlineItem
	onChange: (value: GameOutlineItem) => void
	onCancel: () => void
}
const GameOutlineItemModal = ({
	value,
	onChange,
	onCancel,
	...others
}: GameOutlineItemModalProps) => {
	const {
		handleSubmit: rhfHandleSubmit,
		control: rhfControl,
		register,
	} = useForm<GameOutlineItem>({ defaultValues: value })

	const rewardFA = useFieldArray({
		control: rhfControl,
		name: 'rewards',
	})

	const handleClickRemoveRewardItem = useCallback(
		(index) => () => {
			rewardFA.remove(index)
		},
		[rewardFA]
	)

	const handleClickAppendRewardItem = useCallback(() => {
		rewardFA.append({
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
				<table className='outline-rewards-table'>
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
				</table>
			</form>
		</Modal>
	)
}

type Props = {
	value: GameOutlineItem[]
	onChange: (value: GameOutlineItem[]) => void
}

const GameOutlineTable = ({ value, onChange }: Props) => {
	const [outline, setOutline] = useState<GameOutlineItem[]>(value || [])
	const [activeOutlineItem, setActiveOutlineItem] = useState<
		[GameOutlineItem, number] | undefined
	>(undefined)

	const handleClickEditOutlineItem = useCallback(
		(outlineItem: GameOutlineItem, index: number) => () => {
			setActiveOutlineItem([outlineItem, index])
		},
		[]
	)

	const handleChangeOutlineItem = useCallback(
		(value: GameOutlineItem) => {
			if (activeOutlineItem) {
				const newPrev = [...outline]
				newPrev[activeOutlineItem[1]] = value

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
		setActiveOutlineItem([
			{
				description: '',
				rewards: [],
				remark: '',
			},
			outline.length,
		])
	}, [outline])

	return (
		<>
			<table className={styles.gameOutlineTable}>
				<thead>
					<tr>
						<th>情節</th>
						<th className='w-96'>獎勵</th>
						<th className='w-96'>備註</th>
						<th className='w-56 text-center'>操作</th>
					</tr>
				</thead>
				<tbody>
					{outline.map((outlineItem, outlineItemI) => (
						<tr key={outlineItemI}>
							<td>{outlineItem.description}</td>
							<td>
								{outlineItem.rewards.map((reward, rewardI) => (
									<GameOutlineRewardSpan key={rewardI} reward={reward} />
								))}
							</td>
							<td>{outlineItem.remark}</td>
							<td className='text-center'>
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
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan={4} className='text-green-500'>
							<button type='button' onClick={handleClickAppendOutlineItem}>
								<i className='bi bi-plus-circle-fill'></i> 新增情節
							</button>
						</td>
					</tr>
				</tfoot>
			</table>

			{activeOutlineItem?.[0] && (
				<GameOutlineItemModal
					open={true}
					value={activeOutlineItem[0]}
					onChange={handleChangeOutlineItem}
					onCancel={handleCancelOutlineItem}
				/>
			)}
		</>
	)
}

export default GameOutlineTable
