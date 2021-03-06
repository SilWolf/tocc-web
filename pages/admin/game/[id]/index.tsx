import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React, { useCallback, useMemo, useState } from 'react'
import { Controller as RHFController, useForm, useWatch } from 'react-hook-form'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { Character, City, Game, User } from 'types'
import {
	Game_Req,
	GAME_STATUS,
	GameChecklist,
	GameSignUpIdAndStatus,
} from 'types/Game.type'

import apis, { getApis } from 'helpers/api/api.helper'

import Breadcrumb from 'components/Breadcrumb'
import DateRangePicker from 'components/DateRangePicker'
import { DateSpan } from 'components/Datetime'
import DateTimePicker from 'components/DateTimePicker'
import { Input } from 'components/Form'
import Modal from 'components/Modal'

import Alert from 'src/components/Alert'
import {
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser } from 'src/types/User.type'
import AdminGamePatchToCompletedModal from 'src/widgets/AdminGamePatchToCompletedModal'
import AdminGameSignUpModal from 'src/widgets/AdminGameSignUpModal'
import GameOutlineAndRewardTable from 'src/widgets/GameOutlineAndRewardTable'

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
	characters: Character[]
	isNew?: boolean
}

const AdminGameDetailPage: NextPage<PageProps> = ({
	isNew,
	game,
	gameChecklists = [],
	cities = [],
	dms = [],
	characters = [],
}) => {
	const router = useRouter()

	const {
		register,
		handleSubmit: rhfHandleSubmit,
		control,
		formState,
		setValue,
		getValues,
	} = useForm<FormProps>({
		defaultValues: gameToFormProps(game),
	})

	const isReadOnly = useMemo(() => game.status === GAME_STATUS.DONE, [game])

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

	const handleSubmit = useCallback(
		async (value) => {
			const _game = await apis.createOrUpdateGame(formPropsToGameReq(value))

			router.replace(`/admin/game/${_game.id}`, undefined, {
				shallow: false,
			})
			if (isNew) {
				toast.success('??????????????????')
			} else {
				toast.success('??????????????????')
			}
		},
		[isNew, router]
	)

	// const [, flowStepIndex] = useMemo<[string, number]>(() => {
	// 	switch (game.status) {
	// 		case GAME_STATUS.NEW:
	// 			return ['??????', 0]
	// 		case GAME_STATUS.DRAFT:
	// 			return ['????????????', 1]
	// 		case GAME_STATUS.PUBLISHED:
	// 			return ['?????????????????????', 2]
	// 		case GAME_STATUS.CONFIRMED:
	// 			return ['???????????????', 3]
	// 		case GAME_STATUS.COMPLETED:
	// 			return ['????????????', 4]
	// 		case GAME_STATUS.DONE:
	// 		case GAME_STATUS.CLOSED:
	// 			return ['?????????', 5]
	// 	}

	// 	return ['??????', 0]
	// }, [game])

	const [showPublishModal, setShowPublishModal] = useState<boolean>(false)
	const handleClickPublish = useCallback(() => {
		setShowPublishModal(true)
	}, [])
	const handleConfirmPublish = useCallback(() => {
		apis.patchGameToPublishById(game.id).then(() => {
			router.replace(`/admin/game/${game.id}`, undefined, {
				shallow: false,
			})
			toast.success('??????????????????')
			setShowPublishModal(false)
		})
	}, [game, router])

	const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false)
	const gameSignUpsQuery = useQuery(
		['game', game.id, 'signUps'],
		() => apis.getGameSignUpsByGameId(game.id),
		{
			enabled: game.status === GAME_STATUS.PUBLISHED,
		}
	)

	const handleClickSignUp = useCallback(() => {
		setShowSignUpModal(true)
	}, [])
	const handleOkSignUpModal = useCallback(
		(gameSignUps: GameSignUpIdAndStatus[]) => {
			apis.patchGameToConfirmedById(game.id, gameSignUps).then(() => {
				setShowSignUpModal(false)
				toast.success('???????????????????????????????????????')
				router.replace(`/admin/game/${game.id}`, undefined, {
					shallow: false,
				})
			})
		},
		[game.id, router]
	)

	const [showPatchToCompletedModal, setShowPatchToCompletedModal] =
		useState<boolean>(false)
	const handleClickPatchToCompleted = useCallback(() => {
		setShowPatchToCompletedModal(true)
	}, [])
	const handleOkPatchToCompletedModal = useCallback(async () => {
		await apis.createOrUpdateGame(formPropsToGameReq(getValues()))
		await apis.patchGameToCompletedById(game.id).then(() => {
			setShowPatchToCompletedModal(false)
			toast.success('??????????????????????????????????????????')
			router.replace(`/admin/game/${game.id}`, undefined, {
				shallow: false,
			})
		})
	}, [game.id, getValues, router])

	const handleChangeOutline = useCallback(
		(value) => {
			setValue('outline', value)
		},
		[setValue]
	)

	const handleChangeOutlineRewardCharacterMap = useCallback(
		(value) => {
			setValue('outlineRewardCharacterMap', value)
		},
		[setValue]
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
					<span>DM??????</span>
					<NextLink href='/admin/game' passHref>
						<a>??????</a>
					</NextLink>
					<span>{isNew ? '?????????' : `[${game.code}] ${game.title}`}</span>
				</Breadcrumb>

				{game.status === GAME_STATUS.DONE && (
					<Alert className='my-4'>
						<h5>????????????</h5>
						<p>?????????????????????????????????????????????</p>
					</Alert>
				)}

				<div className='flex gap-x-4 justify-between items-center sticky left-0 right-0 top-0 py-4 bg-gray-50 z-50 shadow'>
					<div className='flex-1'>
						<div className='form-group form-group-transparent'>
							<Input
								type='hidden'
								{...register('computedCode')}
								readOnly={isReadOnly}
								disabled={isReadOnly}
							/>
							<Input
								type='text'
								label='????????????'
								labelProps={{
									className: 'hidden',
								}}
								placeholder={computedCode}
								{...register('code')}
								error={formState.errors['code']}
								readOnly={isReadOnly}
								disabled={isReadOnly}
							/>
						</div>

						<div className='form-group form-group-transparent'>
							<Input
								type='text'
								label='????????????'
								labelProps={{
									className: 'hidden',
								}}
								className='text-xl font-semibold'
								placeholder='??????????????????'
								{...register('title', { required: true })}
								error={formState.errors['title']}
								readOnly={isReadOnly}
								disabled={isReadOnly}
							/>
						</div>
					</div>
					{game.publishedAt && (
						<div>
							<p className='text-green-700 text-sm text-right'>
								????????????{' '}
								<DateSpan format='yyyy???MM???dd??? HH:mm:ss'>
									{game.publishedAt}
								</DateSpan>{' '}
								??????
							</p>
							<p className='text-right text-xs'>
								<span>????????????</span>
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
								????????????
							</button>
						)}
						{game.status === GAME_STATUS.PUBLISHED && (
							<button
								type='button'
								className={classNames('button button-primary button-outline')}
								onClick={handleClickSignUp}
							>
								?????????????????????
							</button>
						)}
						{game.status === GAME_STATUS.CONFIRMED && (
							<button
								type='button'
								className={classNames('button button-primary button-outline')}
								onClick={handleClickPatchToCompleted}
							>
								???????????????????????????
							</button>
						)}
						{game.status !== GAME_STATUS.DONE && (
							<button type='submit' className='button button-primary'>
								??????
							</button>
						)}
					</div>
				</div>

				<div className='mt-4 space-y-4'>
					<div className='flex items-start gap-x-4'>
						<div className='flex-1 space-y-6'>
							<div className='grid grid-cols-2 gap-x-6 gap-y-6'>
								<Input
									type='select'
									label='?????? (??????)'
									wrapperProps={{ className: 'flex-1' }}
									{...register('city', { required: true })}
									error={formState.errors['city']}
									readOnly={isReadOnly}
									disabled={isReadOnly}
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
									readOnly={isReadOnly}
									disabled={isReadOnly}
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
											<div className='form-group-label'>????????????</div>

											<RHFController
												name='startAt'
												control={control}
												rules={{ required: true }}
												render={({ field }) => (
													<DateTimePicker
														dateFormat='yyyy???MM???dd??? hh:mm a'
														{...field}
														readOnly={isReadOnly}
														disabled={isReadOnly}
													/>
												)}
											/>
										</div>
									</div>
									<Input
										type='select'
										label='??????'
										wrapperProps={{ className: 'flex-1' }}
										{...register('timeLengthInMin', {
											valueAsNumber: true,
											required: true,
										})}
										error={formState.errors['timeLengthInMin']}
										readOnly={isReadOnly}
										disabled={isReadOnly}
									>
										<option value={120}>2??????</option>
										<option value={150}>2.5??????</option>
										<option value={180}>3??????</option>
										<option value={210}>3.5??????</option>
										<option value={240}>4??????</option>
										<option value={270}>4.5??????</option>
										<option value={300}>5??????</option>
										<option value={330}>5.5??????</option>
										<option value={360}>6??????</option>
									</Input>
								</div>

								<div className='form-group'>
									<div className='form-group-label'>???????????????(????????????)</div>

									<RHFController
										name='worldDateRange'
										control={control}
										rules={{ required: true }}
										render={({ field: { onChange, value } }) => (
											<DateRangePicker
												dateFormat='yyyy???MM???dd???'
												onChange={onChange}
												value={value}
												readOnly={isReadOnly}
												disabled={isReadOnly}
											/>
										)}
									/>
								</div>

								<div className='space-x-4'>
									<Input
										label='????????????'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('capacityMin')}
										readOnly={isReadOnly}
										disabled={isReadOnly}
									/>
									<Input
										label='????????????'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('capacityMax')}
										readOnly={isReadOnly}
										disabled={isReadOnly}
									/>
								</div>
								<div className='space-x-4'>
									<Input
										label='????????????'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('lvMin')}
										readOnly={isReadOnly}
										disabled={isReadOnly}
									/>
									<Input
										label='????????????'
										type='number'
										wrapperProps={{ className: 'w-24 inline-block' }}
										{...register('lvMax')}
										readOnly={isReadOnly}
										disabled={isReadOnly}
									/>
								</div>

								<div>
									<div className='form-group'>
										<div className='form-group-label'>????????????</div>

										<RHFController
											name='description'
											control={control}
											render={({ field: { onChange, value } }) => (
												<RichTextEditor
													onChange={onChange}
													value={value}
													readOnly={isReadOnly}
												/>
											)}
										/>
									</div>
								</div>

								<div>
									<div className='form-group'>
										<div className='form-group-label'>DM????????????</div>

										<RHFController
											name='remark'
											control={control}
											render={({ field: { onChange, value } }) => (
												<RichTextEditor
													onChange={onChange}
													value={value}
													readOnly={isReadOnly}
												/>
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
									<p className='font-semibold'>????????????</p>
									<p className='text-sm'>
										???????????????DM?????????/??????????????????????????????????????????????????????
									</p>
								</div>
								<div>
									<p className='font-semibold'>????????????</p>
									<p className='text-sm'>?????????????????????????????????</p>
								</div>
								<div>
									<p className='font-semibold'>??????????????????????????????</p>
									<p className='text-sm'></p>
								</div>
								<div>
									<p className='font-semibold'>?????????</p>
									<p className='text-sm'></p>
								</div>
								<div>
									<p className='font-semibold'>????????????</p>
									<p className='text-sm'>????????????????????????????????????????????????</p>
								</div>
							</Stepper> */}
						</div>
					</div>
				</div>
			</form>

			<div>
				<h4>?????????????????????</h4>

				<p>
					????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
				</p>
				<GameOutlineAndRewardTable
					outline={game.outline || []}
					characters={characters}
					outlineRewardCharacterMap={game.outlineRewardCharacterMap || {}}
					onChangeOutline={handleChangeOutline}
					onChangeOutlineRewardCharacterMap={
						handleChangeOutlineRewardCharacterMap
					}
					isReadOnly={isReadOnly}
				/>
			</div>

			<Modal open={showPublishModal}>
				<div className='space-y-4'>
					<p>??????????????????????????????????????????????????????????????????</p>
					<div className='parchment framed space-y-6 mb-8'>
						<p className='text-right'>
							????????????{' '}
							<DateSpan format='yyyy???MM???dd???'>{game.worldStartAt}</DateSpan>
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
								<p className='text-sm font-light text-gray-500'>????????????</p>
							</div>

							<div className='flex-none'>
								<p className='text-2xl'>
									{game.city?.name || ''} ({game.city?.code || ''})
								</p>
								<p className='text-sm font-light text-gray-500'>??????</p>
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
								<p className='text-sm font-light text-gray-500'>????????????</p>
							</div>

							<div className='flex-none'>
								<p className='text-2xl'>
									{game.capacityMin}-{game.capacityMax}???
								</p>
								<p className='text-sm font-light text-gray-500'>??????</p>
							</div>
						</div>
					</div>
					<p>
						?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
					</p>
					<div className='grid grid-cols-3 gap-x-4'>
						<div>??????Telegram????????????</div>
						<div>??????Email??????</div>
						<div>???Google Calendar???????????????</div>
					</div>
					<p className='text-center'>???????????????????????????</p>
					<div className='text-center'>
						<button type='button' onClick={handleConfirmPublish}>
							????????????
						</button>
					</div>
				</div>
			</Modal>

			{game.status === GAME_STATUS.PUBLISHED && (
				<AdminGameSignUpModal
					open={showSignUpModal}
					game={game}
					gameSignUps={gameSignUpsQuery.data || []}
					onOk={handleOkSignUpModal}
					onCancel={() => {
						setShowSignUpModal(false)
					}}
					className='mx-auto max-w-screen-laptop w-full'
				/>
			)}

			{game.status === GAME_STATUS.CONFIRMED && (
				<AdminGamePatchToCompletedModal
					open={showPatchToCompletedModal}
					outline={getValues('outline') || []}
					outlineRewardCharacterMap={
						getValues('outlineRewardCharacterMap') || {}
					}
					characters={characters}
					onOk={handleOkPatchToCompletedModal}
					onCancel={() => {
						setShowPatchToCompletedModal(false)
					}}
					className='mx-auto max-w-screen-laptop w-full'
				/>
			)}
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

		const [gameChecklists, cities, dms, characters] = await Promise.all([
			apis.getGameChecklistsById(game.id),
			apis.getCities(),
			apis.getDMs(),
			apis.getGameCharactersById(game.id),
		])

		return {
			props: {
				game,
				gameChecklists,
				cities,
				dms,
				characters,
			},
		}
	})
)

export default AdminGameDetailPage
