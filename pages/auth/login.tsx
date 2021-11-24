import { NextPage } from 'next'
import { useRouter } from 'next/router'

import React, { useCallback, useContext, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import Alert from 'src/components/Alert'
import { Input } from 'src/components/Form'
import MedievalButton from 'src/components/MedievalButton'
import apis from 'src/helpers/api/api.helper'
import { useUser } from 'src/hooks/auth.hook'
import { USER_ROLE } from 'src/types/User.type'

import { AppContext } from '../_app'

type LoginFormProps = {
	identity: string
	password: string
}

const LoginPage: NextPage = () => {
	const router = useRouter()
	const { setUser } = useUser()
	const {
		register,
		handleSubmit: rhfHandleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginFormProps>({
		defaultValues: {
			identity: '',
			password: '',
		},
	})

	const showGoogleConnectError = useMemo(
		() => router.query['error'] && router.query['connect'] === 'google',
		[router]
	)

	const { openDialog, closeDialog, isDarkMode } = useContext(AppContext)

	const handleClickRegister = useCallback(
		(event) => {
			event.preventDefault()

			openDialog({
				title: '僅限TOCC玩家註冊',
				content: (
					<>
						<img
							src='/images/tocc-logo.png'
							className='h-16 mx-auto mb-4'
							alt=''
						/>
						<p>
							這是專為TOCC (Tales of Coastal Cities)
							玩家而設的網站，故不開放外人註冊。假如你曾參加過TOCC遊戲，而未有登入的帳號密碼，請聯絡DM，他將會提供協助。
						</p>
					</>
				),
				actions: [
					{
						children: '關閉',
						onClick: () => closeDialog(),
					},
				],
			})
		},
		[openDialog, closeDialog]
	)

	const handleSubmit = useCallback(
		(value) => {
			apis
				.postLogin(value.identity, value.password)
				.then((res) => {
					setUser(res.user)
					if (res.user.role?.name === USER_ROLE.NORMAL) {
						router.push('/auth/register')
					} else {
						router.push('/')
					}
				})
				.catch((err) => {
					console.log(err.response)
					if (err.response?.data?.data?.[0]?.messages?.[0]?.id) {
						if (
							err.response.data.data[0].messages[0].id ===
							'Auth.form.error.invalid'
						) {
							setError('identity', {
								message: '無法登入，帳號或密碼錯誤!',
							})
						}
					}
				})
		},
		[router, setError, setUser]
	)

	return (
		<div
			className='w-full h-screen bg-cover bg-center'
			style={{ backgroundImage: 'url("/images/login-bg.jpg")' }}
		>
			<div className='container max-w-screen-tablet h-full flex items-center'>
				<div className='parchment framed w-full m-auto space-y-6'>
					<img
						src={
							isDarkMode ? '/images/tocc-logo-w.png' : '/images/tocc-logo.png'
						}
						className='h-16 mb-4 mx-auto'
						alt='tocc logo'
					/>

					{showGoogleConnectError && (
						<div className='text-center'>
							<Alert type='danger' className='inline-block'>
								錯誤: 在以Google登入時發生錯誤。
							</Alert>
						</div>
					)}

					<div className='flex items-stretch gap-x-8'>
						<div className='flex-1 space-y-4 self-center'>
							<MedievalButton
								href='/auth/connect/google/authorize'
								color='secondary'
							>
								<div className='flex items-center justify-center'>
									<img
										src='https://developers.google.com/identity/images/g-logo.png'
										alt='Google'
										className='inline-block h-5 w-5 mr-2 align-middle'
									/>
									<span>使用Google登錄</span>
								</div>
							</MedievalButton>
						</div>
						<div className='flex-none'>
							<div className='h-full w-px bg-yellow-600'></div>
						</div>
						<div className='flex-1 space-y-6 py-8'>
							<form
								className='space-y-6'
								onSubmit={rhfHandleSubmit(handleSubmit)}
							>
								<Input
									label='Email'
									type='email'
									{...register('identity', { required: true })}
									error={errors['identity']}
								/>
								<Input
									label='密碼'
									type='password'
									{...register('password', { required: true })}
									error={errors['password']}
								/>

								<div className='text-center'>
									<MedievalButton type='submit'>登入</MedievalButton>
								</div>
							</form>

							<div className='h-px w-3/4 mx-auto bg-gray-300'></div>

							<div className='grid grid-cols-2 gap-4'>
								<button
									type='button'
									className='button button-outline'
									onClick={handleClickRegister}
								>
									註冊帳號
								</button>
								<button
									type='button'
									data-ripplet
									className='button button-outline'
								>
									無法登入
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
