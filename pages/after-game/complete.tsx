import { NextPage } from 'next'
import NextLink from 'next/link'

import React from 'react'

import MedievalButton from 'src/components/MedievalButton'
import { CharacterRecord } from 'src/types/Character.type'

type PageProps = {
	characterRecord: CharacterRecord
}

const AfterGameCompletePage: NextPage<PageProps> = () => {
	return (
		<>
			<div className='container'>
				<div className='parchment framed'>
					<form className='max-w-screen-mobile mx-auto mt-4 space-y-6'>
						<div>
							<h1 className='mb-2'>已派發獎勵</h1>
							<p>
								再次感謝閣下使用本冒險者公會的服務。在離開之前，希望佔用閣下約五至十分鐘時間，填寫對是次任務的感想及意見！
							</p>
						</div>

						<div className='text-center'>
							<MedievalButton
								href='https://www.google.com'
								type='button'
								color='success'
								target='_blank'
							>
								填寫意見書 <i className='bi bi-box-arrow-up-right'></i>
							</MedievalButton>
						</div>

						<div className='text-center'>
							<NextLink href='/' passHref>
								<a>回到首頁</a>
							</NextLink>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default AfterGameCompletePage
