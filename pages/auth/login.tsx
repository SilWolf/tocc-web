import { NextPage } from 'next'

const LoginPage: NextPage = () => {
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
						<button className='button button-primary w-full mx-auto active:ring-yellow-300'>
							登入
						</button>
						<div className='w-full space-x-4 text-right'>
							<a href='#' className='text-yellow-900'>
								註冊帳號
							</a>
							<a href='#' className='text-yellow-900'>
								無法登入
							</a>
						</div>
					</div>

					<hr />

					<div>
						<button className='button w-full mx-auto'>用Google登入</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
