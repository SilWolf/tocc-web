import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { City, Game, User } from 'types'
import { Game_Req } from 'types/Game.type'

import * as api from 'helpers/api/api.helper'

import Breadcrumb from 'components/Breadcrumb'
import { Input } from 'components/Form'
import Stepper from 'components/Stepper'

import cns from 'classnames'
import lightFormat from 'date-fns/lightFormat'

type FormProps = Game_Req

type PageProps = {
	game?: Game | undefined
	cities: City[]
	dms: User[]
	isNew?: boolean
}

const AdminGameDetailCharacterBox = ({
	title,
	info,
	playerName,
	isSelected = false,
	onClick,
}: {
	title: string
	info: string
	playerName: string
	isSelected?: boolean
	onClick?: (action: 'select' | 'unselect') => void
}): JSX.Element => {
	const handleClick = useCallback(
		(
				action: 'select' | 'unselect'
			): React.MouseEventHandler<HTMLButtonElement> =>
			(e) => {
				e.preventDefault()
				onClick?.(action)
			},
		[onClick]
	)

	return (
		<div
			className={cns(
				'px-2 py-1 flex gap-x-2 items-center',
				isSelected ? 'bg-green-200' : ' bg-white'
			)}
		>
			<p className='flex-1'>
				<p className='flex-none'>{title}</p>
				<p className='flex-1 text-xs leading-3 text-gray-400 space-x-1'>
					<span>{info}</span>
					<span>@{playerName}</span>
				</p>
			</p>
			<div className='flex-none space-x-2'>
				{isSelected ? (
					<>
						<button
							className='button button-text px-1'
							onClick={handleClick('unselect')}
						>
							<i className='bi bi-x-lg'></i>
						</button>
					</>
				) : (
					<>
						<button
							className='button button-text px-1'
							onClick={handleClick('select')}
						>
							<i className='bi bi-check-lg'></i>
						</button>
					</>
				)}
			</div>
		</div>
	)
}

