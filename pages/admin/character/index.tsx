import { NextPage } from 'next'
import NextLink from 'next/link'

import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { Character } from 'types/Character.type'

import * as api from 'helpers/api/api.helper'

import DataTable, {
	DataTableColumnProps,
	DataTableState,
} from 'components/DataTable'

type PAGE_TABLE_DATA_TYPE = Character

const AdminCharacterPage: NextPage = () => {
	const columns = useMemo<DataTableColumnProps<PAGE_TABLE_DATA_TYPE>[]>(
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
				id: 'level',
				Header: '等級',
				accessor: 'level',
			},
			{
				id: 'playerName',
				Header: '玩家',
				accessor: ({ player }) =>
					player ? `${player?.name} (${player?.code})` : '---',
				disableSortBy: true,
			},
			{
				id: 'cityName',
				Header: '所屬城市',
				accessor: ({ city }) =>
					city ? `${city?.name} (${city?.code})` : '---',
				disableSortBy: true,
			},
			{
				id: 'xp',
				Header: 'XP',
				accessor: 'xp',
			},
			{
				id: 'gp',
				Header: 'GP',
				accessor: 'gp',
			},
			{
				id: 'actions',
				Header: '動作',
				accessor: ({ id }) => {
					return (
						<>
							<NextLink href={`/admin/character/${id}`} passHref>
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

	const [apiParams, setApiParams] = useState<api.ApiGetParams>({})
	const { data } = useQuery(
		['characters', { params: apiParams }],
		() => api.dmGetCharacters({ params: apiParams }),
		{
			keepPreviousData: true,
		}
	)

	const handleTableChangeState = useCallback(
		(state: DataTableState<PAGE_TABLE_DATA_TYPE>) => {
			const newApiParams: api.ApiGetParams = {}

			if (state.sortBy) {
				newApiParams._sort = state.sortBy
					.map((sortBy) => `${sortBy.id}:${sortBy.desc ? 'DESC' : 'ASC'}`)
					.join(',')
			}

			setApiParams(newApiParams)
		},
		[]
	)

	return (
		<>
			<div className='space-y-4'>
				<div className='text-right space-x-2'>
					<NextLink href='/admin/character/new' passHref>
						<a className='button button-primary'>新增劇本</a>
					</NextLink>
				</div>
				<div className='w-full overflow-x-auto'>
					<DataTable
						data={data || []}
						columns={columns}
						onChangeState={handleTableChangeState}
					/>
				</div>
				<div className='text-center text-xs text-gray-400'>
					如要修改資料或進行更複雜的搜索，請登入 CMS 系統。
				</div>
			</div>
		</>
	)
}
export default AdminCharacterPage
