import React, { useCallback, useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'

type Props = Omit<ReactDatePickerProps, 'onChange' | 'value'> & {
	onChange: (value: string | null) => void
	value?: string | null
}

const DateTimePicker = ({ onChange, value, ...others }: Props): JSX.Element => {
	const [date, setDate] = useState<Date>(() => {
		if (value) {
			return new Date(value)
		}
		const today = new Date()
		today.setHours(today.getHours() + 1)
		today.setMinutes(0, 0, 0)

		return today
	})

	const handleChange = useCallback(
		(newDate) => {
			setDate(newDate)
			onChange?.(newDate.toISOString())
		},
		[onChange, setDate]
	)

	return (
		<div>
			<ReactDatePicker
				dateFormat='dd-MM-yyyy, HH:mm'
				{...others}
				onChange={handleChange}
				selected={date}
				showTimeSelect
				timeIntervals={10}
			/>
		</div>
	)
}

export default DateTimePicker
