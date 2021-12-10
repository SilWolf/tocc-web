import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React from 'react'

import { getApis } from 'helpers/api/api.helper'

import Alert from 'src/components/Alert'
import Breadcrumb from 'src/components/Breadcrumb'
import ReactHTML from 'src/components/ReactHTML'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Character } from 'src/types'
import { DEFAULT_CHARACTER } from 'src/types/Character.type'
import { SessionUser, User, USER_ROLE } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

import classNames from 'classnames'

type PageProps = {
	character: Character
	player: User
}

const CharacterEditPage: NextPage<PageProps> = ({ character, player }) => {
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
					<div className='flex-none space-x-2 text-sm text-gray-200'>
						<NextLink href={`/character/${character.name}/edit`} passHref>
							<a
								data-ripplet
								className='inline-block leading-8 h-8 px-2 border border-gray-200 bg-black'
							>
								<i className='bi bi-pencil-fill'></i> 修改角色
							</a>
						</NextLink>
						<button
							data-ripplet
							className='h-8 w-8 border border-gray-200 bg-black'
						>
							<i className='bi bi-link-45deg'></i>
						</button>
					</div>
				</div>

				<div className='grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-3 tablet:gap-6 laptop:gap-6'>
					<div className='space-y-6'>
						<div className='parchment'>
							<a href='#'>角色外觀資料</a>
						</div>
					</div>
					<div className={classNames('col-span-2 space-y-8')}>
						<div className='parchment space-y-6'>
							<h2 className='mb-4'>角色自定義</h2>
							<Alert>
								<p>這範疇的資訊無須審查，儲存後會即時生效。</p>
							</Alert>
							<table>
								<tr>
									<td className='w-24'>角色頭像</td>
									<td></td>
								</tr>
							</table>
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
				}
			}

			character.player = {
				...character.player,
				...player,
			}

			return {
				props: {
					character,
					user: sessionUser?.user,
				},
			}
		}
	)

export default CharacterEditPage
