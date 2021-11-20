import React, { useCallback, useEffect, useState } from 'react'

type Props = {
	value?: string
	onChange?: (value: string) => void
}

const RewardTypeSelector = ({ value: _value, onChange }: Props) => {
	const [value, setValue] = useState<string>(_value || 'gp')
	const [showOther, setShowOther] = useState<boolean>(
		_value !== 'gp' && _value !== 'xp'
	)
	const [othersName, setOthersName] = useState<string>(_value || '')

	const handleChangeSelect = useCallback<
		React.ChangeEventHandler<HTMLSelectElement>
	>((event) => {
		event?.preventDefault()
		setValue(event?.target.value)
		if (event?.target.value === 'others') {
			setShowOther(true)
		}
	}, [])

	const handleChangeOthersNameInput = useCallback<
		React.ChangeEventHandler<HTMLInputElement>
	>((event) => {
		setValue(event.target.value)
		setOthersName(event.target.value)
	}, [])

	useEffect(() => {
		onChange?.(value)
	}, [onChange, value])

	const handleClickCancelOthers = useCallback(() => {
		setShowOther(false)
		setValue('gp')
	}, [])

	if (showOther) {
		return (
			<div className='relative'>
				<input
					type='text'
					value={othersName}
					onChange={handleChangeOthersNameInput}
					placeholder='例: 名望值、某人好感度'
				/>
				<button
					type='button'
					onClick={handleClickCancelOthers}
					className='absolute right-2 top-0 bottom-0'
				>
					<i className='bi bi-x'></i>
				</button>
			</div>
		)
	}

	return (
		<select value={value} onChange={handleChangeSelect}>
			<option value='gp'>gp</option>
			<option value='xp'>xp</option>
			<option value='others'>其他(需註明)</option>
		</select>
	)
}

export default RewardTypeSelector
