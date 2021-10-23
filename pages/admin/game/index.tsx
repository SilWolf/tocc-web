import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { Game } from 'types/Game.type'

import apis, {
	ApiGetParams,
	convertDataTableStateToApiParams,
} from 'helpers/api/api.helper'

import { DateSpan } from 'components/Datetime'

import DataTable, {
	DataTableColumnProps,
	DataTableState,
} from 'src/components/DataTable'
import { ProtectAdminPage } from 'src/hooks/withSession.hook'

const AdminGamePage: NextPage = () => {
	const columns = useMemo<DataTableColumnProps<Game>[]>(
		() => [
			{
				id: 'title',
				Header: '標題',
				accessor: 'title',
			},
			{
				id: 'dm',
				Header: 'DM',
				accessor: ({ dm }) => dm?.name,
				disableSortBy: true,
			},
			{
				id: 'startAt',
				Header: '現實時間',
				accessor: ({ startAt }) => <DateSpan>{startAt}</DateSpan>,
			},
			{
				id: 'worldStartAt',
				Header: '世界觀時間',
				accessor: ({ worldStartAt }) => (
					<span>
						第三紀元<DateSpan>{worldStartAt}</DateSpan>
					</span>
				),
			},
			{
				id: 'capacityMin',
				Header: '人數',
				accessor: ({ capacityMin, capacityMax }) =>
					`${capacityMin}-${capacityMax} 人`,
			},
			{
				id: 'lvMin',
				Header: '等級',
				accessor: ({ lvMin, lvMax }) => `Lv. ${lvMin}-${lvMax}`,
			},
			{
				id: 'status',
				Header: '狀態',
				accessor: ({ status }) => {
					switch (status) {
						case 'draft':
							return (
								<span className='p-1 text-xs text-gray-700 dark:text-gray-700 border border-gray-400 bg-gray-100'>
									草稿
								</span>
							)
						case 'published':
							return (
								<span className='p-1 text-xs text-blue-700 dark:text-blue-700 border border-blue-400 bg-blue-100'>
									已發佈, 等待確認報名中
								</span>
							)
						case 'confirmed':
							return (
								<span className='p-1 text-xs text-green-700 dark:text-green-700 border border-green-400 bg-green-100'>
									已確認報名, 等待開團
								</span>
							)
						case 'completed':
							return (
								<span className='p-1 text-xs text-blue-700 dark:text-blue-700 border border-blue-400 bg-blue-100'>
									跑團完成, 等待派發獎勵
								</span>
							)
						case 'done':
							return (
								<span className='p-1 text-xs text-gray-700 dark:text-gray-700 border border-gray-400 bg-gray-100'>
									完成
								</span>
							)
						case 'closed':
							return (
								<span className='p-1 text-xs text-gray-700 dark:text-gray-700 border border-gray-400 bg-gray-100'>
									已取消
								</span>
							)
					}

					return <></>
				},
			},
			{
				id: 'actions',
				Header: '動作',
				accessor: ({ id }) => {
					return (
						<>
							<NextLink href={`/admin/game/${id}`} passHref>
								<a>
									<i className='bi bi-pencil-fill'></i>
								</a>
							</NextLink>
						</>
					)
				},
				disableSortBy: true,
			},
		],
		[]
	)

	const [apiParams, setApiParams] = useState<ApiGetParams>({})
	const { data } = useQuery(
		['games', { params: apiParams }],
		() => apis.dmGetGames({ params: apiParams }),
		{
			keepPreviousData: true,
		}
	)
	const { data: dataTotal } = useQuery(['games', 'count'], apis.getGamesCount)

	const handleTableChangeState = useCallback((state: DataTableState<Game>) => {
		setApiParams(convertDataTableStateToApiParams(state))
	}, [])

	return (
		<>
			<div className='space-y-4'>
				<div className='flex justify-between gap-x-4'>
					<h2>劇本</h2>
					<NextLink href='/admin/game/new' passHref>
						<a className='button button-primary'>新增劇本</a>
					</NextLink>
				</div>
				<DataTable
					data={data || []}
					dataTotal={dataTotal}
					columns={columns}
					onChangeState={handleTableChangeState}
				/>
				<div className='text-center text-xs text-gray-400'>
					如要修改資料或進行更複雜的搜索，請登入 CMS 系統。
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = ProtectAdminPage()

export default AdminGamePage
