import React from 'react'

import dateFnsLightFormat from 'date-fns/lightFormat'

type Props = React.HTMLAttributes<HTMLSpanElement> & {
	format?: string
}

const DateSpan: React.FC<Props> = ({
	format = 'yyyy-MM-dd',
	children,
	...others
}) => {
	try {
		return (
			<span {...others}>
				{dateFnsLightFormat(new Date(children as string), format)}
			</span>
		)
	} catch (e) {
		return <></>
	}
}

const DateSpanMemoed = React.memo(DateSpan)
DateSpanMemoed.displayName = 'DateSpan'

export default DateSpanMemoed