const AdminGameDetailPage: NextPage<PageProps> = ({
	isNew,
	game,
	cities = [],
	dms = [],
}) => {
	const {
		register,
		handleSubmit: rhfHandleSubmit,
		reset,
		control,
	} = useForm<FormProps>({
		defaultValues: {
			id: '',
			title: '',
			code: '',
			description: '',
			startAt: '',
			endAt: '',
			worldStartAt: '',
			worldEndAt: '',
			lvMin: 1,
			lvMax: 1,
			capacityMin: 3,
			capacityMax: 6,
			tags: '',
			remark: '',
			status: 'new',
			city: undefined,
			dm: undefined,
			characters: [],
		},
	})
	const _formStatus = useWatch({ control, name: 'status' })

	useEffect(() => {
		console.log(game)
		if (game && reset) {
			reset({
				...game,
				dm: game.dm?.id,
				city: game.city?.id,
				characters: game.characters?.map((character) => character?.id) || [],
				startAt: lightFormat(
					game.startAt ? new Date(game.startAt) : new Date(),
					"yyyy-MM-dd'T'HH:mm"
				),
				endAt: lightFormat(
					game.endAt ? new Date(game.endAt) : new Date(),
					"yyyy-MM-dd'T'HH:mm"
				),
				worldStartAt: game.worldStartAt?.substring(0, 10) || '',
				worldEndAt: game.worldEndAt?.substring(0, 10) || '',
			})
		}
	}, [game, reset])

	const [submitButtonText, flowStepIndex] = useMemo<[string, number]>(() => {
		switch (_formStatus) {
			case 'new':
				return ['儲存', 0]
			case 'draft':
				return ['發佈劇本', 1]
			case 'published':
				return ['確認玩家的報名', 2]
			case 'confirmed':
				return ['跑完團了！', 3]
			case 'completed':
				return ['派發獎勵', 4]
			case 'done':
			case 'closed':
				return ['已鎖定', 5]
		}

		return ['儲存', 0]
	}, [_formStatus])

	const handleSubmit = useCallback((data) => {
		console.log(data)
	}, [])

	return (
		<>
			<form className='form' onSubmit={rhfHandleSubmit(handleSubmit)}>
				<div className='space-y-4'>
					<Breadcrumb>
						<span>DM後台</span>
						<NextLink href='/admin/game' passHref>
							<a>劇本</a>
						</NextLink>
						<span>{game?.title || '新劇本'}</span>
					</Breadcrumb>

					<div className='flex gap-x-4 justify-between items-center'>
						<div className='flex-1'>
							<div className='form-group form-group-transparent'>
								<Input
									type='text'
									placeholder='編號 (選擇日期,城市,GM後會自動填入)'
									{...register('code')}
								/>
							</div>

							<div className='form-group form-group-transparent'>
								<Input
									type='text'
									className='text-xl font-semibold'
									placeholder='未命名的劇本'
									{...register('title')}
								/>
							</div>
						</div>
						<div className='space-x-2'>
							{!isNew && (
								<button
									type='submit'
									className={cns('button button-primary button-outline')}
								>
									儲存
								</button>
							)}
							<button type='submit' className='button button-primary'>
								{submitButtonText}
							</button>
						</div>
					</div>

					<div className='h-px bg-gray-400'></div>

					<div className='grid grid-cols-3 gap-x-4'>
						<div className='col-span-2 space-y-6'>
							<div className='grid grid-cols-2 gap-x-4 gap-y-6'>
								<Input
									type='select'
									label='城市 (店舖)'
									wrapperProps={{ className: 'flex-1' }}
									{...register('city')}
								>
									{cities.map((city) => (
										<option key={city.id} value={city.id}>
											{city.name} ({city.code}) ({city.shopName})
										</option>
									))}
								</Input>
								<Input
									type='select'
									label='DM'
									wrapperProps={{ className: 'flex-1' }}
									{...register('dm')}
								>
									{dms.map((dm) => (
										<option key={dm.id} value={dm.id}>
											{dm.name} ({dm.code})
										</option>
									))}
								</Input>
								<Input
									type='datetime-local'
									label='開始時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('startAt')}
								/>
								<Input
									type='datetime-local'
									label='結束時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('endAt')}
								/>
								<Input
									type='date'
									label='世界觀開始時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('worldStartAt')}
								/>
								<Input
									type='date'
									label='世界觀結束時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('worldEndAt')}
								/>
								<div className='space-x-4'>
									<Input
										label='人數下限'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('capacityMin')}
									/>
									<Input
										label='人數上限'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('capacityMax')}
									/>
								</div>
								<div className='space-x-4'>
									<Input
										label='等級下限'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('lvMin')}
									/>
									<Input
										label='等級上限'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('lvMax')}
									/>
								</div>

								<Input
									type='textarea'
									label='劇本簡介'
									rows={6}
									wrapperProps={{ className: 'col-span-2' }}
									{...register('description')}
								/>
								<Input
									type='textarea'
									label='備註'
									rows={6}
									wrapperProps={{ className: 'col-span-2' }}
									{...register('remark')}
								/>
							</div>

							<div className='h-px bg-gray-400'></div>

							<h4>玩家XP、金錢獎勵、獲得物品</h4>

							<div className='form-group'>
								{flowStepIndex < 4 && (
									<div className='text-center text-gray-400'>
										你要先跑完團才能派發獎勵。
									</div>
								)}
								{flowStepIndex >= 4 && (
									<table className='table-bordered'>
										<thead>
											<tr>
												<th></th>
												<th>獲得XP</th>
												<th>獲得GP</th>
												<th>增減物品/知識/人際關係/稱號...</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th className='w-28 text-right'>隊伍總和</th>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td></td>
											</tr>
											<tr className='align-top'>
												<th className='w-28 text-right pt-5'>卡洛特</th>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td>
													<Input type='textarea' rows={2} />
												</td>
											</tr>
											<tr className='align-top'>
												<th className='w-28 text-right pt-5'>卡洛特</th>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td>
													<Input type='textarea' rows={2} />
												</td>
											</tr>
											<tr className='align-top'>
												<th className='w-28 text-right pt-5'>卡洛特</th>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td className='w-28'>
													<Input type='number' />
												</td>
												<td>
													<Input type='textarea' rows={2} />
												</td>
											</tr>
										</tbody>
									</table>
								)}{' '}
							</div>
						</div>

						<div>
							<div className='space-y-6 sticky top-8'>
								<div className='form-group'>
									<div className='flex gap-x-2 justify-between items-center'>
										<label>報名玩家 (以報名順序排列)</label>
										<a className='text-xs' href='#'>
											隱藏候補玩家
										</a>
									</div>

									<div className='space-y-1'>
										<AdminGameDetailCharacterBox
											title='卡洛特'
											info='Lv.6 戰士'
											playerName='SilWolf'
											isSelected
										/>
										<AdminGameDetailCharacterBox
											title='卡洛特'
											info='Lv.6 戰士'
											playerName='SilWolf'
										/>
										<AdminGameDetailCharacterBox
											title='卡洛特'
											info='Lv.6 戰士'
											playerName='SilWolf'
										/>
									</div>
								</div>

								<Stepper activeStep={flowStepIndex}>
									<div>
										<p className='font-semibold'>劇本草稿</p>
										<p className='text-sm'>
											填寫城市、DM、開始/結束時間、人數、等級、簡介
										</p>
									</div>
									<div>
										<p className='font-semibold'>發佈劇本</p>
										<p className='text-sm'>發佈劇本至城市聊天群中</p>
									</div>
									<div>
										<p className='font-semibold'>等待及確認玩家的報名</p>
										<p className='text-sm'></p>
									</div>
									<div>
										<p className='font-semibold'>跑團！</p>
										<p className='text-sm'></p>
									</div>
									<div>
										<p className='font-semibold'>跑團後續</p>
										<p className='text-sm'>派發獎勵、後記、記錄玩家角色變化</p>
									</div>
								</Stepper>
							</div>
						</div>
					</div>
				</div>
			</form>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	if (params?.id === 'new') {
		return {
			props: {
				isNew: true,
			},
		}
	}

	if (!params?.id) {
		return {
			notFound: true,
		}
	}

	const [game, cities, dms] = await Promise.all([
		api.getGameById(params.id as string),
		api.getCities(),
		api.getDMs(),
	])

	return {
		props: {
			game,
			cities,
			dms,
		},
	}
}

export default AdminGameDetailPage
