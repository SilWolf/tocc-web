import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React from 'react'
import { useQuery } from 'react-query'

import Breadcrumb from 'src/components/Breadcrumb'
import { Input } from 'src/components/Form'
import apis, { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Race } from 'src/types/Race.type'
import { SessionUser } from 'src/types/User.type'

type PageProps = {
	races: Race[]
}

const CharacterCreatePage: NextPage<PageProps> = () => {
	const racesQuery = useQuery<Race[]>(['races'], apis.getRaces, {
		select: (races) => {
			return races
		},
	})

	return (
		<>
			<div className='container space-y-6'>
				<div className='inline-block'>
					<Breadcrumb className='text-white'>
						<NextLink href='/' passHref>
							<a>TOCC</a>
						</NextLink>
						<NextLink href='/character' passHref>
							<a>角色列表</a>
						</NextLink>
						<strong>建立角色</strong>
					</Breadcrumb>
				</div>

				<div className='parchment framed'>
					<p>這頁面將會引導您建立一個完整的TOCC角色。</p>
					<p>
						建立的角色將會符合 Dragon &#38; Dungeon
						規範，即使不懂得規則也沒關係。
					</p>
				</div>

				<div className='parchment parchment-narrowed'>
					<div className='flex text-center items-center'>
						<div className='flex-1'>1. 選擇種族</div>
						<div className='flex-1'>2. 選擇背景</div>
						<div className='flex-1'>3. 分配能力值點數</div>
						<div className='flex-1'>4. 背景故事</div>
						<div className='flex-1'>5. 職業</div>
					</div>
				</div>

				<div className='parchment space-y-4'>
					<h3>1. 選擇種族</h3>
					<p className='italic'>
						被各大小城市包圍的內海『碧之藍淚』，自古開始就孕育了許多生命與物種。
						<br />
						神族逝去、龍族沒落。時過境遷，在這一由凡人統治的時代裡，你的角色也將作為奇幻世界下一名智慧物種，在歷史上留下一筆偉名。
					</p>

					<p>請選擇一名種族作為角色的種族：</p>

					<Input type='select'></Input>
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

			return {
				props: {},
			}
		}
	)

export default CharacterCreatePage
