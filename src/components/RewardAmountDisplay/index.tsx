import React from 'react'

const RewardAmountDisplay = React.memo(
	(props: {
		amount: number
		unit: string
		isPerPlayer?: boolean
		showOnZero?: boolean
	}) => {
		if (
			(props.amount === 0 && !props.showOnZero) ||
			props.amount === undefined
		) {
			return <></>
		}

		return (
			<span>
				{props.isPerPlayer === undefined
					? ''
					: props.isPerPlayer === true
					? '每人 '
					: '平分 '}
				{props.amount.toFixed(0)} {props.unit}
			</span>
		)
	}
)

export default RewardAmountDisplay
