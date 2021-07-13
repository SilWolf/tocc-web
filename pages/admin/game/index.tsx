import { NextPage } from 'next'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useTable, Column } from 'react-table'

import { Game } from '../../../types/Game.type'

import * as api from '../../../apis/api.helper'

import { DateSpan } from '../../../components/Datetime'

const AdminIndexPage: NextPage = () => {
	const columns = useMemo<Column<Game>[]>(
		() => [
			{
				Header: '標題',
				accessor: 'title',
			},
			{
				Header: 'DM',
				accessor: ({ dm }) => dm?.name,
			},
			{
				Header: '現實時間',
				accessor: ({ startAt }) => <DateSpan>{startAt}</DateSpan>,
			},
			{
				Header: '世界觀時間',
				accessor: ({ worldStartAt }) => (
					<span>
						第三紀元<DateSpan>{worldStartAt}</DateSpan>
					</span>
				),
			},
			{
				Header: '人數',
				accessor: ({ capacityMin, capacityMax }) =>
					`${capacityMin}-${capacityMax} 人`,
			},
			{
				Header: '等級',
				accessor: ({ lvMin, lvMax }) => `Lv. ${lvMin}-${lvMax}`,
			},
			{
				Header: '狀態',
				accessor: 'status',
			},
		],
		[]
	)

	const query = useQuery('games', () => api.getGames())

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: query.data || [] })

	return (
		<>
			<div className='space-y-4'>
				<table {...getTableProps} className='table-default'>
					<thead>
						{headerGroups.map((headerGroup) => (
							// eslint-disable-next-line react/jsx-key
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									// eslint-disable-next-line react/jsx-key
									<th {...column.getHeaderProps()}>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row)
							return (
								// eslint-disable-next-line react/jsx-key
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											// eslint-disable-next-line react/jsx-key
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
				<div className='text-center text-xs text-gray-400'>
					如要修改資料或進行更複雜的搜索，請登入 CMS 系統。
				</div>
			</div>
		</>
	)
}
export default AdminIndexPage
