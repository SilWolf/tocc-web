import React, { HTMLAttributes, useCallback, useState } from 'react'

import cns from 'classnames'

export enum ButtonSelectorOptionIconTypeEnum {
	CHECK = 'check',
	ASC = 'asc',
	DESC = 'desc',
}

export type ButtonSelectorOptionBase<T = unknown> = {
	key: string
	label: React.ReactNode
	value: T
	iconType?: ButtonSelectorOptionIconTypeEnum
}

export type ButtonSelectorOption<T = unknown> =
	| ButtonSelectorOptionBase<T>
	| ButtonSelectorOptionBase<T>[]

type Props<T> = HTMLAttributes<HTMLDivElement> & {
	options: ButtonSelectorOption[]
	onChangeOption?: (option: T) => void
}

const ButtonSelector = <T,>({
	options,
	onChangeOption,
	...others
}: Props<T>) => {
	const [activeOptionIndex, setActiveOptionIndex] = useState<[number, number]>([
		0, 0,
	])

	const handleClickOption = useCallback(
		(newMainIndex: number) => {
			if (newMainIndex === activeOptionIndex[0]) {
				const _option = options[activeOptionIndex[0]]
				if (Array.isArray(_option)) {
					const newSubIndex = (activeOptionIndex[1] + 1) % _option.length
					setActiveOptionIndex([newMainIndex, newSubIndex])
					onChangeOption?.(_option[newSubIndex].value as unknown as T)
				}

				return
			}

			setActiveOptionIndex([newMainIndex, 0])
			if (onChangeOption) {
				if (Array.isArray(options[newMainIndex])) {
					onChangeOption(
						(options[newMainIndex] as ButtonSelectorOptionBase<T>[])[0].value
					)
				} else {
					onChangeOption?.(
						(options[newMainIndex] as ButtonSelectorOptionBase<T>).value
					)
				}
			}
		},
		[activeOptionIndex, setActiveOptionIndex, onChangeOption, options]
	)

	return (
		<div {...others}>
			{options.map((option, index) => {
				let _option = option as ButtonSelectorOptionBase<T>
				if (Array.isArray(option)) {
					_option = option[
						activeOptionIndex[0] === index ? activeOptionIndex[1] : 0
					] as ButtonSelectorOptionBase<T>
				}

				return (
					<div
						data-ripplet
						className={cns(
							'w-full',
							activeOptionIndex[0] === index ? 'text-primary' : 'text-black'
						)}
						key={_option.key}
						onClick={() => handleClickOption(index)}
					>
						<div className='flex gap-x-3 py-2 pr-2 border-b'>
							<div className='flex-1'>{_option.label}</div>
							{activeOptionIndex[0] === index && (
								<div className='flex-none'>
									{_option.iconType === 'asc' ? (
										<i className='bi bi-arrow-up'></i>
									) : _option.iconType === 'desc' ? (
										<i className='bi bi-arrow-down'></i>
									) : (
										<i className='bi bi-check'></i>
									)}
								</div>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default React.memo(ButtonSelector)
