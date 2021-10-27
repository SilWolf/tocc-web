import { GetServerSideProps, NextPage } from 'next'

import React, { useCallback } from 'react'
import { Controller as RHFController, useForm } from 'react-hook-form'
import Select, {
	components as SelectComponents,
	OptionProps as SelectOptionProps,
	PlaceholderProps as SelectPlaceholderProps,
	SingleValueProps as SelectSingleValueProps,
} from 'react-select'

import { DateSpan } from 'src/components/Datetime'
import { Input } from 'src/components/Form'
import MedievalButton from 'src/components/MedievalButton'
import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Character, Game } from 'src/types'
import { SessionUser } from 'src/types/User.type'

type Props = {
	game: Game
	characters: Character[]
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
					<p>{character.name}</p>
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

const GameDetailPage: NextPage<Props> = ({ game, characters }: Props) => {
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

	const handleSubmit = useCallback((value) => {
		console.log(value)
	}, [])

	return (
		<div className='container py-24'>
			<div className='mx-auto' style={{ maxWidth: 800 }}>
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

					<div className='text-center pt-8'>
						<img
							src='/images/divider-1.png'
							alt='divider'
							className='opacity-30 w-1/2 mx-auto'
						/>
					</div>

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
							<Input type='textarea' rows={4} {...register('remarks')}></Input>
						</div>

						<div className='text-center mx-12'>
							<MedievalButton type='submit' color='success'>
								提交報名
							</MedievalButton>
						</div>
					</form>
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
			const [characters] = await Promise.all([
				Promise.resolve([
					{
						level: 0,
						xp: 0,
						gp: 0,
						clses: [],
						_id: '6013c2f3ae992d5eaef29c4a',
						name: '卡洛特',
						code: 'D-GO01',
						createdAt: '2021-01-29T08:10:27.264Z',
						updatedAt: '2021-01-29T08:12:34.463Z',
						__v: 0,
						created_by: {
							isActive: true,
							blocked: false,
							_id: '600f9aee8e4062d494e12a2f',
							username: null,
							registrationToken: null,
							firstname: 'SilWolf',
							lastname: 'Karlott',
							email: 'silwolf1121@gmail.com',
							__v: 0,
							preferedLanguage: 'zh',
							id: '600f9aee8e4062d494e12a2f',
						},
						updated_by: {
							isActive: true,
							blocked: false,
							_id: '600f9aee8e4062d494e12a2f',
							username: null,
							registrationToken: null,
							firstname: 'SilWolf',
							lastname: 'Karlott',
							email: 'silwolf1121@gmail.com',
							__v: 0,
							preferedLanguage: 'zh',
							id: '600f9aee8e4062d494e12a2f',
						},
						city: {
							level: 1,
							prosperity: 0,
							prosperityMax: 0,
							_id: '60110336fffd3f23a0fd5275',
							name: '鍚安城',
							shopName: '開棋 Games On',
							shopAddress: '油麻地彌敦道566號 橋建大廈11樓566室 香港香港',
							code: 'GO',
							shopAbbr: 'GO',
							createdAt: '2021-01-27T06:07:50.149Z',
							updatedAt: '2021-10-21T09:23:49.730Z',
							__v: 0,
							created_by: '600f9aee8e4062d494e12a2f',
							updated_by: '600f9aee8e4062d494e12a2f',
							telegramChatId: '-499164852',
							id: '60110336fffd3f23a0fd5275',
						},
						player: {
							confirmed: true,
							blocked: false,
							isPlayer: false,
							_id: '60110107222e8513969913c9',
							username: 'Dicky',
							email: 'dicky@tocc.com',
							provider: 'local',
							createdAt: '2021-01-27T05:58:31.362Z',
							updatedAt: '2021-10-20T09:21:07.723Z',
							__v: 0,
							created_by: '600f9aee8e4062d494e12a2f',
							role: '600f9dda01d354d4d17f1abc',
							updated_by: '600f9aee8e4062d494e12a2f',
							portraitImage: {
								_id: '601106c36a6b2d246c163722',
								name: '螢幕截圖 2020-06-22 下午1.58.05.png',
								alternativeText: '',
								caption: '',
								hash: '2020_06_22_1_58_05_589ca94c04',
								ext: '.png',
								mime: 'image/png',
								size: 47.42,
								width: 300,
								height: 302,
								url: 'http://localhost:4566/tocc-cms-strapi-bucket/2020_06_22_1_58_05_589ca94c04.png',
								formats: {
									thumbnail: {
										name: 'thumbnail_螢幕截圖 2020-06-22 下午1.58.05.png',
										hash: 'thumbnail_2020_06_22_1_58_05_589ca94c04',
										ext: '.png',
										mime: 'image/png',
										width: 155,
										height: 156,
										size: 49.81,
										path: null,
										url: 'http://localhost:4566/tocc-cms-strapi-bucket/thumbnail_2020_06_22_1_58_05_589ca94c04.png',
									},
								},
								provider: 's3-plus',
								related: ['60110107222e8513969913c9'],
								createdAt: '2021-01-27T06:22:59.971Z',
								updatedAt: '2021-01-27T06:23:02.666Z',
								__v: 0,
								created_by: '600f9aee8e4062d494e12a2f',
								updated_by: '600f9aee8e4062d494e12a2f',
								id: '601106c36a6b2d246c163722',
							},
							code: 'D',
							name: 'Dicky',
							telegramChatId: '170511844',
							telegramUserId: '170511844',
							telegramValidationCode: '123123',
							id: '60110107222e8513969913c9',
						},
						id: '6013c2f3ae992d5eaef29c4a',
					},
				]),
			])

			return {
				props: {
					game,
					characters,
				}, // will be passed to the page component as props
			}
		}
	)

export default GameDetailPage
