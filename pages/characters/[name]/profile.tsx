import { NextPage } from 'next'

const CharacterDetailPage: NextPage = () => {
	return (
		<div className='container py-24'>
			<div className='grid grid-cols-3 gap-4'>
				<div className='space-y-4 dark'>
					<div className='w-2/3 mx-auto'>
						<div className='aspect-w-1 aspect-h-1'>
							<img
								src='https://truth.bahamut.com.tw/s01/202106/7696ab21c4078c65c35d4f96d3d64e1d.JPG'
								className='rounded-full'
							/>
						</div>
					</div>
					<div className='text-center'>
						<h2>卡洛特</h2>
						<h5 className='text-gray-400 dark:text-gray-400 text-sm'>
							Lv 9. 傳奇狼人戰士
						</h5>
					</div>

					<div className='text-center text-sm italic'>
						「我的劍是為了守護家人。」
					</div>

					<div className='py-4'>
						<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
					</div>

					<table>
						<tr>
							<td className='w-10'>
								<i className='ra ra-fw ra-lg ra-key-basic'></i>
							</td>
							<td className='text-sm'>00013-GO02</td>
						</tr>
						<tr>
							<td className='w-10'>
								<i className='ra ra-fw ra-lg ra-player'></i>
							</td>
							<td className='text-sm'>銀狼</td>
						</tr>
					</table>
					<table>
						<tr>
							<td className='w-10'>
								<i className='ra ra-fw ra-lg ra-bridge'></i>
							</td>
							<td className='text-sm'>錫安城</td>
						</tr>
						<tr>
							<td className='w-10'>
								<i className='ra ra-fw ra-lg ra-seagull'></i>
							</td>
							<td className='text-sm'>隱士</td>
						</tr>
					</table>
					<table>
						<tr>
							<td className='w-10'>
								<i className='ra ra-fw ra-lg ra-crown'></i>
							</td>
							<td className='text-sm'>未有稱號</td>
						</tr>
						<tr>
							<td className='w-10'>
								<i className='ra ra-fw ra-lg ra-pawn'></i>
							</td>
							<td className='text-sm'>未有身分</td>
						</tr>
						<tr>
							<td className='w-10'>
								<i className='ra ra-fw ra-lg ra-pisces'></i>
							</td>
							<td className='text-sm'>未有信仰</td>
						</tr>
					</table>
				</div>
				<div className='col-span-2'>
					<div className='dark space-y-8'>
						<div className='text-right space-x-2'>
							<button data-ripplet className='button button-outline text-sm'>
								修改角色
							</button>
						</div>
						<div>
							<h3>近期活動</h3>
							<ul>
								<li>1263.06.05 - 卡洛特解決了一場商會之間的衝突。</li>
							</ul>
						</div>

						<div>
							<h3>寶藏</h3>
							<ul>
								<li>
									卡洛特得到了 <strong>+1不死生物殺手短劍</strong> 。
								</li>
							</ul>
						</div>

						<div>
							<h3>人際關係</h3>
							<ul>
								<li>
									卡洛特與 <strong>南海商會的部長哥魯夫</strong> 成為了朋友。
								</li>
							</ul>
						</div>

						<div>
							<h3>知識</h3>
							<ul>
								<li>卡洛特得知了血帆海盜策劃著恐怖襲擊。</li>
							</ul>
						</div>
					</div>
					{/* <div className='border-medieval bg-yellow-100'>
						<h3>近期活動</h3>
						<div className='grid grid-cols-4 gap-x-4 gap-y-2'>
							<div>1263.06.05</div>
							<div className='col-span-3'>活動活動</div>
						</div>
					</div>
					<div className='border-medieval bg-yellow-100'>
						<h3>簡介</h3>
						<p>
							的速在什沒都自士獎較心然朋效，的些白們港從交，著一得總可主了代滿方已參思然。
							邊他人和化利：案再邊在機代；的會家特開總眼，接起立然得興心英離到，快造談布放，看我面原治把種然師上教甚未我方我，不名金來現投進、運說可力來……定片的到深。間多夫事家現；紀說高不下費光要素主真影期，學有現著發知里得對我叫士如產了庭老雄臺意只由平眼，保列酒電市會所因：見了內送會一如，個因目小速臉特。旅沒今，色員轉度起！本廣議、小說先一別服學隨土；視長要上線任理也公……風使由人走……地人們好不都品效自科巴立正生則樹年心運動又性公到眼重最一重但上頭太！北告陸於需面爸告上來格裡示須收外水該。許出而夫間分個四利國，親天灣生母拿開首到？海重由的型二……面不然最本心條形生格自直有際，些見加自見活子？美辦影活！已的電媽不關起。配愛最子；大兒英子；子克部像記學是事。年進造春常、道會從作劇不物依你也商，轉合破經感的香天許政天保朋，今義病能家必室；家定兒，人種分經常明元樓多發獨總口的答不傳問名的好臺約木了些名一臺。
						</p>
					</div> */}
				</div>
			</div>
		</div>
	)
}
export default CharacterDetailPage
