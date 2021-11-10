import React, { HTMLAttributes } from 'react'

import classNames from 'classnames'

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
	open?: boolean
	position?: 'top' | 'middle' | 'bottom'
}

export const ModalBackdrop = ({
	open,
	position = 'middle',
	className,
	...others
}: ModalProps): JSX.Element => {
	return (
		<div
			className={classNames(
				'fixed top-0 bottom-0 left-0 right-0 flex flex-col items-stretch bg-black bg-opacity-50 z-50',
				position === 'top'
					? 'justify-start'
					: position === 'bottom'
					? 'justify-end'
					: 'justify-center',
				open ? 'block' : 'hidden',
				className
			)}
			{...others}
		/>
	)
}

const Modal = ({ open, className, ...others }: ModalProps): JSX.Element => {
	return (
		<ModalBackdrop open={open} style={{ margin: 0 }}>
			<div
				className={classNames(
					'm-4 p-4 bg-white rounded max-h-full overflow-y-auto',
					className
				)}
				{...others}
			/>
		</ModalBackdrop>
	)
}

export default Modal
