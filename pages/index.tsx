import { NextPage } from 'next'

const HomePage: NextPage = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<div
				className='h-64 bg-center bg-cover'
				style={{ backgroundImage: 'url("/images/homepage-bg.jpg")' }}
			></div>

			<div className='container py-12 flex-1'>
				<div className='grid grid-cols-3 gap-x-6 gap-y-8'>
					<div className='col-span-3 bg-yellow-200 rounded-md p-4'>
						<h3>招募中</h3>
					</div>
					<div className='col-span-3 bg-yellow-200 rounded-md p-4'>
						<h3>最新活動</h3>
					</div>
					<div className='col-span-2 bg-yellow-200 rounded-md p-4'>
						<h3>海城週聞</h3>
					</div>
					<div className='bg-yellow-200 rounded-md p-4 row-span-2'>
						<h3>角色動態</h3>
					</div>
					<div className='col-span-2 bg-yellow-200 rounded-md p-4'>
						<h3>你知道嗎?</h3>
					</div>
					<div className='col-span-3 bg-yellow-200 rounded-md p-4'>
						<h3>外部連結</h3>
					</div>
				</div>
			</div>

			<div className='bg-yellow-900 dark text-white pt-4 pb-6'>
				<div className='container space-y-1'>
					<div className='flex gap-x-2 justify-between items-center'>
						<div className='flex-none'>
							<div>Copyright</div>
							<div className='divide-x-2'>
								<a href='#' className='pr-2'>
									Link
								</a>
								<a href='#' className='px-2'>
									Link
								</a>
								<a href='#' className='px-2'>
									Link
								</a>
								<a href='#' className='px-2'>
									Link
								</a>
							</div>
						</div>
						<div className='flex-none space-x-2'>
							<a href='#'>S</a>
							<a href='#'>S</a>
							<a href='#'>S</a>
							<a href='#'>S</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default HomePage
