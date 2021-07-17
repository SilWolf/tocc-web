import { NextPage } from 'next'

const HomePage: NextPage = () => {
	return (
		<>
			<div
				className='h-64 bg-center bg-cover'
				style={{ backgroundImage: 'url("/images/homepage-bg.jpg")' }}
			></div>

			<div className='container py-12 flex-1'>
				<div className='grid grid-cols-3 gap-x-6 gap-y-8'>
					<div className='col-span-3 card'>
						<h3>招募中</h3>
					</div>
					<div className='col-span-3 card'>
						<h3>最新活動</h3>
					</div>
					<div className='col-span-2 card'>
						<h3>海城週聞</h3>
					</div>
					<div className='card row-span-2'>
						<h3>角色動態</h3>
					</div>
					<div className='col-span-2 card'>
						<h3>你知道嗎?</h3>
					</div>
					<div className='col-span-3 card'>
						<h3>外部連結</h3>
					</div>
				</div>
			</div>
		</>
	)
}
export default HomePage
