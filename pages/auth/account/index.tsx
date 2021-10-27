import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import { useForm } from 'react-hook-form'

import { Input } from 'src/components/Form'
import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	ProtectAuthPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { SessionUser, User } from 'src/types/User.type'

type Props = {
	user: User
}

const AuthAccountPage: NextPage<Props> = ({ user }: Props) => {
	const { register } = useForm({
		defaultValues: user,
	})
	return (
		<>
			<div className='container'>
				<div className='grid grid-cols-4 gap-x-4'>
					<div>
						<div className='parchment'>
							<div>
								<NextLink href='/auth/account' passHref>
									<a href='' className='block py-2'>
										基本設定
									</a>
								</NextLink>
							</div>
						</div>
					</div>
					<div className='col-span-3'>
						<div className='parchment'>
							<div className='space-y-4'>
								<Input
									type='text'
									label='顯示名稱'
									{...register('name')}
								></Input>
								<Input
									type='text'
									label='帳號ID'
									{...register('username')}
								></Input>
								<Input
									type='email'
									label='Email'
									{...register('email')}
								></Input>
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

			const [user] = await Promise.all([apis.getMe()])

			return {
				props: {
					user,
				},
			}
		}
	)
)

export default AuthAccountPage
