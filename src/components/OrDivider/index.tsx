import React from 'react'

const OrDivider = () => {
	return (
		<div className='flex gap-x-2 items-center'>
			<div className='flex-1 h-px bg-gray-700 bg-opacity-30'></div>
			<div>OR</div>
			<div className='flex-1 h-px bg-gray-700 bg-opacity-30'></div>
		</div>
	)
}

export default React.memo(OrDivider)
