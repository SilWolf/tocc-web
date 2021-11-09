import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { useCallback, useMemo } from 'react'
import { Controller as RHFController, useForm, useWatch } from 'react-hook-form'

import { City, Game, User } from 'types'
import { Game_Req } from 'types/Game.type'

import apis, { getApis } from 'helpers/api/api.helper'

import Breadcrumb from 'components/Breadcrumb'
import DateRangePicker from 'components/DateRangePicker'
import DateTimePicker from 'components/DateTimePicker'
import { Input } from 'components/Form'
import Stepper from 'components/Stepper'

import {
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser } from 'src/types/User.type'

import cns from 'classnames'

const RichTextEditor = dynamic(
	() => import('../../../../src/components/RichTextEditor'),
	{
		ssr: false,
	}
)

type FormProps = Omit<Game_Req, 'endAt' | 'worldStartAt' | 'worldEndAt'> & {
	worldDateRange: [string | null, string | null]
	computedCode: string
}

const gameToFormProps = (game: Game): FormProps => {
	return {
		...game,
		city: game.city?.id,
		dm: game.dm?.id,
		worldDateRange: [game.worldStartAt || null, game.worldEndAt || null],
		characters: [],
		computedCode: '',
	}
}

const formPropsToGameReq = (game: FormProps): Game_Req => {
	const result: Game_Req = {
		...game,
		worldStartAt: game.worldDateRange[0],
		worldEndAt: game.worldDateRange[1],
		code: game.code || game.computedCode,
		status: game.status === 'new' ? 'draft' : game.status,
	}

	if (game.startAt && game.timeLengthInMin) {
		const endAt = new Date(game.startAt)
		endAt.setMinutes(endAt.getMinutes() + game.timeLengthInMin)
		result.endAt = endAt.toISOString()
	}

	return result
}

type PageProps = {
	game: Game
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
	const router = useRouter()
	const {
		register,
		handleSubmit: rhfHandleSubmit,
		control,
		formState,
		setValue,
		reset: rhfReset,
	} = useForm<FormProps>({
		defaultValues: gameToFormProps(game),
	})
	const _formStatus = useWatch({ control, name: 'status' })

	const preGenerateCodeWatch = useWatch({
		control,
		name: ['city', 'dm', 'startAt'],
	})
	const computedCode = useMemo(() => {
		const [_cityId, _dmId, _startAt] = preGenerateCodeWatch
		if (_cityId && _dmId && _startAt) {
			const [_city, _dm] = [
				cities.find((item) => item.id === preGenerateCodeWatch[0]),
				dms.find((item) => item.id === preGenerateCodeWatch[1]),
			]
			const weekCount = Math.floor(
				(new Date(_startAt).getTime() - new Date('2020-02-16').getTime()) /
					(7 * 24 * 60 * 60 * 1000)
			)

			const code = `${_city?.code || 'XX'}-${weekCount
				.toString()
				.padStart(4, '0')}${_dm?.code || 'X'}`
			setValue('computedCode', code)

			return code
		}
	}, [cities, dms, preGenerateCodeWatch, setValue])

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

	const handleSubmit = useCallback(
		(value) => {
			console.log(value)
			apis.createOrUpdateGame(formPropsToGameReq(value)).then((newGame) => {
				if (!value.id) {
					router.replace(`/admin/game/${newGame.id}`, undefined, {
						shallow: false,
					})
					rhfReset(gameToFormProps(newGame))
				} else {
					alert('成功更新')
				}
			})
		},
		[router, rhfReset]
	)

	return (
		<>
			<form className='form' onSubmit={rhfHandleSubmit(handleSubmit)}>
				<Input
					type='hidden'
					{...register('id')}
					error={formState.errors['id']}
				/>
				<Input
					type='hidden'
					{...register('status')}
					error={formState.errors['status']}
				/>

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
								<Input type='hidden' {...register('computedCode')} />
								<Input
									type='text'
									label='劇本編號'
									labelProps={{
										className: 'hidden',
									}}
									placeholder={computedCode}
									{...register('code')}
									error={formState.errors['code']}
								/>
							</div>

							<div className='form-group form-group-transparent'>
								<Input
									type='text'
									label='劇本標題'
									labelProps={{
										className: 'hidden',
									}}
									className='text-xl font-semibold'
									placeholder='未命名的劇本'
									{...register('title', { required: true })}
									error={formState.errors['title']}
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
							<div className='grid grid-cols-2 gap-x-6 gap-y-6'>
								<Input
									type='select'
									label='城市 (店舖)'
									wrapperProps={{ className: 'flex-1' }}
									{...register('city', { required: true })}
									error={formState.errors['city']}
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
									{...register('dm', { required: true })}
									error={formState.errors['dm']}
								>
									{dms.map((dm) => (
										<option key={dm.id} value={dm.id}>
											{dm.name} ({dm.code})
										</option>
									))}
								</Input>

								<div className='grid grid-cols-3 gap-x-2'>
									<div className='col-span-2'>
										<div className='form-group'>
											<div className='form-group-label'>劇本時間</div>

											<RHFController
												name='startAt'
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<DateTimePicker
														dateFormat='yyyy年MM月dd日 hh:mm a'
														{...field}
													/>
												)}
											/>
										</div>
									</div>
									<Input
										type='select'
										label='時長'
										wrapperProps={{ className: 'flex-1' }}
										{...register('timeLengthInMin', {
											valueAsNumber: true,
											required: true,
										})}
										error={formState.errors['timeLengthInMin']}
									>
										<option value={180}>3小時</option>
										<option value={210}>3.5小時</option>
										<option value={240}>4小時</option>
										<option value={270}>4.5小時</option>
										<option value={300}>5小時</option>
										<option value={330}>5.5小時</option>
										<option value={360}>6小時</option>
									</Input>
								</div>

								<div className='form-group'>
									<div className='form-group-label'>世界觀時間(第三紀元)</div>

									<RHFController
										name='worldDateRange'
										control={control}
										rules={{ required: true }}
										render={({ field: { onChange, value } }) => (
											<DateRangePicker
												dateFormat='yyyy年MM月dd日'
												onChange={onChange}
												value={value}
											/>
										)}
									/>
								</div>

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

								<div className='col-span-2'>
									<div className='form-group'>
										<div className='form-group-label'>劇本簡介</div>

										<RHFController
											name='description'
											control={control}
											render={({ field: { onChange, value } }) => (
												<RichTextEditor onChange={onChange} value={value} />
											)}
										/>
									</div>
								</div>

								<div className='col-span-2'>
									<div className='form-group'>
										<div className='form-group-label'>備註</div>

										<RHFController
											name='remark'
											control={control}
											render={({ field: { onChange, value } }) => (
												<RichTextEditor onChange={onChange} value={value} />
											)}
										/>
									</div>
								</div>
							</div>

							<div className='h-px bg-gray-400'></div>

							<h4>玩家XP、金錢獎勵、獲得物品</h4>

							<div className='form-group'>
								{flowStepIndex < 4 && (
									<div className='text-center text-gray-400 mt-4 mb-16'>
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
		const [cities, dms] = await Promise.all([apis.getCities(), apis.getDMs()])

		return {
			props: {
				game,
				cities,
				dms,
			},
		}
	})
)

export default AdminGameDetailPage
