import React, {
	HTMLAttributes,
	InputHTMLAttributes,
	SelectHTMLAttributes,
	TextareaHTMLAttributes,
	useMemo,
} from 'react'
import { FieldError } from 'react-hook-form'

import styles from './input.component.module.css'

import cns from 'classnames'
// import { useTranslations } from 'next-intl'

type LabelProps = HTMLAttributes<HTMLLabelElement>
type WrapperProps = HTMLAttributes<HTMLDivElement>
type HelperTextProps = HTMLAttributes<HTMLParagraphElement>
type ErrorTextProps = HTMLAttributes<HTMLParagraphElement>

type ErrorProps = FieldError

type Props = (InputHTMLAttributes<HTMLInputElement> &
	SelectHTMLAttributes<HTMLSelectElement> &
	TextareaHTMLAttributes<HTMLTextAreaElement>) & {
	type?:
		| 'select'
		| 'textarea'
		| 'static'
		| 'button'
		| 'checkbox'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'radio'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week'
	label?: string | undefined
	labelProps?: LabelProps
	wrapperProps?: WrapperProps
	helperText?: React.ReactNode
	helperTextProps?: HelperTextProps
	error?: ErrorProps | undefined
	errorTextProps?: ErrorTextProps
	innerRef?: React.ForwardedRef<
		HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
	>
}

const Input = ({
	type = 'text',
	label,
	labelProps = {},
	wrapperProps = {},
	helperText,
	helperTextProps = {},
	error,
	errorTextProps = {},
	innerRef,
	...others
}: Props): JSX.Element => {
	// const t = useTranslations()

	const { className: labelClassName, ...labelPropsOthers } = labelProps
	const { className: wrapperClassName, ...wrapperPropsOthers } = wrapperProps
	const { className: helperTextClassName, ...helperTextPropsOthers } =
		helperTextProps
	const { className: errorTextClassName, ...errorTextPropsOthers } =
		errorTextProps

	const errorText = useMemo<string | undefined>(() => {
		if (!error) {
			return undefined
		}
		if (error.message) {
			return error.message
		}

		switch (error.type) {
			case 'required':
				return `${label} 必須填寫`
		}

		return '錯誤'
	}, [error, label])

	let input

	if (type === 'select') {
		input = (
			<select
				ref={innerRef}
				autoComplete='off'
				{...others}
				disabled={others.disabled || others.readOnly}
			/>
		)
	} else if (type === 'textarea') {
		input = <textarea ref={innerRef} autoComplete='off' {...others} />
	} else if (type === 'static') {
		input = (
			<>
				<input type='hidden' ref={innerRef} autoComplete='off' {...others} />
				<p className='input-static'>{others.placeholder}</p>
			</>
		)
	} else {
		input = <input type={type} ref={innerRef} autoComplete='off' {...others} />
	}

	return (
		<div
			className={cns('form-group', styles.formGroup, wrapperClassName, {
				'has-error': !!errorText,
			})}
			{...wrapperPropsOthers}
		>
			<label
				htmlFor={others.id}
				className={cns('form-group-label', labelClassName)}
				{...labelPropsOthers}
			>
				{label}
			</label>

			{input}

			{helperText && (
				<p
					className={cns('form-group-helper-text', helperTextClassName)}
					{...helperTextPropsOthers}
				>
					{helperText}
				</p>
			)}
			{errorText && (
				<p
					className={cns('form-group-error-text', errorTextClassName)}
					{...errorTextPropsOthers}
				>
					{errorText}
				</p>
			)}
		</div>
	)
}

export default React.forwardRef<
	HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement,
	Props
>((props, ref) => <Input innerRef={ref} {...props} />)
