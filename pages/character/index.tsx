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
import { SessionUser } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'
import classNames from 'classnames'

type PageProps = {
	myCharacters: Character[]
}

const CharactersPage: NextPage<PageProps> = ({ myCharacters }) => {
	return (
		<>
			<div className='container'>
				<div className='mb-4 inline-block'>
					<Breadcrumb className='text-white'>
						<NextLink href='/' passHref>
							<a>TOCC</a>
						</NextLink>
						<NextLink href='/character' passHref>
							<a>角色列表</a>
						</NextLink>
					</Breadcrumb>
				</div>

				<div className='grid grid-cols-3 gap-x-6'>
					{[0, 1, 2].map((i) => {
						const character = myCharacters[i]
						if (character) {
							return (
								<NextLink
									key={character.id}
									href={`/character/${character.name}`}
									passHref
								>
									<a href=''>
										<div className='parchment framed relative'>
											{character.coverImage?.url && (
												<div
													className='cover-image-container h-28 bg-cover bg-center'
													style={{
														backgroundImage: `url(${character.coverImage.url})`,
													}}
												></div>
											)}

											<div className='space-y-6'>
												<div
													className={classNames(
														'w-28 mx-auto',
														character.coverImage && 'mt-6'
													)}
												>
													<div className='aspect-w-1 aspect-h-1'>
														<StrapiImg
															image={character.portraitImage}
															size='large'
															className='rounded-full border-4 border-gray-500'
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
										</div>
									</a>
								</NextLink>
							)
						}

						return (
							<div className='parchment framed relative flex items-center justify-center'>
								<div className='text-gray-400 italic'>空欄位</div>
							</div>
						)
					})}
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

			const [myCharacters] = await Promise.all([_apis.getMyCharacters()])

			return {
				props: {
					myCharacters,
				},
			}
		}
	)

export default CharactersPage
