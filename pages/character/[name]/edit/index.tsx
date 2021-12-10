import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React, { useCallback, useState } from 'react'

import apis, { getApis } from 'helpers/api/api.helper'

import Alert from 'src/components/Alert'
import Breadcrumb from 'src/components/Breadcrumb'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Character } from 'src/types'
import { DEFAULT_CHARACTER } from 'src/types/Character.type'
import { SessionUser, USER_ROLE } from 'src/types/User.type'
import ImageUploader from 'src/widgets/ImageUploader'
import StrapiImg from 'src/widgets/StrapiImg'

import classNames from 'classnames'
import { nanoid } from 'nanoid'

type PageProps = {
	character: Character
}

const CharacterEditPage: NextPage<PageProps> = ({ character: _character }) => {
	const [character, setCharacter] = useState<Character>(_character)

	const handleChangePortraitImage = useCallback(
		(blob) => {
			apis
				.postFile(blob, `${nanoid(12)}.jpg`)
				.then((media) =>
					apis.patchCharacterById(character.id, {
						portraitImage: media.id,
					})
				)
				.then((newCharacter) => {
					setCharacter((prev) => ({
						...prev,
						portraitImage: newCharacter.portraitImage,
					}))
				})
		},
		[character.id]
	)

	return (
		<>
			{character.coverImage?.url && (
				<div
					className='absolute top-10 left-0 right-0 h-80 bg-cover bg-center'
					style={{ backgroundImage: `url(${character.coverImage.url})` }}
				></div>
			)}
			<div
				className={classNames(
					'container relative',
					character.coverImage && 'mt-48'
				)}
			>
				<div className='flex items-center'>
					<div className='flex-1'>
						<div
							className={classNames(
								'mb-4 inline-block',
								character.coverImage && 'px-4 py-2 bg-black bg-opacity-70'
							)}
						>
							<Breadcrumb className='text-white'>
								<NextLink href='/' passHref>
									<a>TOCC</a>
								</NextLink>
								<NextLink href='/character' passHref>
									<a>角色列表</a>
								</NextLink>
								<NextLink href={`/character/${character.name}`} passHref>
									<a>{character.name}</a>
								</NextLink>
								<strong>修改角色</strong>
							</Breadcrumb>
						</div>
					</div>
					<div className='flex-none space-x-2 text-sm text-gray-200'></div>
				</div>

				<div className='flex gap-6'>
					<div className='w-56 space-y-6'>
						<div className='parchment'>
							<a href='#'>角色外觀資料</a>
						</div>
					</div>
					<div className='flex-1 space-y-6'>
						<div className='parchment space-y-6'>
							<h2 className='mb-4'>角色自定義</h2>
							<Alert>
								<p>這範疇的資訊無須審查，儲存後會即時生效。</p>
							</Alert>
							<div className='flex gap-x-6'>
								<div className='flex-1'></div>
								<div className='w-48 space-y-6'>
									<div>
										<h5>頭像</h5>
										<div>
											<ImageUploader onSubmit={handleChangePortraitImage}>
												<div className='aspect-w-1 aspect-h-1'>
													<StrapiImg
														className='w-48 h-48'
														image={character?.portraitImage}
													/>
												</div>
											</ImageUploader>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='parchment space-y-6'>
							<h2 className='mb-4'>角色頁面自定義</h2>
							<Alert type='info'>
								<p>
									由於牽涉遊戲性及故事，大部分角色資訊需要經過 DM 檢查才能落實。
								</p>
								<p>
									更新資訊的冷卻時間是一場劇本，或是一個月，視乎哪一個比較快。
								</p>
							</Alert>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			if (!sessionUser?.user) {
				return {
					redirect: {
						destination: '/403',
					},
					props: {},
				}
			}

			const _apis = getApis({ jwt: sessionUser?.jwt })

			const { params } = context

			const [characterByName] = await Promise.all([
				_apis.getCharacterByName(params?.name as string),
			])

			if (!characterByName) {
				return {
					notFound: true,
					props: {},
				}
			}

			const [character, player] = await Promise.all([
				_apis.getCharacterById(characterByName.id).then((_character) => ({
					...DEFAULT_CHARACTER,
					..._character,
				})),
				_apis.getPlayerById(characterByName.player?.id || ''),
			])

			if (
				sessionUser.user.id !== player.id &&
				sessionUser.user.role?.name !== USER_ROLE.DM
			) {
				return {
					redirect: {
						destination: '/403',
					},
					props: {},
				}
			}

			character.player = {
				...character.player,
				...player,
			}

			return {
				props: {
					character,
				},
			}
		}
	)

export default CharacterEditPage
