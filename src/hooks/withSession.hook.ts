// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { NextApiRequest, NextApiResponse } from 'next'
import { Session, withIronSession } from 'next-iron-session'

import { ironSessionConfig } from 'server'

type NextIronRequest = NextApiRequest & { session: Session }

export default function withSession(
	handler: (req: NextIronRequest, res: NextApiResponse) => Promise<void>
): (...args: any[]) => Promise<any> {
	return withIronSession(handler, ironSessionConfig)
}
