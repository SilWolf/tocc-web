import React, { useCallback, useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

type Props = Omit<ReactDatePickerProps, 'onChange' | 'value'> & {
	onChange: (dates: [string | undefined, string | undefined]) => void
	value?: [string | undefined | null, string | undefined | null]
}

const DateRangePicker = ({
	onChange,
	value,
	...others
}: Props): JSX.Element => {
	const [dates, setDates] = useState<[Date | null, Date | null]>(() => {
		console.log(value)
		if (value) {
			return [
				value[0] ? new Date(value[0]) : null,
				value[1] ? new Date(value[1]) : null,
			]
		}

		const today = new Date()
		const tomorrow = new Date()
		tomorrow.setDate(tomorrow.getDate() + 1)
		// today.setFullYear(today.getFullYear() - 758)
		return [today, tomorrow]
	})

	const handleChange = useCallback(
		(newDates: [Date | null, Date | null]) => {
			setDates(newDates)
			onChange?.([newDates[0]?.toISOString(), newDates[1]?.toISOString()])
		},
		[onChange, setDates]
	)

	return (
		<div>
			<ReactDatePicker
				dateFormat='dd-MM-yyyy'
				{...others}
				onChange={handleChange}
				startDate={dates[0]}
				endDate={dates[1]}
				selectsRange
			/>
		</div>
	)
}

export default DateRangePicker
