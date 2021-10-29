import { GetServerSideProps, NextPage } from 'next'
import { getApis } from 'src/helpers/api/api.helper'

import {
	GetServerSidePropsContextWithIronSession,
	ProtectAdminPage,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Game } from 'src/types'
import { SessionUser } from 'src/types/User.type'

type Props = {
	games: Game[]
}

const AdminIndexPage: NextPage<Props> = ({ games }: Props) => {
	console.log(games)
	return (
		<>
			<h2>待跑劇本</h2>
			<div className='grid laptop:grid-cols-2 gap-4'>
				<div className='parchment space-y-2'>
					<h2>[GO-0080D] 血獸獄之戰</h2>

					<div className='grid tablet:grid-cols-3 laptop:grid-cols-3 gap-4'>
						<div className='tablet:col-span-2 laptop:col-span-2'>
							<table>
								<tr>
									<td>日期時間: </td>
									<td className='pl-2 font-bold'>2021年10月20日 20:00-23:00</td>
								</tr>
								<tr>
									<td>城市(店舖): </td>
									<td className='pl-2 font-bold'>錫安城 (GO)</td>
								</tr>
								<tr>
									<td>等級: </td>
									<td className='pl-2 font-bold'>Lv. 3-6</td>
								</tr>
								<tr>
									<td>人數: </td>
									<td className='pl-2 font-bold'>3-6人</td>
								</tr>
							</table>

							<div>
								<div className='flex gap-x-2 items-center'>
									<div>
										<img
											className='w-10 h-10 border-2 border-gray-500'
											src='https://placedog.net/100'
											alt=''
										/>
									</div>
									<div>
										<p>GO00001-002 月月</p>
										<p>GO00001-002 卡洛特</p>
									</div>
								</div>

								<div className='flex gap-x-2 items-center'>
									<div>
										<img
											className='w-10 h-10 border-2 border-gray-500'
											src='https://placedog.net/100'
											alt=''
										/>
									</div>
									<div>
										<p>GO00001-002 月月</p>
										<p>GO00001-002 卡洛特</p>
									</div>
								</div>

								<div className='flex gap-x-2 items-center'>
									<div>
										<img
											className='w-10 h-10 border-2 border-gray-500'
											src='https://placedog.net/100'
											alt=''
										/>
									</div>
									<div>
										<p>GO00001-002 月月</p>
										<p>GO00001-002 卡洛特</p>
									</div>
								</div>

								<div className='flex gap-x-2 items-center'>
									<div>
										<img
											className='w-10 h-10 border-2 border-gray-500'
											src='https://placedog.net/100'
											alt=''
										/>
									</div>
									<div>
										<p>GO00001-002 月月</p>
										<p>GO00001-002 卡洛特</p>
									</div>
								</div>
							</div>
						</div>

						<div>
							<h3 className='mb-2'>待辦事項</h3>
							<div className='space-y-1'>
								<div className='flex gap-x-2 line-through opacity-30'>
									<div>
										<i className='bi bi-check-square-fill'></i>
									</div>
									<div>發佈遊戲</div>
								</div>
								<div className='flex gap-x-2'>
									<div>
										<i className='bi bi-square'></i>
									</div>
									<div>回應 月月 的報名</div>
								</div>
								<div className='flex gap-x-2'>
									<div>
										<i className='bi bi-square'></i>
									</div>
									<div>回應 月月 的報名</div>
								</div>
								<div className='flex gap-x-2'>
									<div>
										<i className='bi bi-square'></i>
									</div>
									<div>回應 月月 的報名</div>
								</div>
								<div className='flex gap-x-2'>
									<div>
										<i className='bi bi-square'></i>
									</div>
									<div>回應 月月 的報名</div>
								</div>
								<div className='flex gap-x-2'>
									<div>
										<i className='bi bi-square'></i>
									</div>
									<div>跑劇本</div>
								</div>
								<div className='flex gap-x-2'>
									<div>
										<i className='bi bi-square'></i>
									</div>
									<div>派獎勵、XP</div>
								</div>
								<div className='flex gap-x-2'>
									<div>
										<i className='bi bi-square'></i>
									</div>
									<div>後記、情報更新</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = ProtectAdminPage(
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const apis = getApis({ jwt: sessionUser?.jwt })

			const games = await apis.getDMPendingGames()

			return {
				props: { games },
			}
		}
	)
)

export default AdminIndexPage
