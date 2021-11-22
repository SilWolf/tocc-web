import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react'

import styles from './StarRating.module.css'

import classNames from 'classnames'

type Props = HTMLAttributes<HTMLDivElement> & {
	value?: number
	onChange?: (value: number | undefined) => void
	texts?: [string, string, string, string, string]
	showText?: boolean
}

const StarRating = ({
	value: _value,
	onChange,
	texts = [
		'1分 - 強差人意',
		'2分 - 有待改善',
		'3分 - 普通',
		'4分 - 美中不足',
		'5分 - 太棒了！',
	],
	showText = false,
	className,
	...others
}: Props) => {
	const [value, setValue] = useState<number | undefined>(_value)

	const handleClickStar = useCallback(
		(newValue: number) => () => {
			setValue(newValue)
		},
		[]
	)

	useEffect(() => {
		onChange?.(value)
	}, [onChange, value])

	return (
		<div className={classNames(className, styles.StarRating)} {...others}>
			{[1, 2, 3, 4, 5].map((i) => (
				<button key={i} type='button' onClick={handleClickStar(i)}>
					<i
						className={classNames('icon-star bi bi-star-fill', {
							active: value !== undefined && i <= value,
						})}
					></i>
				</button>
			))}
			{showText && texts[(value || 0) - 1] && (
				<div className='star-text'>
					<strong>{texts[(value || 0) - 1]}</strong>
				</div>
			)}
		</div>
	)
}

export default StarRating
