import React, { ButtonHTMLAttributes } from 'react'

import styles from './MedievalButton.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	color: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning'
}

const MedievalButton = ({
	children,
	color = 'primary',
	className,
	...props
}: Props): JSX.Element => {
	return (
		<div className={`${styles.medievalButton} ${className}`}>
			<button className={`mb-btn mb-style-${color}`} {...props}>
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
