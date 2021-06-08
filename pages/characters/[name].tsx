import { NextPage } from 'next'

const CharacterDetailPage: NextPage = () => {
	return (
		<div className='min-h-screen flex flex-col'>
			<div className='container py-12 flex-1'>
				<img src='/images/sheet-1.png' />
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
export default CharacterDetailPage
