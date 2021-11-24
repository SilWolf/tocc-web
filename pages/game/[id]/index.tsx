import { GetServerSideProps, NextPage } from 'next'

import React, { useCallback, useState } from 'react'
import { Controller as RHFController, useForm, useWatch } from 'react-hook-form'
import Select, {
	components as SelectComponents,
	OptionProps as SelectOptionProps,
	PlaceholderProps as SelectPlaceholderProps,
	SingleValueProps as SelectSingleValueProps,
} from 'react-select'

import Alert from 'src/components/Alert'
import { DateSpan } from 'src/components/Datetime'
import { Input } from 'src/components/Form'
import MedievalButton from 'src/components/MedievalButton'
import ReactHTML from 'src/components/ReactHTML'
import apis, { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Character, Game } from 'src/types'
import { GameSignUp } from 'src/types/Game.type'
import { SessionUser } from 'src/types/User.type'

type Props = {
	game: Game
	characters: Character[]
	gameSignUps: GameSignUp[]
}

const CharacterPlaceholder = ({
	children,
	...props
}: SelectPlaceholderProps<Character>) => {
	return (
		<SelectComponents.Placeholder {...props}>
			<div className='flex items-center h-14'>{children}</div>
		</SelectComponents.Placeholder>
	)
}

const CharacterSingleValue = ({
	data: character,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	children,
	...props
}: SelectSingleValueProps<Character>) => {
	return (
		<SelectComponents.SingleValue data={character} {...props}>
			<div className='flex items-center gap-x-2 py-2'>
				<div className='flex-none'>
					<img
						src={character.portraitImage?.formats?.thumbnail?.url}
						alt=''
						className='bg-gray-200 block w-10 h-10'
					/>
				</div>
				<div className='flex-1'>
					<p>
						{character.name} / {character.code}
					</p>
					<p className='leading-4 text-sm text-gray-400 space-x-2'>
						<span>等級{character.level}</span>
						<span>{character.city?.name}</span>
						<span></span>
					</p>
				</div>
			</div>
		</SelectComponents.SingleValue>
	)
}

const CharacterOption = ({
	data: character,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	children,
	...props
}: SelectOptionProps<Character>) => {
	return (
		<SelectComponents.Option data={character} {...props}>
			<div className='flex items-center gap-x-2'>
				<div className='flex-none'>
					<img
						src={character.portraitImage?.formats?.thumbnail?.url}
						alt=''
						className='bg-gray-200 block w-10 h-10'
					/>
				</div>
				<div className='flex-1'>
					<p>
						{character.name} / {character.code}
					</p>
					<p className='text-sm text-gray-400 space-x-2'>
						<span>等級{character.level}</span>
						<span>{character.city?.name}</span>
						<span></span>
					</p>
				</div>
			</div>
		</SelectComponents.Option>
	)
}

const GameDetailPage: NextPage<Props> = ({
	game,
	characters,
	gameSignUps,
}: Props) => {
	const [errorMsg, setErrorMsg] = useState<string>('')
	const {
		register,
		control: rhfControl,
		handleSubmit: rhfHandleSubmit,
	} = useForm({
		defaultValues: {
			character: null,
			remarks: '',
		},
	})
	const selectedCharacter = useWatch({ control: rhfControl, name: 'character' })

	const handleSubmit = useCallback(
		(value) => {
			setErrorMsg('')
			apis
				.postSignUp(game.id, value)
				.then(() => {
					alert('已成功報名。當DM確認你的報名後，就會發出通知。')
				})
				.catch((res) => {
					const data = res.response.data
					if (data.message) {
						switch (data.message.errorCode) {
							case 'NOT_AUTHORIZED':
								setErrorMsg('錯誤: 你未登入。')
								break
							case 'ALREADY_SIGN_UP':
								setErrorMsg('錯誤: 你已經報名過了！')
								break
							case 'GAME_NOT_FOUND':
								setErrorMsg('錯誤: 找不到劇本，有可能它被刪除了。')
								break
							case 'NOT_PUBLISHED':
								setErrorMsg('錯誤: 劇本的報名已經截止。')
								break
							case 'MISSING_CHARACTER':
								setErrorMsg('錯誤: 你必須選擇報名的角色。')
								break
							case 'CHARACTER_NOT_FOUND':
								setErrorMsg('錯誤: 找不到你選擇的角色。')
								break
						}
					}
				})
		},
		[game]
	)

	return (
		<div className='container'>
			<div className='mx-auto' style={{ maxWidth: 800 }}>
				<div className='parchment framed space-y-6 mb-8'>
					<p className='text-right'>
						第三紀元{' '}
						<DateSpan format='yyyy年MM月dd日'>{game.worldStartAt}</DateSpan>
					</p>

					<h1 className='text-center'>{game.title}</h1>

					<p className='text-center italic'>
						<ReactHTML>{game.description}</ReactHTML>
					</p>

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

					<div className='text-center pt-8'>
						<img
							src='/images/divider-1.png'
							alt='divider'
							className='opacity-30 w-1/2 mx-auto'
						/>
					</div>

					{gameSignUps?.length > 0 ? (
						<Alert>你已經報名此劇本</Alert>
					) : (
						<form
							className='w-3/4 mx-auto bg-yellow-800 bg-opacity-20 p-4 space-y-8'
							onSubmit={rhfHandleSubmit(handleSubmit)}
						>
							<div>
								<label className='font-bold'>報名的角色</label>
								<RHFController
									control={rhfControl}
									name='character'
									render={({ field: { onChange, value } }) => (
										<Select
											value={characters.find((c) => c.id === value)}
											onChange={(val) => onChange((val as Character)?.id)}
											options={characters}
											isSearchable={false}
											placeholder='選擇報名角色'
											components={{
												Option: CharacterOption,
												SingleValue: CharacterSingleValue,
												Placeholder: CharacterPlaceholder,
											}}
										></Select>
									)}
								/>
							</div>

							<div>
								<label className='font-bold'>想告訴DM的話</label>
								<Input
									type='textarea'
									rows={4}
									{...register('remarks')}
								></Input>
							</div>

							{errorMsg && <Alert type='danger'>{errorMsg}</Alert>}

							<div className='text-center mx-12'>
								<MedievalButton
									type='submit'
									color='success'
									disabled={!selectedCharacter}
								>
									提交報名
								</MedievalButton>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const id = context.params?.id as string
			if (!id) {
				return {
					notFound: true,
				}
			}

			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const apis = getApis({ jwt: sessionUser?.jwt })

			const game = await apis.getGameById(id)

			if (!game) {
				return {
					notFound: true,
				}
			}

			// const [characters] = await Promise.all([apis.getMyCharacters()])
			const [characters, gameSignUps] = await Promise.all([
				apis.getMyCharacters(),
				apis.getMyGameSignUpsByGameId(game.id),
			])

			return {
				props: {
					game,
					characters,
					gameSignUps,
				}, // will be passed to the page component as props
			}
		}
	)

export default GameDetailPage
