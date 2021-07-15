import { useEffect } from 'react'
import {
	Column,
	TableState,
	useSortBy,
	useTable,
	UseTableOptions,
} from 'react-table'

export type DataTableColumnProps<T extends Record<string, unknown>> = Column<T>
export type DataTableState<T extends Record<string, unknown>> = TableState<T>

type Props<T extends Record<string, unknown>> = UseTableOptions<T> & {
	onChangeState?: (_: DataTableState<T>) => void
}

const DataTable = <T extends Record<string, unknown>>({
	columns,
	data,
	onChangeState,
	...others
}: Props<T>): JSX.Element => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
	} = useTable(
		{ columns, data: data || [], manualSortBy: true, ...others },
		useSortBy
	)

	useEffect(() => {
		onChangeState?.(state)
	}, [onChangeState, state])

	return (
		<table {...getTableProps} className='table-default'>
			<thead>
				{headerGroups.map((headerGroup) => (
					// eslint-disable-next-line react/jsx-key
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							// eslint-disable-next-line react/jsx-key
							<th {...column.getHeaderProps(column.getSortByToggleProps())}>
								{column.render('Header')}
								<span>
									{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
								</span>
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
	)
}

export default DataTable
