import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import styles from './switch.component.module.css'

type Props = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>

const Switch = (props: Props): JSX.Element => {
	return (
		<div className={styles.toggleWrapper}>
			<input
				type='checkbox'
				name='toggle'
				id='toggle'
				className='toggle-checkbox'
				{...props}
			/>
			<label htmlFor='toggle' className='toggle-label'></label>
		</div>
	)
}

export default Switch
