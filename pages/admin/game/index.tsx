import { NextPage } from 'next'
import NextLink from 'next/link'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useTable, Column } from 'react-table'

import { Game } from '../../../types/Game.type'

import * as api from '../../../apis/api.helper'

import { DateSpan } from '../../../components/Datetime'

const AdminGamePage: NextPage = () => {
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
				accessor: ({ status }) => {
					switch (status) {
						case 'published':
							return (
								<p className='py-1 text-xs text-green-700 border border-green-400 bg-green-100'>
									已發佈
								</p>
							)
					}

					return <></>
				},
			},
			{
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
				<div className='text-right space-x-2'>
					<NextLink href='/admin/game/new' passHref>
						<a className='button button-primary'>新增劇本</a>
					</NextLink>
				</div>
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
export default AdminGamePage
