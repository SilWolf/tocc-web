import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React from 'react'

import { getApis } from 'helpers/api/api.helper'

import Breadcrumb from 'src/components/Breadcrumb'
import ReactHTML from 'src/components/ReactHTML'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Character } from 'src/types'
import { DEFAULT_CHARACTER } from 'src/types/Character.type'
import { SessionUser, User } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

import classNames from 'classnames'

type PageProps = {
	character: Character
	user: User | undefined
}

const CharacterProfilePage: NextPage<PageProps> = ({ character, user }) => {
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
								<strong>{character.name}</strong>
							</Breadcrumb>
						</div>
					</div>
					<div className='flex-none space-x-2 text-sm text-gray-200'>
						{user?.id && character.player?.id === user.id && (
							<NextLink href={`/character/${character.name}/edit`} passHref>
								<a
									data-ripplet
									className='inline-block leading-8 h-8 px-2 border border-gray-200 bg-black'
								>
									<i className='bi bi-pencil-fill'></i> 修改角色
								</a>
							</NextLink>
						)}
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
						<div className='parchment framed space-y-6'>
							<div className='w-2/3 mx-auto'>
								<div className='aspect-w-1 aspect-h-1'>
									<StrapiImg
										image={character.portraitImage}
										size='large'
										className='rounded-full'
									/>
								</div>
							</div>
							<div className='text-center'>
								<h1>{character.name}</h1>
								<h2 className='text-xs mb-4'>{character.nickname}</h2>
								<h3 className='text-subtitle text-sm'>
									{character.background?.name} {character.race?.name}{' '}
									{character.levelWithClsesString}
								</h3>
							</div>

							<div className='text-center text-sm italic'>
								{character.bioSaying}
							</div>
						</div>

						<div className='parchment parchment-narrowed space-y-4'>
							<table className='table-character-meta'>
								<tr>
									<td>
										<i className='ra ra-key-basic'></i>
									</td>
									<td>編號</td>
									<td>{character.code}</td>
								</tr>
								<tr>
									<td>
										<i className='ra ra-player'></i>
									</td>
									<td className='pr-3'>玩家</td>
									<td>
										<div className='flex items-center gap-x-1'>
											<div className='flex-none'>
												<StrapiImg
													image={character.player?.portraitImage}
													size='thumbnail'
													className='w-5 h-5'
												/>
											</div>
											<div className='flex-1'>
												{character.player?.displayName}
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<i className='ra ra-bridge'></i>
									</td>
									<td>城市</td>
									<td>{character.city?.name}</td>
								</tr>
								<tr>
									<td>
										<i className='ra ra-seagull'></i>
									</td>
									<td>背景</td>
									<td>{character.background?.name}</td>
								</tr>
								<tr>
									<td>
										<i className='ra ra-crown'></i>
									</td>
									<td>稱號</td>
									<td>{character.bioTitle}</td>
								</tr>
								<tr>
									<td>
										<i className='ra ra-castle-flag'></i>
									</td>
									<td>組織</td>
									<td>{character.bioOrganization}</td>
								</tr>
								<tr>
									<td>
										<i className='ra ra-pawn'></i>
									</td>
									<td>身分</td>
									<td>{character.bioRole}</td>
								</tr>
								<tr>
									<td>
										<i className='ra ra-pisces'></i>
									</td>
									<td>信仰</td>
									<td>{character.deity?.name}</td>
								</tr>
							</table>
						</div>

						{character.attribute && (
							<div className='parchment parchment-narrowed space-y-4'>
								<h3>聲望</h3>
								<table className='table-character-meta'>
									{Object.entries(character.attribute).map(
										([attribute, value]) => (
											<tr key={attribute}>
												<td>{attribute}</td>
												<td>{value}</td>
											</tr>
										)
									)}
								</table>
							</div>
						)}

						<div className='parchment parchment-narrowed space-y-4'>
							<div>
								<h5 className='text-subtitle'>個性</h5>
								<p>{character.bioPersonalityTrait}</p>
							</div>

							<div>
								<h5 className='text-subtitle'>理想</h5>
								<p>{character.bioIdeal}</p>
							</div>

							<div>
								<h5 className='text-subtitle'>羈絆</h5>
								<p>{character.bioBond}</p>
							</div>

							<div>
								<h5 className='text-subtitle'>缺憾</h5>
								<p>{character.bioFlaw}</p>
							</div>

							<div className='space-y-2'></div>
						</div>
					</div>
					<div
						className={classNames(
							'col-span-2 space-y-8',
							character.coverImage && 'tablet:mt-12 laptop:mt-12 mt-6'
						)}
					>
						<div className='parchment'>
							<h2 className='mb-4'>關於{character.name}</h2>
							<ReactHTML>{character.bioAppearance}</ReactHTML>
						</div>
						<div className='parchment space-y-8'>
							{/* <div className='text-right space-x-2'>
							<button data-ripplet className='button button-outline text-sm'>
								<i className='bi bi-share-fill mr-2'></i>
								<span>分享</span>
							</button>

							<NextLink
								href={{ pathname: `/character/${character.name}/sheet` }}
								passHref
							>
								<a data-ripplet className='button button-outline text-sm'>
									<i className='bi bi-file-spreadsheet-fill mr-2'></i>
									<span>角色卡</span>
								</a>
							</NextLink>
							<Button className='button-outline text-sm' disabled>
								<i className='bi bi-file-spreadsheet-fill mr-2'></i>
								<span>切換至戰鬥(暫未開放)</span>
							</Button>

							<button data-ripplet className='button button-outline text-sm'>
								<i className='bi bi-pencil-fill mr-2'></i>
								<span>修改角色</span>
							</button>
						</div> */}
							<div>
								<h3>近期活動</h3>
								<ul>
									<li>1263.06.05 - 卡洛特解決了一場商會之間的衝突。</li>
								</ul>
							</div>

							<div>
								<h3>寶藏</h3>
								<ul>
									<li>
										卡洛特得到了 <strong>+1不死生物殺手短劍</strong> 。
									</li>
								</ul>
							</div>

							<div>
								<h3>人際關係</h3>
								<ul>
									<li>
										卡洛特與 <strong>南海商會的部長哥魯夫</strong> 成為了朋友。
									</li>
								</ul>
							</div>

							<div>
								<h3>知識</h3>
								<ul>
									<li>卡洛特得知了血帆海盜策劃著恐怖襲擊。</li>
								</ul>
							</div>

							<div className='py-4'>
								<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
							</div>

							<div className='space-y-4 text-sm leading-6 text-center'>
								<ReactHTML>{character.bioDescription}</ReactHTML>
							</div>

							<div className='py-4'>
								<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
							</div>

							<div className='grid grid-cols-3 gap-x-4 text-center'>
								<div>
									<h5 className='text-subtitle mb-1'>已完成劇本數</h5>
									<h1>{character.factCompletedGameCount}</h1>
								</div>
								<div>
									<h5 className='text-subtitle mb-1'>已獲得的XP</h5>
									<h1>{character.factCollectedXP}</h1>
								</div>
								<div>
									<h5 className='text-subtitle mb-1'>已接觸的其他玩家角色</h5>
									<h1>{character.factTouchedCharacterCount}</h1>
								</div>
							</div>
						</div>
						<div className='parchment'>
							<h2 className='mb-4'>角色故事</h2>
							<ReactHTML>{character.bioStory}</ReactHTML>
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

			const [character] = await Promise.all([
				_apis.getCharacterById(characterByName.id).then((_character) => ({
					...DEFAULT_CHARACTER,
					..._character,
				})),
			])

			return {
				props: {
					character,
					user: sessionUser?.user,
				},
			}
		}
	)

export default CharacterProfilePage
