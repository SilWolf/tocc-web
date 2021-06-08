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

				<Component {...pageProps} />

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
