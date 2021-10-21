import { NextPage } from 'next'

import { useCallback, useContext } from 'react'

import Button from 'src/components/Button'
import { Input } from 'src/components/Form'

import { AppContext } from '../_app'

const LoginPage: NextPage = () => {
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

	return (
		<div
			className='w-full h-screen bg-cover bg-center'
			style={{ backgroundImage: 'url("/images/login-bg.jpg")' }}
		>
			<div className='container max-w-screen-tablet h-full flex items-center'>
				<div className='card w-full m-auto rounded-md shadow-lg px-8 py-6 space-y-6'>
					<img
						src={
							isDarkMode ? '/images/tocc-logo-w.png' : '/images/tocc-logo.png'
						}
						className='h-16 mb-4 mx-auto'
						alt='tocc logo'
					/>

					<div className='flex items-stretch gap-x-8'>
						<div className='flex-1 space-y-4 self-center'>
							<Button
								href='/auth/connect/google/authorize'
								className='button-white w-full mx-auto'
							>
								<img
									src='https://developers.google.com/identity/images/g-logo.png'
									alt='Google'
									className='inline-block h-5 w-5 mr-2 align-middle'
								/>
								<span>使用Google登錄</span>
							</Button>
						</div>
						<div className='flex-none'>
							<div className='h-full w-px bg-gray-300'></div>
						</div>
						<div className='flex-1 space-y-6 py-8'>
							<form className='space-y-6'>
								<Input label='Email' type='email' />
								<Input label='密碼' type='password' />

								<div className='text-center'>
									<Button
										type='submit'
										data-ripplet
										className='button-primary w-full'
									>
										登入
									</Button>
								</div>
							</form>

							<div className='h-px w-3/4 mx-auto bg-gray-300'></div>

							<div className='grid grid-cols-2 gap-4'>
								<button
									data-ripplet
									className='button button-outline'
									onClick={handleClickRegister}
								>
									註冊帳號
								</button>
								<button data-ripplet className='button button-outline'>
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
