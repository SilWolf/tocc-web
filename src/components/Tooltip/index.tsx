import React, { HTMLAttributes } from 'react'

import styles from './Tooltip.module.css'

import classNames from 'classnames'

type Props = HTMLAttributes<HTMLSpanElement> & {
	component: React.ReactNode
}

const Tooltip = ({ className, children, component, ...others }: Props) => {
	return (
		<div className={classNames(styles.tooltip, className)} {...others}>
			<div className='tooltip-trigger'>{component}</div>
			<div className='tooltip-popup'>
				<div className='tooltip-popup-body'>{children}</div>
			</div>
		</div>
	)
}

export default Tooltip
