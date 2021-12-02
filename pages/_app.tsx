import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'

import AdminLayout from 'layouts/admin.layout'
import GeneralLayout from 'layouts/general.layout'
import Dialog, { DialogProps } from 'components/Dialog'

import apis from 'src/helpers/api/api.helper'
import { User } from 'src/types'
import 'rpg-awesome/css/rpg-awesome.min.css'
import 'swiper/css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'src/styles/globals.css'

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
	user: User | undefined
	setUser: (_user: User | undefined) => void
	storedUser: User | undefined
	setStoredUser: (_user: User | undefined) => void
}

export const AppContext = createContext<AppContextProps>({
	isDialogOpened: false,
	openDialog: () => {
		/* */
	},
	closeDialog: () => {
		/* */
	},
	user: undefined,
	setUser: () => {
		/* */
	},
	storedUser: undefined,
	setStoredUser: () => {
		/* */
	},
})

const AuthController = () => {
	const { storedUser, setUser } = useContext(AppContext)
	const innerStoredUser = useRef<User | undefined>(undefined)

	const { refetch } = useQuery<User | undefined>(
		['user', 'me'],
		() => (storedUser ? apis.getMe() : Promise.resolve(undefined)),
		{
			staleTime: 5 * 60 * 1000, // 5mins
			initialData: storedUser,
			onSuccess: (newUser) => {
				setUser(newUser)
			},
		}
	)

	useEffect(() => {
		if (
			(storedUser !== undefined && innerStoredUser.current === undefined) ||
			(storedUser === undefined && innerStoredUser.current !== undefined)
		) {
			refetch()
			innerStoredUser.current = storedUser
		}
	}, [refetch, storedUser])

	return <></>
}

const App = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()

	const [user, setUser] = useState<User | undefined>(undefined)
	const [storedUser, setStoredUser] = useState<User | undefined>(undefined)

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
			user,
			setUser,
			storedUser,
			setStoredUser: (user: User | undefined) => {
				if (typeof window !== 'undefined') {
					if (user) {
						localStorage.setItem('tocc-user', JSON.stringify(user))
					} else {
						localStorage.removeItem('tocc-user')
					}
					setStoredUser(user)
				}
			},
		}),
		[isDialogOpened, storedUser, user]
	)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userJson = localStorage.getItem('tocc-user')
			try {
				if (userJson) {
					appContextValue.setStoredUser(JSON.parse(userJson))
				}
			} catch (_) {
				/* */
			}
		}
	}, [appContextValue])

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

					<AuthController />
					<ToastContainer />
				</QueryClientProvider>
			</AppContext.Provider>
		</>
	)
}

export default App
