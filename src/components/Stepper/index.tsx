import React from 'react'

import cns from 'classnames'

type Props = React.PropsWithChildren<{
	activeStep?: number
}>

const Stepper = ({ activeStep = 0, children }: Props): JSX.Element => {
	return (
		<div className='space-y-2'>
			{React.Children.map(children, (component, i) => (
				<div className='flex gap-4'>
					<div className='flex-none flex flex-col gap-y-2 items-center'>
						<div
							className={cns(
								'flex-none w-5 h-5 rounded-full text-xs text-center leading-5 text-white',
								i < activeStep
									? 'bg-green-500'
									: i === activeStep
									? 'bg-yellow-600'
									: 'bg-gray-400'
							)}
						>
							{i + 1}
						</div>
						<div
							className={cns(
								'flex-1 w-px',
								i === React.Children.count(children) - 1
									? 'bg-transparent'
									: 'bg-gray-400'
							)}
						></div>
					</div>
					<div
						className={cns(
							'flex-1 text-sm pb-4',
							i < activeStep
								? 'text-green-500'
								: i === activeStep
								? 'text-yellow-600'
								: 'text-gray-400'
						)}
					>
						{component}
					</div>
				</div>
			))}
		</div>
	)
}

export default React.memo(Stepper)
