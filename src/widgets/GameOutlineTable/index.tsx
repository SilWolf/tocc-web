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
}
const GameOutlineItemModal = ({
	value,
	onChange,
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

	const handleSubmit = useCallback(
		(value) => {
			onChange(value)
		},
		[onChange]
	)

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
								<tr>
									<th className='w-24'>派發方式</th>
									<th className='w-24'>數量</th>
									<th className='w-24'>類型</th>
									<th className='font-thin text-sm'>(其他請註明)</th>
								</tr>
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
									</tr>
								))}
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

	return (
		<>
			<table className={styles.gameOutlineTable}>
				<tr>
					<th>情節</th>
					<th className='w-96'>獎勵</th>
					<th className='w-16 text-center'>操作</th>
				</tr>
				{outline.map((outlineItem, outlineItemI) => (
					<tr key={outlineItemI}>
						<td>{outlineItem.description}</td>
						<td>
							{outlineItem.rewards.map((reward, rewardI) => (
								<GameOutlineRewardSpan key={rewardI} reward={reward} />
							))}
						</td>
						<td className='text-center'>
							<button
								type='button'
								onClick={handleClickEditOutlineItem(outlineItem, outlineItemI)}
							>
								修改
							</button>
						</td>
					</tr>
				))}
			</table>

			{activeOutlineItem?.[0] && (
				<GameOutlineItemModal
					open={true}
					value={activeOutlineItem[0]}
					onChange={handleChangeOutlineItem}
				/>
			)}
		</>
	)
}

export default GameOutlineTable
