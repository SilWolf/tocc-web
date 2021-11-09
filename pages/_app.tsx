import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { createContext, useMemo, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import AdminLayout from 'layouts/admin.layout'
import GeneralLayout from 'layouts/general.layout'
import Dialog, { DialogProps } from 'components/Dialog'

import 'rpg-awesome/css/rpg-awesome.min.css'
import 'swiper/css'
import 'src/styles/globals.css'
import 'react-datepicker/dist/react-datepicker.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
		},
	},
})

type AppContextProps = {
	isDialogOpened: boolean
	openDialog: (options: DialogProps) => void
	closeDialog: () => void
	isDarkMode: boolean
	toggleDarkMode: () => void
}

export const AppContext = createContext<AppContextProps>({
	isDialogOpened: false,
	openDialog: () => {
		/* */
	},
	closeDialog: () => {
		/* */
	},
	isDarkMode: false,
	toggleDarkMode: () => {
		/* */
	},
})

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()

	const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false)
	const [dialogOptions, setDialogOptions] = useState<DialogProps>({})
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

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
			isDarkMode: isDarkMode,
			toggleDarkMode: () => {
				setIsDarkMode((prev) => !prev)
			},
		}),
		[isDialogOpened, isDarkMode]
	)

	const Layout = useMemo(
		() => (router.pathname.startsWith('/admin') ? AdminLayout : GeneralLayout),
		[router]
	)

	return (
		<>
			<AppContext.Provider value={appContextValue}>
				<QueryClientProvider client={queryClient}>
					<div>
						<Layout>
							<Component {...pageProps} />
						</Layout>

						<div
							className={`bg-black bg-opacity-70 bg h-full w-full top-0 bottom-0 left-0 right-0 absolute flex justify-center items-center z-10 ${
								isDialogOpened ? 'block' : 'hidden'
							}`}
						>
							<Dialog {...dialogOptions} />
						</div>
					</div>
				</QueryClientProvider>
			</AppContext.Provider>
		</>
	)
}

export default App
