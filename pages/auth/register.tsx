import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Input } from 'src/components/Form'
import MedievalButton from 'src/components/MedievalButton'
import apis, { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	ProtectAuthPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import {
	PlayerVerification,
	PlayerVerificationRegister_Req,
	SessionUser,
	User,
	USER_ROLE,
} from 'src/types/User.type'
import StrapiImg from 'src/widgets/StrapiImg'

type FormProps = Partial<PlayerVerificationRegister_Req>

type Props = {
	user: User
}

const AuthRegisterPage: NextPage<Props> = ({ user }: Props) => {
	const router = useRouter()

	const [step, setStep] = useState<number>(0)
	const [pv, setPv] = useState<PlayerVerification | undefined>(undefined)

	const {
		register,
		handleSubmit: rhfHandleSubmit,
		reset,
		setError,
		formState: { errors },
	} = useForm<FormProps>({
		defaultValues: {
			verificationCode: '',
			name: '',
			nickname: '',
			email: '',
		},
	})

	const handleSubmitVerification = useCallback(
		({ verificationCode }) => {
			apis
				.getPlayerVerificationByCode(verificationCode)
				.then((_pv) => {
					if (_pv) {
						setStep(1)
						setPv(_pv)
						reset({
							name: _pv.name,
							nickname: _pv.nickname,
							email: user.email,
							verificationCode: _pv.verificationCode,
						})
					} else {
						setError('verificationCode', {
							message: '驗證碼不正確，請檢查後重新輸入。',
						})
					}
				})
				.catch(() => {
					setError('verificationCode', {
						message: '驗證碼不正確，請檢查後重新輸入。',
					})
				})
		},
		[reset, setError, user.email]
	)

	const handleSubmitRegistration = useCallback(
		(values) => {
			apis
				.patchUserToPlayer(values)
				.then(() => {
					// router.push('/')
				})
				.catch(() => {
					toast.error('註冊失敗，請稍後再試或聯絡DM。')
				})
		},
		[router]
	)

	if (pv && step === 1) {
		return (
			<>
				<div className='container max-w-screen-mobile'>
					<div className='parchment framed'>
						<form
							className='space-y-6'
							onSubmit={rhfHandleSubmit(handleSubmitRegistration)}
						>
							<h4>驗證玩家</h4>
							<p>請填寫以下資料以完成註冊程序。</p>

							<div>
								<h4>您的角色</h4>
								{pv.characters.map((character) => (
									<div key={character.id} className='flex items-center gap-x-2'>
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
								))}
							</div>

							<div>
								<h4>帳號資料</h4>
								<Input type='hidden' {...register('verificationCode')} />
								<div className='space-y-6'>
									<Input
										type='text'
										label='玩家編號'
										value={pv.playerCode}
										readOnly={true}
										disabled={true}
										helperText={
											<p>
												每名玩家都有一個獨立的編號，DM偶爾會要求出示此編號以證明身分。
											</p>
										}
									/>
									<Input
										type='text'
										label='所屬城市'
										value={pv.city.name}
										readOnly={true}
										disabled={true}
										helperText={<p>即首場遊戲及首名角色所在的城市。</p>}
									/>
									<Input
										type='email'
										label='Email'
										{...register('email', { required: true })}
										error={errors['email']}
										helperText={
											<p>
												每當有新的消息及活動時，會以 Email
												通知各玩家。在註冊後，將可在帳號頁面修改通知設定。
											</p>
										}
									/>
									<Input
										type='text'
										label='真實名字'
										{...register('name', { required: true })}
										error={errors['name']}
										helperText={
											<p>僅DM可以看見此名字，請使用正常的名字以方便識別。</p>
										}
									/>
									<Input
										type='text'
										label='顯示名稱'
										{...register('nickname', { required: true })}
										error={errors['nickname']}
										helperText={
											<p>在網站中及其他場合下對其他玩家顯示的名字。</p>
										}
									/>
								</div>
							</div>

							<MedievalButton type='submit' color='success'>
								完成註冊
							</MedievalButton>
						</form>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div className='container max-w-screen-mobile'>
				<div className='parchment framed space-y-6'>
					<h4>驗證玩家</h4>
					<p>
						請輸入玩家的驗證碼，DM該有向你發出過驗證碼，如沒有，請與任一DM聯絡。
					</p>

					<form
						className='space-y-6'
						onSubmit={rhfHandleSubmit(handleSubmitVerification)}
					>
						<Input
							type='text'
							className='text-lg text-center'
							placeholder='驗證碼'
							{...register('verificationCode', { required: true })}
							error={errors['verificationCode']}
						/>
						<MedievalButton type='submit' color='success'>
							下一步
						</MedievalButton>
					</form>

					<div className='text-center'>
						<NextLink href='/' passHref>
							<a>稍後再設定</a>
						</NextLink>
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

			if (user.role?.name !== USER_ROLE.NORMAL) {
				return {
					redirect: {
						destination: '/',
						permanent: false,
					},
				}
			}

			return {
				props: {
					user,
				},
			}
		}
	)
)

export default AuthRegisterPage
