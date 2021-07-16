import { NextPage } from 'next'

const CharacterSheetPage: NextPage = () => {
	return (
		<div className='container py-16'>
			<div className='space-y-4 text-white'>
				<div className='flex gap-x-4 items-center'>
					<div className='flex-none'>
						<img
							src='https://truth.bahamut.com.tw/s01/202106/7696ab21c4078c65c35d4f96d3d64e1d.JPG'
							className='rounded-full h-16 w-16'
						/>
					</div>
					<div className='flex-1'>
						<h2>卡洛特</h2>
						<div className='space-x-4 text-gray-400 text-sm'>
							<span>等級: 9</span>
							<span>種族: 狼人</span>
							<span>職業: 戰士</span>
							<span>背景: 士兵</span>
							<span>XP: 20000/23000</span>
						</div>
					</div>
					<div className='flex-none space-x-2'>
						<button data-ripplet className='button button-outline text-sm'>
							分享
						</button>
						<button data-ripplet className='button button-outline text-sm'>
							角色紙
						</button>
						<button data-ripplet className='button button-outline text-sm'>
							修改角色
						</button>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8 items-center'>
					<div className='space-y-4 text-center'>
						<div>
							<h2>30ft.</h2>
							<p className='text-xs text-gray-400'>速度</p>
						</div>

						<div className='flex justify-center gap-x-8'>
							<div>
								<h2>18</h2>
								<p className='text-xs text-gray-400'>AC</p>
							</div>
							<div>
								<h2>36 / 36</h2>
								<p className='text-xs text-gray-400'>HP</p>
							</div>
						</div>
					</div>
					<div className='col-span-2 space-y-4'>
						<div className='grid grid-cols-6 space-4 text-center'>
							<div>
								<h5 className='text-gray-400'>力量</h5>
								<h2>+1</h2>
								<p className='text-xs text-gray-400'>12</p>
							</div>
							<div>
								<h5 className='text-gray-400'>敏捷</h5>
								<h2>+1</h2>
								<p className='text-xs text-gray-400'>12</p>
							</div>
							<div>
								<h5 className='text-gray-400'>體質</h5>
								<h2>+1</h2>
								<p className='text-xs text-gray-400'>12</p>
							</div>
							<div>
								<h5 className='text-gray-400'>智力</h5>
								<h2>+1</h2>
								<p className='text-xs text-gray-400'>12</p>
							</div>
							<div>
								<h5 className='text-gray-400'>感知</h5>
								<h2>+1</h2>
								<p className='text-xs text-gray-400'>12</p>
							</div>
							<div>
								<h5 className='text-gray-400'>魅力</h5>
								<h2>+1</h2>
								<p className='text-xs text-gray-400'>12</p>
							</div>
						</div>

						<div className='flex justify-between gap-x-4 text-center'>
							<div>
								<h5 className='text-gray-400'>先攻值</h5>
								<h2>+2</h2>
							</div>
							<div>
								<h5 className='text-gray-400'>熟練加成</h5>
								<h2>+3</h2>
							</div>
							<div>
								<h5 className='text-gray-400'>被動觀察(感知)</h5>
								<h2>13</h2>
							</div>
							<div>
								<h5 className='text-gray-400'>被動調查(智力)</h5>
								<h2>13</h2>
							</div>
							<div>
								<h5 className='text-gray-400'>被動洞悉(感知)</h5>
								<h2>13</h2>
							</div>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-8'>
					<div className='space-y-8'>
						<div className='space-y-2'>
							<div className='flex justify-between'>
								<h5 className='flex-none'>技能</h5>
								<a href='#' className='flex-none text-sm'>
									顯示全部
								</a>
							</div>
							<div className='space-y-2'>
								<div className='flex justify-between'>
									<p>運動(力量)</p>
									<p>+4</p>
								</div>
								<div className='flex justify-between'>
									<p>運動(力量)</p>
									<p>+4</p>
								</div>
								<div className='flex justify-between'>
									<p>運動(力量)</p>
									<p>+4</p>
								</div>
								<div className='flex justify-between'>
									<p>運動(力量)</p>
									<p>+4</p>
								</div>
							</div>
						</div>
						<div className='space-y-2'>
							<div className='flex justify-between'>
								<h5 className='flex-none'>工具/語言/武器/防具</h5>
							</div>
							<p>
								盜賊工具, 通用語, 簡易武器, 軍用武器, 輕甲, 中甲, 重甲, 盾牌
							</p>
						</div>
					</div>
					<div className='col-span-2 space-y-4'>
						<div className='h-px w-3/4 bg-gray-600 mx-auto'></div>

						<div className='grid grid-cols-6 text-center'>
							<div>
								<h5 className='text-gray-400'>回氣</h5>
								<h2>1/1</h2>
							</div>
							<div>
								<h5 className='text-gray-400'>動作如潮</h5>
								<h2>1/1</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default CharacterSheetPage
