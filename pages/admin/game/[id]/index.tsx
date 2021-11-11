import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { useCallback, useMemo, useState } from 'react'
import {
	Controller as RHFController,
	useFieldArray,
	useForm,
	useWatch,
} from 'react-hook-form'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { City, Game, User } from 'types'
import { Game_Req, GAME_STATUS, GameChecklist } from 'types/Game.type'

import apis, { getApis } from 'helpers/api/api.helper'

import Breadcrumb from 'components/Breadcrumb'
import DateRangePicker from 'components/DateRangePicker'
import { DateSpan } from 'components/Datetime'
import DateTimePicker from 'components/DateTimePicker'
import { Input } from 'components/Form'
import Modal from 'components/Modal'
import Stepper from 'components/Stepper'

import {
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

import classNames from 'classnames'

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
		status: game.status === GAME_STATUS.NEW ? GAME_STATUS.DRAFT : game.status,
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
	gameChecklists?: GameChecklist[]
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
			className={classNames(
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
	gameChecklists = [],
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
	} = useForm<FormProps>({
		defaultValues: gameToFormProps(game),
	})

	const gameOutlineArray = useFieldArray({
		control: control,
		name: 'outline',
	})
	const watchedOutline = useWatch({
		control: control,
		name: 'outline',
	})
	const [outlineTotalXpEach, outlineTotalGpEach, outlineTotalMiGp] =
		useMemo(() => {
			return (watchedOutline || []).reduce<[number, number, number]>(
				(prev, curr) => {
					prev[0] += curr.xpEach
					prev[1] += curr.gpEach
					prev[2] += curr.miGp
					return prev
				},
				[0, 0, 0]
			)
		}, [watchedOutline])

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

	const [, flowStepIndex] = useMemo<[string, number]>(() => {
		switch (game.status) {
			case GAME_STATUS.NEW:
				return ['儲存', 0]
			case GAME_STATUS.DRAFT:
				return ['發佈劇本', 1]
			case GAME_STATUS.PUBLISHED:
				return ['確認玩家的報名', 2]
			case GAME_STATUS.CONFIRMED:
				return ['跑完團了！', 3]
			case GAME_STATUS.COMPLETED:
				return ['派發獎勵', 4]
			case GAME_STATUS.DONE:
			case GAME_STATUS.CLOSED:
				return ['已鎖定', 5]
		}

		return ['儲存', 0]
	}, [game])

	const [showPublishModal, setShowPublishModal] = useState<boolean>(false)
	const handleClickPublish = useCallback(() => {
		setShowPublishModal(true)
	}, [])
	const handleConfirmPublish = useCallback(() => {
		apis.patchGameToPublishById(game.id).then(() => {
			router.replace(`/admin/game/${game.id}`, undefined, {
				shallow: false,
			})
			toast.success('成功發佈劇本')
			setShowPublishModal(false)
		})
	}, [game, router])

	const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
	const handleClickSignUp = useCallback(() => {
		setShowSignUpModal(true)
	}, [])
	const handleConfirmSignUp = useCallback(() => {
		setShowSignUpModal(false)
	}, [])
	const signUpsQuery = useQuery(
		['game', game.id, 'signUps'],
		() => apis.getGameSignUpsByGameId(game.id),
		{
			enabled: game.status === GAME_STATUS.PUBLISHED,
		}
	)

	const handleSubmit = useCallback(
		(value) => {
			apis.createOrUpdateGame(formPropsToGameReq(value)).then((_game) => {
				router.replace(`/admin/game/${_game.id}`, undefined, {
					shallow: false,
				})
				if (isNew) {
					toast.success('成功新增劇本')
				} else {
					toast.success('成功更新劇本')
				}
			})
		},
		[isNew, router]
	)

	const handleClickOutlineAppend = useCallback(() => {
		gameOutlineArray.append({
			description: '',
			mi: '',
			miGp: 0,
			xpEach: 0,
			gpEach: 0,
		})
	}, [gameOutlineArray])

	const handleClickOutlineRemove = useCallback(
		(index: number) => () => {
			gameOutlineArray.remove(index)
		},
		[gameOutlineArray]
	)

	const handleClickOutlineMove = useCallback(
		(index: number, direction: -1 | 1) => () => {
			gameOutlineArray.move(index, index + direction)
		},
		[gameOutlineArray]
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

				<Breadcrumb>
					<span>DM後台</span>
					<NextLink href='/admin/game' passHref>
						<a>劇本</a>
					</NextLink>
					<span>{isNew ? '新劇本' : `[${game.code}] ${game.title}`}</span>
				</Breadcrumb>

				<div className='flex gap-x-4 justify-between items-center sticky left-0 right-0 top-0 py-4 bg-gray-50 z-50 shadow'>
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
					{game.publishedAt && (
						<div>
							<p className='text-green-700 text-sm text-right'>
								劇本已於{' '}
								<DateSpan format='yyyy年MM月dd日 HH:mm:ss'>
									{game.publishedAt}
								</DateSpan>{' '}
								發佈
							</p>
							<p className='text-right text-xs'>
								<span>取消發佈</span>
							</p>
						</div>
					)}
					<div className='space-x-2'>
						{game.status === GAME_STATUS.DRAFT && (
							<button
								type='button'
								className={classNames('button button-primary button-outline')}
								onClick={handleClickPublish}
							>
								發佈劇本
							</button>
						)}
						{game.status === GAME_STATUS.PUBLISHED && (
							<button
								type='button'
								className={classNames('button button-primary button-outline')}
								onClick={handleClickSignUp}
							>
								確認報名及截止
							</button>
						)}
						<button type='submit' className='button button-primary'>
							儲存
						</button>
					</div>
				</div>

				<div className='mt-4 space-y-4'>
					<div className='flex items-start gap-x-4'>
						<div className='flex-1 space-y-6'>
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
										<option value={120}>2小時</option>
										<option value={150}>2.5小時</option>
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

								<div>
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

								<div>
									<div className='form-group'>
										<div className='form-group-label'>DM內部備註</div>

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
						</div>

						<div className='w-64'>
							{gameChecklists.map((gameChecklist) => (
								<div key={gameChecklist.id}>
									<div className='flex gap-x-2 items-center pl-1 border-b border-gray-200 mb-1'>
										<div className='flex-none text-2xl'>
											<i className='bi bi-list-check'></i>
										</div>
										<div className='flex-1'>
											<h4>{gameChecklist.name}</h4>
										</div>
									</div>
									<div className='space-y-1'>
										{gameChecklist.checkItems.map((checkItem) => (
											<div
												key={checkItem.id}
												className={classNames(
													'flex items-center gap-x-3 px-2 py-2 rounded',
													checkItem.state === 'complete'
														? 'text-green-600 line-through opacity-40'
														: 'bg-gray-200'
												)}
											>
												<div className='flex-none'>
													<i
														className={classNames(
															'bi',
															checkItem.state === 'complete'
																? 'bi-check'
																: 'bi-exclamation'
														)}
													></i>
												</div>
												<div className='flex-1'>{checkItem.name}</div>
											</div>
										))}
									</div>
								</div>
							))}
							{/* <Stepper activeStep={flowStepIndex}>
								<div>
									<p className='font-semibold'>劇本草稿</p>
									<p className='text-sm'>
										填寫城市、DM、開始/結束時間、人數、等級、簡介、劇本大綱
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
							</Stepper> */}
						</div>
					</div>

					<div>
						<h4>劇本大綱</h4>

						<p>
							劇本大綱會作為派發獎勵的依據，在劇本結束後會向玩家方公開。
							<br />
							每個項目均可設定相應的獎勵(XP, GP, MI)，可作為獎勵派發的依據。
						</p>

						<table className='table-bordered'>
							<thead>
								<tr>
									<th className='w-6'></th>
									<th className='w-6'></th>
									<th>劇本情節</th>
									<th className='w-72'>MI/情報/其他</th>
									<th className='w-32'>MI/情報/其他總值 (GP)</th>
									<th className='w-32'>人均GP</th>
									<th className='w-32'>人均XP</th>
								</tr>
							</thead>
							<tbody>
								{gameOutlineArray.fields.map((field, index) => (
									<tr key={field.id}>
										<td className='w-8'>
											<div>
												<button
													type='button'
													onClick={handleClickOutlineRemove(index)}
												>
													x
												</button>
											</div>
										</td>
										<td className='w-8'>
											<div>
												<button
													type='button'
													onClick={handleClickOutlineMove(index, -1)}
													disabled={index === 0}
												>
													up
												</button>
											</div>
											<div>
												<button
													type='button'
													onClick={handleClickOutlineMove(index, 1)}
													disabled={
														index === gameOutlineArray.fields.length - 1
													}
												>
													down
												</button>
											</div>
										</td>
										<td>
											<Input
												type='text'
												{...register(`outline.${index}.description`, {
													required: true,
												})}
												placeholder='例: 與委託人見面得到起始資金 / 困難戰鬥:獸人+戰狼 / 發現了寶庫 / 完成任務'
											/>
										</td>
										<td>
											<Input type='text' {...register(`outline.${index}.mi`)} />
										</td>
										<td>
											<Input
												type='number'
												{...register(`outline.${index}.miGp`, {
													valueAsNumber: true,
												})}
											/>
										</td>
										<td>
											<Input
												type='number'
												{...register(`outline.${index}.gpEach`, {
													valueAsNumber: true,
												})}
											/>
										</td>
										<td>
											<Input
												type='number'
												{...register(`outline.${index}.xpEach`, {
													valueAsNumber: true,
												})}
											/>
										</td>
									</tr>
								))}
							</tbody>
							<tfoot>
								<th colSpan={2}>
									<button type='button' onClick={handleClickOutlineAppend}>
										新增一行
									</button>
								</th>
								<th colSpan={2}></th>
								<th>MI總{outlineTotalMiGp}GP</th>
								<th>人均{outlineTotalGpEach}GP</th>
								<th>+人均{outlineTotalXpEach}XP</th>
							</tfoot>
						</table>

						<div></div>
					</div>
				</div>
			</form>

			<Modal open={showPublishModal}>
				<div className='space-y-4'>
					<p>你即將發佈劇本，請再次確認劇本內容是否正確。</p>
					<div className='parchment framed space-y-6 mb-8'>
						<p className='text-right'>
							第三紀元{' '}
							<DateSpan format='yyyy年MM月dd日'>{game.worldStartAt}</DateSpan>
						</p>

						<h1 className='text-center'>{game.title}</h1>

						<p className='text-center italic'>{game.description}</p>

						<div className='text-center pt-8 pb-8'>
							<img
								src='/images/divider-1.png'
								alt='divider'
								className='opacity-30 w-1/2 mx-auto'
							/>
						</div>

						<div className='flex justify-center gap-12'>
							<div className='flex-none'>
								<p className='text-2xl'>
									<DateSpan format='yyyy/MM/dd HH:mm'>{game.startAt}</DateSpan>
								</p>
								<p className='text-sm font-light text-gray-500'>時間日期</p>
							</div>

							<div className='flex-none'>
								<p className='text-2xl'>
									{game.city?.name || ''} ({game.city?.code || ''})
								</p>
								<p className='text-sm font-light text-gray-500'>場地</p>
							</div>
						</div>

						<div className='flex justify-center gap-12'>
							<div className='flex-none'>
								<p className='text-2xl'>{game.dm?.name || ''}</p>
								<p className='text-sm font-light text-gray-500'>DM</p>
							</div>

							<div className='flex-none'>
								<p className='text-2xl'>
									Lv. {game.lvMin}-{game.lvMax}
								</p>
								<p className='text-sm font-light text-gray-500'>等級範圍</p>
							</div>

							<div className='flex-none'>
								<p className='text-2xl'>
									{game.capacityMin}-{game.capacityMax}人
								</p>
								<p className='text-sm font-light text-gray-500'>人數</p>
							</div>
						</div>
					</div>
					<p>
						在發佈後，系統會向玩家們發出公告及報名連結。你可取消勾選不想發佈的途徑，也可在之後再手動公告。
					</p>
					<div className='grid grid-cols-3 gap-x-4'>
						<div>發送Telegram群組公告</div>
						<div>發送Email公告</div>
						<div>在Google Calendar上發佈活動</div>
					</div>
					<p className='text-center'>我確認劇本內容無誤</p>
					<div className='text-center'>
						<button type='button' onClick={handleConfirmPublish}>
							發佈劇本
						</button>
					</div>
				</div>
			</Modal>

			<Modal open={showSignUpModal}>
				<div className='space-y-4'>
					<p>
						你即將選定玩家，及截止報名。
						<br />
						以下玩家以報名順序排列，請打勾選上的玩家，並按確認。
					</p>
					<p>
						選上的玩家會收到報名被確認的通知，其餘玩家則會收到劇本名額已滿而報名失敗的通知。
					</p>

					<div className='grid grid-cols-4'>
						{signUpsQuery.data?.map((gameSignUp) => {
							const { character, player } = gameSignUp
							return (
								<div
									key={gameSignUp.id}
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
											<a
												href={`/admin/character/${character._id}`}
												target='_blank'
												rel='noreferrer'
											>
												{character.code} {character.name}
											</a>
										</p>
										<p className='text-xs leading-3 opacity-80'>
											<a
												href={`/admin/player/${character._id}`}
												target='_blank'
												rel='noreferrer'
											>
												{player.code} {player.name}
											</a>
										</p>
									</div>
								</div>
							)
						})}
					</div>

					<p className='text-center'>我確認玩家名單無誤</p>
					<div className='text-center'>
						<button type='button' onClick={handleConfirmSignUp}>
							確認報名及截止
						</button>
					</div>
				</div>
			</Modal>
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
		const [gameChecklists, cities, dms] = await Promise.all([
			apis.getGameChecklistsById(game.id),
			apis.getCities(),
			apis.getDMs(),
		])

		return {
			props: {
				game,
				gameChecklists,
				cities,
				dms,
			},
		}
	})
)

export default AdminGameDetailPage
