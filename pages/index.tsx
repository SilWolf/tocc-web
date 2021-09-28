import { GetServerSideProps, NextPage } from 'next'

import { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { SessionUser } from 'src/types/User.type'

type PageProps = {
	pendingGames: Game[]
}

const HomePage: NextPage<PageProps> = ({ pendingGames }: PageProps) => {
	return (
		<>
			<div
				className='h-64 bg-center bg-cover'
				style={{ backgroundImage: 'url("/images/homepage-bg.jpg")' }}
			></div>

			<div className='container py-12 flex-1'>
				<div className='grid grid-cols-3 gap-x-6 gap-y-8'>
					<div className='col-span-3'>
						<h3 className='mb-2'>招募中</h3>
						<div className='grid grid-cols-3 gap-x-6 gap-y-4'>
							{pendingGames.map((game) => (
								<div key={game.id} className='card'>
									<h4>標題</h4>
									<div className='h-16'>
										<p className='text-sm text-gray-600 paragraph-ellipsis-3'>
											內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容內容
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='col-span-3 card'>
						<h3>最新活動</h3>
					</div>
					<div className='col-span-2 card'>
						<h3>海城週聞</h3>
					</div>
					<div className='card row-span-2'>
						<h3>角色動態</h3>
					</div>
					<div className='col-span-2 card'>
						<h3>你知道嗎?</h3>
					</div>
					<div className='col-span-3 card'>
						<h3>外部連結</h3>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const _apis = getApis({ jwt: sessionUser?.jwt })

			const [pendingGames] = await Promise.all([_apis.getPendingGames()])

			return {
				props: {
					pendingGames,
				}, // will be passed to the page component as props
			}
		}
	)

export default HomePage
