import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

const Breadcrumb = ({ children, ...others }: Props): JSX.Element => {
	return (
		<div className='space-x-2 text-gray-700 text-sm' {...others}>
			{React.Children.map(children, (child, i) => (
				<>
					{i > 0 && <span>&gt;</span>}
					{child}
				</>
			))}
		</div>
	)
}

export default React.memo(Breadcrumb)
