import React from 'react'

import classNames from 'classnames'

type Props = React.HTMLAttributes<HTMLDivElement>

const Breadcrumb = ({ children, className, ...others }: Props): JSX.Element => {
	return (
		<div className={classNames('space-x-2 text-sm', className)} {...others}>
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
