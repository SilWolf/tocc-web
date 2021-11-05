import React from 'react'

type Props = React.HTMLAttributes<HTMLSpanElement>

const weekdayMap = ['日', '一', '二', '三', '四', '五', '六']
const WeekdaySpan: React.FC<Props> = ({ children, ...others }) => {
	const date = new Date(children as string)
	try {
		return <span {...others}>{weekdayMap[date.getDay()]}</span>
	} catch (e) {
		return <></>
	}
}

const WeekdaySpanMemoed = React.memo(WeekdaySpan)
WeekdaySpanMemoed.displayName = 'WeekdaySpan'

export default WeekdaySpanMemoed
