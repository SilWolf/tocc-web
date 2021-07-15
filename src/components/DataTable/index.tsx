import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	Column,
	TableState,
	usePagination,
	useSortBy,
	useTable,
	UseTableOptions,
} from 'react-table'

import { Input } from '../Form'

export type DataTableColumnProps<T extends Record<string, unknown>> = Column<T>
export type DataTableState<T extends Record<string, unknown>> = TableState<T>

type Props<T extends Record<string, unknown>> = UseTableOptions<T> & {
	onChangeState?: (_: DataTableState<T>) => void
	dataTotal?: number
}

type DataTablePaginationProps = {
	pageCount?: number
	pageIndex?: number
	onClickFirstPage?: () => void
	onClickPreviousPage?: () => void
	onClickNextPage?: () => void
	onClickLastPage?: () => void
	onChangePage?: (index: number) => void
}

const DateTablePagination = React.memo(
	({
		pageCount = 1,
		pageIndex = 0,
		onClickFirstPage,
		onClickLastPage,
		onClickPreviousPage,
		onClickNextPage,
		onChangePage,
	}: DataTablePaginationProps): JSX.Element => {
		const pageOptions = useMemo(
			() =>
				Array(pageCount)
					.fill(undefined)
					.map((_, i) => i),
			[pageCount]
		)

		const handleChangePage = useCallback(
			(e: any) => {
				console.log(e)
				onChangePage?.(parseInt(e.target.value))
			},
			[onChangePage]
		)

		return (
			<>
				<div className='flex items-center gap-x-2'>
					<button
						className='button button-primary p-0 h-9 w-9 leading-9 text-center'
						onClick={onClickPreviousPage}
					>
						<i className='bi bi-caret-left-fill'></i>
					</button>
					<Input
						type='select'
						value={pageIndex}
						wrapperProps={{ className: 'w-auto inline-block' }}
						onChange={handleChangePage}
					>
						{pageOptions.map((i) => (
							<option key={i + 1} value={i}>
								{i + 1}
							</option>
						))}
					</Input>
					<button
						className='button button-primary p-0 h-9 w-9 leading-9 text-center'
						onClick={onClickNextPage}
					>
						<i className='bi bi-caret-right-fill'></i>
					</button>
				</div>
			</>
		)
	}
)

const DataTable = <T extends Record<string, unknown>>({
	columns,
	data,
	dataTotal = 0,
	onChangeState,
	...others
}: Props<T>): JSX.Element => {
	const [pageSize, setPageSize] = useState<number>(10)
	const pageCount = useMemo(
		() => Math.ceil(dataTotal / pageSize),
		[dataTotal, pageSize]
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
		gotoPage,
		previousPage,
		nextPage,
	} = useTable(
		{
			columns,
			data: data || [],

			manualSortBy: true,

			initialState: {
				pageSize: 10,
				pageIndex: 0,
			},
			pageCount: pageCount,
			manualPagination: true,

			...others,
		},
		useSortBy,
		usePagination
	)

	useEffect(() => {
		console.log(state)
		onChangeState?.(state)
	}, [onChangeState, state])

	return (
		<>
			<div className='flex justify-between items-end'>
				<p className='text-gray-400 text-sm'>共有 {dataTotal} 筆紀錄</p>
				<DateTablePagination
					pageCount={pageCount}
					pageIndex={state.pageIndex}
					onChangePage={gotoPage}
					onClickPreviousPage={previousPage}
					onClickNextPage={nextPage}
				/>
			</div>
			<div className='w-full overflow-x-auto'>
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
											{column.isSorted ? (
												column.isSortedDesc ? (
													<span>
														{' '}
														<i className='bi bi-arrow-down'></i>
													</span>
												) : (
													<span>
														{' '}
														<i className='bi bi-arrow-up'></i>
													</span>
												)
											) : (
												''
											)}
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
			</div>
		</>
	)
}

export default DataTable
