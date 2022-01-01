import React, { HTMLAttributes } from 'react'

import styles from './Badge.module.css'

import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
	type?: 'default' | 'success' | 'danger' | 'warning'
}

const Badge = ({ type = 'default', className, children, ...others }: Props) => {
	return (
		<div
			className={classNames(styles.badge, `badge-${type}`, className)}
			{...others}
		>
			{children}
		</div>
	)
}

export default Badge
