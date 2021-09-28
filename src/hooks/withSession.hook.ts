// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from 'next'
import { Session, withIronSession } from 'next-iron-session'

import { SessionUser } from 'src/types/User.type'

export const ironSessionConfig = {
	password: process.env.SECRET_COOKIE_PASSWORD as string,
	cookieName: 'salesi-web/with-iron-session',
	cookieOptions: {
		// the next line allows to use the session in non-https environments like
		// Next.js dev mode (http://localhost:3000)
		secure: process.env.NODE_ENV === 'production' ? true : false,
	},
}

export type NextIronRequest = NextApiRequest & { session: Session }
export type GetServerSidePropsContextWithIronSession =
	GetServerSidePropsContext & {
		req: NextIronRequest
	}

export default function withSession(
	handler: (req: NextIronRequest, res: NextApiResponse) => Promise<void>
): (...args: any[]) => Promise<any> {
	return withIronSession(handler, ironSessionConfig)
}

export const serverSidePropsWithSession = (
	handler: GetServerSideProps
): GetServerSideProps => withIronSession(handler, ironSessionConfig)

export const ProtectPublicPage = (
	handler?: GetServerSideProps
): GetServerSideProps =>
	withIronSession(async (context: GetServerSidePropsContextWithIronSession) => {
		const sessionUser = context.req.session.get<SessionUser>('sessionUser')

		if (sessionUser && sessionUser.isLogined) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			}
		}

		return handler?.(context) || { props: {} }
	}, ironSessionConfig)

export const ProtectAuthPage = (
	handler?: GetServerSideProps
): GetServerSideProps =>
	withIronSession(async (context: GetServerSidePropsContextWithIronSession) => {
		const sessionUser = context.req.session.get<SessionUser>('sessionUser')

		if (!sessionUser || !sessionUser.isLogined) {
			return {
				redirect: {
					destination: '/auth/login',
					permanent: false,
				},
			}
		}

		if (sessionUser.user?.role?.name !== 'Authenticated') {
			return {
				redirect: {
					destination: '/403',
					permanent: false,
				},
			}
		}

		return handler?.(context) || { props: {} }
	}, ironSessionConfig)
