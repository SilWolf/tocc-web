import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { User } from 'types/User.type'

import apis, {
	ApiGetParams,
	convertDataTableStateToApiParams,
} from 'helpers/api/api.helper'

import DataTable, {
	DataTableColumnProps,
	DataTableState,
} from 'components/DataTable'

import Chip from 'src/components/Chip'
import { ProtectAdminPage } from 'src/hooks/withSession.hook'

const AdminPlayerPage: NextPage = () => {
	const columns = useMemo<DataTableColumnProps<User>[]>(
		() => [
			{
				id: 'name',
				Header: '名稱',
				accessor: 'name',
			},
			{
				id: 'code',
				Header: '代碼',
				accessor: 'code',
			},
			{
				id: 'email',
				Header: 'Email',
				accessor: 'email',
			},
			{
				id: 'cityName',
				Header: '所屬城市',
				accessor: ({ city }) =>
					city ? `${city?.name} (${city?.code})` : '---',
				disableSortBy: true,
			},
			{
				id: 'confirmed',
				Header: '驗證？',
				accessor: ({ confirmed }) =>
					confirmed ? (
						<Chip className='text-green-700 border-green-400 bg-green-100'>
							已驗證
						</Chip>
					) : (
						<Chip className='text-red-700 border-red-400 bg-red-100'>
							未驗證
						</Chip>
					),
			},
			{
				id: 'blocked',
				Header: '封鎖？',
				accessor: ({ blocked }) =>
					blocked && (
						<Chip className='text-red-700 border-red-400 bg-red-100'>
							已封鎖
						</Chip>
					),
			},
			{
				id: 'actions',
				Header: '動作',
				accessor: ({ id }) => {
					return (
						<>
							<NextLink href={`/admin/user/${id}`} passHref>
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
		['users', { params: apiParams }],
		() => apis.dmGetPlayers({ params: apiParams }),
		{
			keepPreviousData: true,
		}
	)
	const { data: dataTotal } = useQuery(['users', 'count'], apis.getPlayersCount)

	const handleTableChangeState = useCallback((state: DataTableState<User>) => {
		setApiParams(convertDataTableStateToApiParams(state))
	}, [])

	return (
		<>
			<div className='space-y-4'>
				<div className='flex justify-between gap-x-4'>
					<h2>玩家</h2>
					<NextLink href='/admin/user/new' passHref>
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

export default AdminPlayerPage
