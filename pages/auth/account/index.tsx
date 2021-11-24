import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'

import { Input } from 'src/components/Form'
import MedievalButton from 'src/components/MedievalButton'
import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	ProtectAuthPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Character } from 'src/types'
import { SessionUser, User } from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

type Props = {
	user: User
	characters: Character[]
}

const AuthAccountPage: NextPage<Props> = ({ user, characters }: Props) => {
	const { register } = useForm({
		defaultValues: user,
	})
	return (
		<>
			<div className='container'>
				<div className='flex gap-x-4'>
					<div className='flex-none w-72 space-y-6'>
						<div className='parchment'>
							<h3 className='text-center mb-1'>{user.displayName}</h3>
							<p className='text-center text-sm font-light mb-4'>
								@{user.code}
							</p>
							<div className='relative w-40 h-40 mx-auto'>
								<StrapiImg
									className='w-full h-full rounded-full border border-gray-500'
									image={user.portraitImage}
									size='medium'
									alt='portrait'
								/>
								<button
									data-ripplet
									className='w-8 h-8 rounded-full absolute bottom-1 right-1 bg-white border border-gray-400 shadow'
								>
									<i className='bi bi-pencil'></i>
								</button>
							</div>
						</div>

						<div className='parchment parchment-narrowed'>
							<h5 className='mb-2'>擁有角色</h5>
							<div className='space-y-2'>
								{characters.map((character) => (
									<NextLink
										key={character.id}
										href={`/character/${character.name}`}
										passHref
									>
										<a href=''>
											<div className='flex items-center gap-x-2'>
												<div className='flex-none'>
													<StrapiImg
														image={character.portraitImage}
														size='thumbnail'
														className='w-10 h-10'
													/>
												</div>
												<div className='flex-1'>
													<strong>{character.name}</strong>
													<p className='text-xs'>
														{character.background?.name} {character.race?.name}{' '}
														{character.levelWithClsesString}
													</p>
												</div>
											</div>
										</a>
									</NextLink>
								))}
							</div>
						</div>
					</div>
					<div className='flex-1 space-y-6'>
						<div className='parchment'>
							<div className='space-y-6'>
								<h1>更新資料</h1>
								<div className='grid grid-cols-2 gap-4'>
									<Input
										type='text'
										label='顯示名稱'
										{...register('displayName')}
										helperText='這名稱會在網站上及對其他玩家顯示'
									></Input>
									<Input
										type='text'
										label='真實名稱'
										{...register('name')}
										helperText='DM會用這名稱對您稱呼'
									></Input>
									<Input
										type='text'
										label='玩家編號'
										{...register('code')}
										readOnly
										disabled
									></Input>
									<Input
										type='email'
										label='Email'
										{...register('email')}
									></Input>
								</div>
								<MedievalButton className='inline-block' color='success'>
									更新資料
								</MedievalButton>
							</div>
						</div>

						<div className='parchment'>
							<div className='space-y-6'>
								<h1>遊玩紀錄</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = ProtectAuthPage(
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const apis = getApis({ jwt: sessionUser?.jwt })

			const [user, characters] = await Promise.all([
				apis.getMe(),
				apis.getMyCharacters(),
			])

			return {
				props: {
					user,
					characters,
				},
			}
		}
	)
)

export default AuthAccountPage
