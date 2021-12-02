import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { Input } from 'src/components/Form'
import MedievalButton from 'src/components/MedievalButton'
import OrDivider from 'src/components/OrDivider'
import apis from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import {
	PlayerVerification,
	PlayerVerificationRegister_Req,
	SessionUser,
	User,
} from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

import { AppContext } from 'pages/_app'

type FormProps = Partial<PlayerVerificationRegister_Req> & {
	username: string
	password: string
	confirmPassword: string
}

type Props = {
	user?: User
}

const AuthRegisterDonePage: NextPage<Props> = (props: Props) => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { user, setStoredUser } = useContext(AppContext)

	const [step, setStep] = useState<number>(props.user ? 1 : 0)
	const [pv, setPv] = useState<PlayerVerification | undefined>(undefined)

	return (
		<>
			<div className='container max-w-screen-mobile'>
				<div className='parchment framed space-y-6'>
					<h4>完成登錄</h4>
					<p>你已完成玩家登錄程序，你可自由使用TOCC玩家平台的所有功能了！</p>

					<div className='space-y-4'>
						<div>
							<NextLink href='/game' passHref>
								<a>瀏覽正在招募玩家的劇本</a>
							</NextLink>
						</div>

						<div>
							<NextLink href='/character' passHref>
								<a>瀏覽我的角色</a>
							</NextLink>
						</div>

						<div>
							<NextLink href='/auth/account' passHref>
								<a>瀏覽我的個人檔案</a>
							</NextLink>
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
					props: {},
				}
			}

			return {
				props: {
					user: sessionUser?.user,
				},
			}
		}
	)

export default AuthRegisterDonePage
