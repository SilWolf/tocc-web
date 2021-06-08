import { NextPage } from 'next'

const HomePage: NextPage = () => {
	return (
		<>
			<div className='dark bg-yellow-900 py-1'>
				<div className='container'>
					<div className='flex'>
						<div className='pr-2 flex-none'>
							<a href='#'>TOCC Web</a>
						</div>
						<div className='px-2 flex-none'>
							<a href='#'>我的角色</a>
						</div>
						<div className='px-2 flex-none'>
							<a href='#'>世界</a>
						</div>
						<div className='flex-auto'></div>
						<div className='pl-2 flex-none'>
							<a href='#'>登入</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default HomePage
