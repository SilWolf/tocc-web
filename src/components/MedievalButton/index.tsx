import React, { AnchorHTMLAttributes, useCallback } from 'react'

import styles from './MedievalButton.module.css'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	color?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning'
	disabled?: boolean
}

const MedievalButton = ({
	children,
	color = 'primary',
	className,
	disabled,
	href,
	onClick,
	...props
}: Props): JSX.Element => {
	const handleClick = useCallback<React.MouseEventHandler<HTMLAnchorElement>>(
		(e) => {
			if (!href) {
				e.preventDefault()
			}
			onClick?.(e)
		},
		[href, onClick]
	)

	return (
		<div className={`${styles.medievalButton} ${className}`}>
			<a
				onClick={handleClick}
				className={`mb-btn mb-style-${color} ${disabled ? 'mb-disabled' : ''}`}
				href={!disabled ? href : ''}
				{...props}
			>
				<div className='mb-ring'>
					<div className='mb-edge'>
						<div className='mb-body'>
							<span className='mb-text'>{children}</span>
						</div>
					</div>
				</div>
				<div className='mb-overlay'></div>
			</a>
		</div>
	)
}

export default MedievalButton
