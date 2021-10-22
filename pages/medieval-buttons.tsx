import { NextPage } from 'next'

import React from 'react'

import MedievalButton from 'src/components/MedievalButton'

const MedievalButtonsPage: NextPage = () => {
	return (
		<div className='container mt-24'>
			<div className='space-y-4'>
				<div>
					<MedievalButton color='primary'>主要按鈕</MedievalButton>
				</div>
				<div>
					<MedievalButton color='secondary'>次要按鈕</MedievalButton>
				</div>
				<div>
					<MedievalButton color='success'>提交</MedievalButton>
				</div>
				<div>
					<MedievalButton color='danger'>錯誤</MedievalButton>
				</div>
				<div>
					<MedievalButton color='info'>資訊</MedievalButton>
				</div>
				<div>
					<MedievalButton color='warning'>注意</MedievalButton>
				</div>
				<div>
					<MedievalButton color='primary' disabled>
						禁止
					</MedievalButton>
				</div>
			</div>
		</div>
	)
}

export default MedievalButtonsPage
