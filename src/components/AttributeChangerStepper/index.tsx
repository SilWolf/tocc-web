import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styles from './AttributeChangerStepper.module.css'

export type AttributeChangerStepperResult = {
	value: number
	valueDelta: number
	bonusValue: number
	bonusValueDelta: number
	point: number
}

type Props = {
	defaultValue?: number
	max?: number
	min?: number
	defaultBonusValue?: number
	bonusMax?: number
	bonusMin?: number
	onChange?: (result: AttributeChangerStepperResult) => void
	canPlusOne?: boolean
	canMinusOne?: boolean
	canBonusPlusOne?: boolean
	canBonusMinusOne?: boolean
}

const AttributeChangerStepper = ({
	defaultValue = 0,
	defaultBonusValue = 0,
	canPlusOne: _canPlusOne = true,
	canMinusOne: _canMinusOne = true,
	min,
	max,
	bonusMin,
	bonusMax,
	canBonusPlusOne: _canBonusPlusOne = true,
	canBonusMinusOne: _canBonusMinusOne = true,
	onChange,
}: Props): JSX.Element => {
	const [value, setValue] = useState(defaultValue)

	const canPlusOne = useMemo(() => {
		return (max === undefined || value < max) && _canPlusOne
	}, [_canPlusOne, min, value])
	const canMinusOne = useMemo(() => {
		return (min === undefined || value > min) && _canMinusOne
	}, [_canMinusOne, max, value])

	const handleClickPlusOne = useCallback(() => {
		setValue((prev) => prev + 1)
	}, [])
	const handleClickMinusOne = useCallback(() => {
		setValue((prev) => prev - 1)
	}, [])

	const [bonusValue, setBonusValue] = useState(defaultBonusValue)

	const canBonusPlusOne = useMemo(() => {
		return (bonusMax === undefined || bonusValue < bonusMax) && _canBonusPlusOne
	}, [_canBonusPlusOne, bonusMin, bonusValue])
	const canBonusMinusOne = useMemo(() => {
		return (
			(bonusMin === undefined || bonusValue > bonusMin) && _canBonusMinusOne
		)
	}, [_canBonusMinusOne, bonusMax, bonusValue])

	const handleClickBonusPlusOne = useCallback(() => {
		setBonusValue((prev) => prev + 1)
	}, [])
	const handleClickBonusMinusOne = useCallback(() => {
		setBonusValue((prev) => prev - 1)
	}, [])

	const point = useMemo(
		() => Math.max(0, value - 8) + Math.max(0, value - 13),
		[value]
	)

	useEffect(() => {
		if (onChange) {
			onChange({
				value,
				valueDelta: value - defaultValue,
				bonusValue,
				bonusValueDelta: bonusValue - defaultBonusValue,
				point,
			})
		}
	}, [value, bonusValue, defaultValue, defaultBonusValue, point, onChange])

	return (
		<div className={styles.AttributeChangerStepper}>
			<div className='text-center space-x-0.5'>
				<button
					className='ns-button-plus ns-button ns-button-plus-one'
					onClick={handleClickPlusOne}
					disabled={!canPlusOne}
				>
					{value}
				</button>
				<button
					className='ns-button-plus ns-button-bonus ns-button-bonus-plus-one'
					onClick={handleClickBonusPlusOne}
					disabled={!canBonusPlusOne}
				>
					{bonusValue}
				</button>
			</div>
			<div className='text-center ns-value'>{value + bonusValue}</div>
			<div className='text-center ns-point'>({point}pt)</div>
			<div className='text-center space-x-0.5'>
				<button
					className='ns-button-minus ns-button ns-button-minus-one'
					onClick={handleClickMinusOne}
					disabled={!canMinusOne}
				>
					&nbsp;
				</button>
				<button
					className='ns-button-minus ns-button-bonus ns-button-bonus-minus-one'
					onClick={handleClickBonusMinusOne}
					disabled={!canBonusMinusOne}
				>
					&nbsp;
				</button>
			</div>
		</div>
	)
}

export default AttributeChangerStepper
export type AttributeChangerStepperProps = Props
