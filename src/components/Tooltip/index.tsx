import React, { HTMLAttributes } from 'react'

import styles from './Tooltip.module.css'

import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
	type?: 'default' | 'success' | 'danger' | 'warning'
}

const Tooltip = ({
	type = 'default',
	className,
	children,
	...others
}: Props) => {
	return (
		<div
			className={classNames(styles.tooltip, `tooltip-${type}`, className)}
			{...others}
		>
			{children}
		</div>
	)
}

export default Tooltip
