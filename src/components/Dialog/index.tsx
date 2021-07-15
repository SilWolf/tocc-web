export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
	title?: string
	subtitle?: string
	content?: string
	actions?: DialogActionProps[]
}

export type DialogActionProps = React.HTMLAttributes<HTMLButtonElement>

type Props = DialogProps
const Dialog = (props: Props): JSX.Element => {
	const { title, subtitle, content, actions, ...others } = props

	return (
		<>
			<div
				className='container max-w-screen-md flex justify-center items-center'
				{...others}
			>
				<div className='bg-white rounded-md p-4 min-w-0'>
					{title && <h3 className='mb-1'>{title}</h3>}
					{subtitle && <h4 className='mb-1'>{subtitle}</h4>}
					{content && <p className='my-2'>{content}</p>}

					<div className='text-center space-x-1'>
						{actions?.map((action, i) => (
							<button
								key={i}
								data-ripplet
								className='button button-primary'
								{...action}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Dialog
