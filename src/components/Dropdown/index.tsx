import React, { HTMLAttributes } from 'react'

import styles from './Dropdown.module.css'

import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
	header: React.ReactNode
}

const Dropdown = ({
	children,
	header,
	className,
	...others
}: Props): JSX.Element => {
	return (
		<div className={classNames(styles.dropdown, className)} {...others}>
			<div className='dropdown-header'>{header}</div>
			<div className='dropdown-body'>{children}</div>
		</div>
	)
}

export default Dropdown
