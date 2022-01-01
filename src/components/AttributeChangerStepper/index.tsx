import React, { useCallback, useEffect, useMemo, useState } from 'react'

import styles from './AttributeChangerStepper.module.css'

export type AttributeChangerStepperResult = {
	value: number
	valueDelta: number
	raceValue: number
	raceValueDelta: number
	point: number
}

type Props = {
	defaultValue?: number
	max?: number
	min?: number
	defaultRaceValue?: number
	raceMax?: number
	raceMin?: number
	onChange?: (result: AttributeChangerStepperResult) => void
	canPlusOne?: boolean
	canMinusOne?: boolean
	canRacePlusOne?: boolean
	canRaceMinusOne?: boolean
}

const AttributeChangerStepper = ({
	defaultValue = 0,
	defaultRaceValue = 0,
	canPlusOne: _canPlusOne = true,
	canMinusOne: _canMinusOne = true,
	min,
	max,
	raceMin,
	raceMax,
	canRacePlusOne: _canRacePlusOne = true,
	canRaceMinusOne: _canRaceMinusOne = true,
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

	const [raceValue, setRaceValue] = useState(defaultRaceValue)

	const canRacePlusOne = useMemo(() => {
		return (raceMax === undefined || raceValue < raceMax) && _canRacePlusOne
	}, [_canRacePlusOne, raceMin, raceValue])
	const canRaceMinusOne = useMemo(() => {
		return (raceMin === undefined || raceValue > raceMin) && _canRaceMinusOne
	}, [_canRaceMinusOne, raceMax, raceValue])

	const handleClickRacePlusOne = useCallback(() => {
		setRaceValue((prev) => prev + 1)
	}, [])
	const handleClickRaceMinusOne = useCallback(() => {
		setRaceValue((prev) => prev - 1)
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
				raceValue,
				raceValueDelta: raceValue - defaultRaceValue,
				point,
			})
		}
	}, [value, raceValue, defaultValue, defaultRaceValue, point, onChange])

	return (
		<div className={styles.AttributeChangerStepper}>
			<div className='ns-value'>{value + raceValue}</div>
			<div className='ns-controls'>
				<div className='ns-control'>
					<div className='ns-control-button-wrapper'>
						<button
							className='ns-button ns-button-point ns-button-plus'
							onClick={handleClickPlusOne}
							disabled={!canPlusOne}
						>
							+
						</button>
					</div>

					<div className='ns-control-value'>{point}pt</div>

					<div className='ns-control-button-wrapper'>
						<button
							className='ns-button ns-button-point ns-button-minus'
							onClick={handleClickMinusOne}
							disabled={!canMinusOne}
						>
							-
						</button>
					</div>
				</div>
				<div className='ns-control'>
					<div className='ns-control-button-wrapper'>
						<button
							className='ns-button ns-button-race ns-button-plus'
							onClick={handleClickRacePlusOne}
							disabled={!canRacePlusOne}
						>
							+
						</button>
					</div>

					<div className='ns-control-value'>{raceValue}種族</div>

					<div className='ns-control-button-wrapper'>
						<button
							className='ns-button ns-button-race ns-button-minus'
							onClick={handleClickRaceMinusOne}
							disabled={!canRaceMinusOne}
						>
							-
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AttributeChangerStepper
export type AttributeChangerStepperProps = Props
