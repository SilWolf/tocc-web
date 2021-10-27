import React from 'react'

import Copyright from '../Copyright'

const Footer = () => {
	return (
		<div className='space-y-1'>
			<div className='flex gap-x-2 justify-between items-center'>
				<div className='flex-1 text-xs'>
					<Copyright />
				</div>
				<div className='flex-none space-x-6'>
					<a
						href='https://www.facebook.com/Tocc5ehk/'
						target='_blank'
						className='inline-block px-2 border border-gray-300'
						rel='noreferrer'
					>
						<i className='bi-facebook text-lg'></i> 海城扎記
					</a>
				</div>
			</div>
		</div>
	)
}

export default React.memo(Footer)
