import { NextPage } from 'next'
import NextLink from 'next/link'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useTable, Column } from 'react-table'

import { City } from 'types/City.type'

import * as api from 'helpers/api/api.helper'

const AdminCityPage: NextPage = () => {
	const columns = useMemo<Column<City>[]>(
		() => [
			{
				Header: '名稱',
				accessor: 'name',
			},
			{
				Header: '代碼',
				accessor: 'code',
			},
			{
				Header: '城市等級',
				accessor: () => 0,
			},
			{
				Header: '繁榮度',
				accessor: () => '0/0',
			},
			{
				Header: '所屬店舖',
				accessor: 'shopName',
			},
			{
				Header: '已登記玩家人數',
				accessor: () => '0人',
			},
			{
				Header: '已登記角色人數',
				accessor: () => '0名',
			},
			{
				Header: '動作',
				accessor: ({ id }) => {
					return (
						<>
							<NextLink href={`/admin/city/${id}`} passHref>
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

	const { data } = useQuery('cities', api.getCities)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data: data || [] })

	return (
		<>
			<div className='space-y-4'>
				<div className='text-right space-x-2'>
					<NextLink href='/admin/city/new' passHref>
						<a className='button button-primary'>新增劇本</a>
					</NextLink>
				</div>
				<div className='w-full overflow-x-auto'>
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
				</div>
				<div className='text-center text-xs text-gray-400'>
					如要修改資料或進行更複雜的搜索，請登入 CMS 系統。
				</div>
			</div>
		</>
	)
}
export default AdminCityPage
