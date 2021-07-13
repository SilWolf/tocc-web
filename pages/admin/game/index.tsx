import { NextPage } from 'next'
import { useMemo } from 'react'
import { useTable, Column } from 'react-table'
import { Game } from '../../../types/Game.type'

import * as api from '../../../apis/api.helper'
import { useQuery } from 'react-query'

const AdminIndexPage: NextPage = () => {
	const columns = useMemo<Column<Game>[]>(
		() => [
			{
				Header: '標題',
				accessor: 'title',
			},
			{
				Header: 'DM',
				accessor: 'dm',
			},
			{
				Header: '現實時間',
				accessor: 'startAt',
			},
			{
				Header: '世界觀時間',
				accessor: 'worldStartAt',
			},
			{
				Header: '人數',
				accessor: 'capacityMin',
			},
			{
				Header: '等級',
				accessor: 'lvMin',
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
											<td
												{...cell.getCellProps()}
												style={{
													padding: '10px',
													border: 'solid 1px gray',
													background: 'papayawhip',
												}}
											>
												{cell.render('Cell')}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}
export default AdminIndexPage
