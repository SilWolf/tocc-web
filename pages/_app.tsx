import NextLink from 'next/link'
import type { AppProps } from 'next/app'
import { createContext, useMemo, useState } from 'react'
import Dialog, { DialogProps } from '../components/Dialog'
import '../styles/globals.css'

type AppContextProps = {
	isDialogOpened: boolean
	openDialog: (options: DialogProps) => void
	closeDialog: () => void
}

export const AppContext = createContext<AppContextProps>({
	isDialogOpened: false,
	openDialog: () => {
		/* */
	},
	closeDialog: () => {
		/* */
	},
})

const App = ({ Component, pageProps }: AppProps) => {
	const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false)
	const [dialogOptions, setDialogOptions] = useState<DialogProps>({})

	const appContextValue = useMemo(
		() => ({
			isDialogOpened: isDialogOpened,
			openDialog: (options: DialogProps) => {
				setDialogOptions(options)
				setIsDialogOpened(true)
			},
			closeDialog: () => {
				setIsDialogOpened(false)
			},
		}),
		[]
	)

	return (
		<>
			<AppContext.Provider value={appContextValue}>
				<div className='dark bg-yellow-900 py-1 fixed top-0 left-0 right-0'>
					<div className='container'>
						<div className='flex'>
							<div className='pr-2 flex-none'>
								<NextLink href='/' passHref>
									<a>TOCC Web</a>
								</NextLink>
							</div>
							<div className='px-2 flex-none'>
								<a href='#'>世界</a>
							</div>
							<div className='flex-auto'></div>
							<div className='px-2 flex-none'>
								<NextLink href='/characters/1' passHref>
									<a>我的角色</a>
								</NextLink>
							</div>
							<div className='pl-2 flex-none'>
								<NextLink href='/auth/login' passHref>
									<a>登入</a>
								</NextLink>
							</div>
						</div>
					</div>
				</div>

				<div className='min-h-screen flex flex-col'>
					<div className='flex-1'>
						<Component {...pageProps} />
					</div>

					<div className='flex-none bg-yellow-900 dark text-white py-4'>
						<div className='container space-y-1'>
							<div className='flex gap-x-2 justify-between items-center'>
								<div className='flex-none'>
									<div>Copyright</div>
									<div className='divide-x-2'>
										<a href='#' className='pr-2'>
											Link
										</a>
										<a href='#' className='px-2'>
											Link
										</a>
										<a href='#' className='px-2'>
											Link
										</a>
										<a href='#' className='px-2'>
											Link
										</a>
									</div>
								</div>
								<div className='flex-none space-x-6 text-3xl'>
									<a href='#'>
										<i className='bi-telegram'></i>
									</a>
									<a href='#'>
										<i className='bi-facebook'></i>
									</a>
									<a href='#'>
										<i className='bi-discord'></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div
					className={`bg-black bg-opacity-70 bg h-full w-full top-0 bottom-0 left-0 right-0 absolute flex justify-center items-center z-10 ${
						isDialogOpened ? 'block' : 'hidden'
					}`}
				>
					<Dialog {...dialogOptions} />
				</div>
			</AppContext.Provider>
		</>
	)
}

export default App
