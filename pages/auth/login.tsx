import { NextPage } from 'next'
import { useCallback, useContext, MouseEventHandler } from 'react'
import { AppContext } from '../_app'

const LoginPage: NextPage = () => {
	const { openDialog, closeDialog } = useContext(AppContext)

	const handleClickRegister = useCallback<MouseEventHandler<HTMLAnchorElement>>(
		(event) => {
			event.preventDefault()

			openDialog({
				title: '僅限TOCC玩家註冊',
				content:
					'這是專為TOCC (Tales of Coastal Cities) 玩家而設的網站，故不開放外人註冊。假如你曾參加過TOCC遊戲，而未有登入的帳號密碼，請聯絡DM，他將會提供協助。',
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
			<div className='container max-w-screen-md h-full flex items-center'>
				<div className='w-full m-auto rounded-md bg-yellow-50 bg-opacity-90 shadow-lg px-8 py-6 space-y-6'>
					<div className='space-y-6'>
						<div>
							<label
								className='block text-sm text-gray-500 mb-1'
								htmlFor='email'
							>
								Email
							</label>
							<input
								type='email'
								id='email'
								className='form-input block w-full'
							/>
						</div>
						<div>
							<label
								className='block text-sm text-gray-500 mb-1'
								htmlFor='password'
							>
								密碼
							</label>
							<input
								type='password'
								id='password'
								className='form-input block w-full'
							/>
						</div>
					</div>

					<div className='space-y-4 text-center'>
						<button
							data-ripplet
							className='button button-primary h-12 w-full mx-auto active:ring-yellow-300'
						>
							登入
						</button>
						<div className='w-full space-x-4 text-right'>
							<a
								href='#'
								className='text-yellow-900'
								onClick={handleClickRegister}
							>
								註冊帳號
							</a>
							<a href='#' className='text-yellow-900'>
								無法登入
							</a>
						</div>
					</div>

					<hr />

					<div>
						<button data-ripplet className='button h-12 w-full mx-auto'>
							用Google登入
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
