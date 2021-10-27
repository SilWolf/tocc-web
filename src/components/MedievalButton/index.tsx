import React, { AnchorHTMLAttributes, useCallback } from 'react'

import styles from './MedievalButton.module.css'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'> & {
	color?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning'
	disabled?: boolean
	type?: 'button' | 'submit'
}

const MedievalButton = ({
	children,
	color = 'primary',
	className,
	disabled,
	href,
	onClick,
	type,
	...props
}: Props): JSX.Element => {
	const handleClick = useCallback(
		(e: any) => {
			if (!href && !type) {
				e.preventDefault()
			}
			onClick?.(e)
		},
		[href, onClick, type]
	)

	if (href) {
		return (
			<div className={`${styles.medievalButton} ${className}`}>
				<a
					onClick={handleClick}
					className={`mb-btn mb-style-${color} ${
						disabled ? 'mb-disabled' : ''
					}`}
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

	return (
		<div className={`${styles.medievalButton} ${className}`}>
			<button
				onClick={handleClick}
				className={`mb-btn mb-style-${color} ${disabled ? 'mb-disabled' : ''}`}
				disabled={disabled}
				type={type}
			>
				<div className='mb-ring'>
					<div className='mb-edge'>
						<div className='mb-body'>
							<span className='mb-text'>{children}</span>
						</div>
					</div>
				</div>
				<div className='mb-overlay'></div>
			</button>
		</div>
	)
}

export default MedievalButton
