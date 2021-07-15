// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSession, Session } from 'next-iron-session'

type NextIronRequest = NextApiRequest & { session: Session }

export default function withSession(
	handler: (req: NextIronRequest, res: NextApiResponse) => Promise<void>
): (...args: any[]) => Promise<any> {
	return withIronSession(handler, {
		password: process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD as string,
		cookieName: 'tocc-web/with-iron-session',
		cookieOptions: {
			// the next line allows to use the session in non-https environments like
			// Next.js dev mode (http://localhost:3000)
			secure: process.env.NODE_ENV === 'production' ? true : false,
		},
	})
}
