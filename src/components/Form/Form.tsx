import React, { FormEventHandler, HTMLAttributes } from 'react'
import { useForm, UseFormProps } from 'react-hook-form'

type Props = HTMLAttributes<HTMLFormElement> &
	Pick<UseFormProps, 'defaultValues'>

const Form: React.FC<Props> = ({
	children,
	onSubmit,
	defaultValues,
	...others
}: Props) => {
	const methods = useForm({ defaultValues })
	const { handleSubmit } = methods

	return (
		<form
			onSubmit={handleSubmit(onSubmit as FormEventHandler<HTMLFormElement>)}
			{...others}
		>
			{React.Children.map(children, (child) => {
				const _child = child as React.ReactElement<
					any,
					string | React.JSXElementConstructor<any>
				>
				return _child.props?.name
					? React.createElement(_child.type, {
							...{
								..._child.props,
								register: methods.register,
								key: _child.props.name,
							},
					  })
					: child
			})}
		</form>
	)
}

export default Form
