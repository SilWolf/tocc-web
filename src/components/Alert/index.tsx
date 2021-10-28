import classNames from 'classnames'
import React from 'react'
import { HTMLAttributes } from 'react-transition-group/node_modules/@types/react'

import styles from './Alert.module.css'

type Props = HTMLAttributes<HTMLDivElement> & {
	type?: 'default' | 'success' | 'danger'
}

const Alert = ({ type = 'default', className, children, ...others }: Props) => {
	return (
		<div
			className={classNames(styles.alert, `alert-${type}`, className)}
			{...others}
		>
			{children}
		</div>
	)
}

export default Alert
