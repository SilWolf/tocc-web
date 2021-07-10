import { NextPage } from 'next'

const CharacterProfilePage: NextPage = () => {
	return (
		<div className='container py-24'>
			<div className='grid grid-cols-3 gap-4'>
				<div className='text-white'>
					<div className='space-y-4'>
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
							<h5 className='text-gray-400 text-sm'>Lv 9. 傳奇狼人戰士</h5>
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
								<td className='text-sm'>編號: 00013-GO02</td>
							</tr>
							<tr>
								<td className='w-10'>
									<i className='ra ra-fw ra-lg ra-player'></i>
								</td>
								<td className='text-sm'>玩家: 銀狼</td>
							</tr>
						</table>
						<table>
							<tr>
								<td className='w-10'>
									<i className='ra ra-fw ra-lg ra-bridge'></i>
								</td>
								<td className='text-sm'>所屬城市: 錫安城</td>
							</tr>
							<tr>
								<td className='w-10'>
									<i className='ra ra-fw ra-lg ra-seagull'></i>
								</td>
								<td className='text-sm'>背景: 士兵</td>
							</tr>
						</table>
						<table>
							<tr>
								<td className='w-10'>
									<i className='ra ra-fw ra-lg ra-crown'></i>
								</td>
								<td className='text-sm'>稱號: --</td>
							</tr>
							<tr>
								<td className='w-10'>
									<i className='ra ra-fw ra-lg ra-pawn'></i>
								</td>
								<td className='text-sm'>組織: --</td>
							</tr>
							<tr>
								<td className='w-10'>
									<i className='ra ra-fw ra-lg ra-pawn'></i>
								</td>
								<td className='text-sm'>身分: --</td>
							</tr>
							<tr>
								<td className='w-10'>
									<i className='ra ra-fw ra-lg ra-pisces'></i>
								</td>
								<td className='text-sm'>信仰: --</td>
							</tr>
						</table>

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<div>
							<h5 className='text-gray-400'>個性</h5>
							<p>冷靜、顧全大局</p>
						</div>

						<div>
							<h5 className='text-gray-400'>理想</h5>
							<p>建立一個能與家人一同幸福生活的環境</p>
						</div>

						<div>
							<h5 className='text-gray-400'>羈絆</h5>
							<p>能為了家人付出一切努力</p>
						</div>

						<div>
							<h5 className='text-gray-400'>缺憾</h5>
							<p>容易自我犧牲</p>
						</div>

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<div className='space-y-2'>
							<h5 className='text-gray-400'>短記</h5>

							<div>
								<div>
									<a href='#'>討伐哥布林紀錄書</a>
									<p className='text-xs text-gray-400'>2021.05.29</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='col-span-2'>
					<div className='dark space-y-8'>
						<div className='text-right space-x-2'>
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

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<div className='space-y-4 text-sm leading-6 text-center'>
							<p>
								毛色灰藍的狼人，目測約40歲，比一般戰士更魁梧的身材，右眼留有刀疤。
								<br />
								衣著及裝備帶有諾爾斯風，雙臂有著盧恩紋身。
								<br />
								左臂總是綁著暗血紅色的布條。全身長有違和的黑紋。
								<br />
								戴有頸園、右手無名指戴有結婚戒指，是已婚的證明。
								<br />
								胸前扣上了傳奇冒險者徽章、尤克特拉希爾小隊的隊徽，
								<br />
								腰帶上扣著作為狼人戰術部隊『嗥嚎』的領袖的信物──以霜獄狼的巨牙打造而成的狼聲號角。
								<br />
								身邊通常會伴著三頭戰鬥伙伴：座狼、獅鷲及獵鷹
							</p>

							<p>
								戰士、狼人們會對牠示以尊敬，甚至崇拜。
								<br />
								旁人對牠的態度，源自牠當上冒險者教官後的實績及吟遊詩人歌頌的事跡。
								<br />
								這種氣氛下再加上冒險者間罕見的中年、成熟外觀，讓牠帶有一種不言而喻的迫力。
								<br />
								而當牠輕鬆地笑起來時，反而會想起牠是個有一女兒的狼父親。
							</p>

							<p>
								樂於交友。對陌生人雖然也會友善，但會保持戒心。
								<br />
								能否撫摸視友好程度及場合而定，摸頭只限特定數人才允許，是關係的證明。
								<br />
								對朋友顯出平常心及外向。朋友有難必定幫忙。
								<br />
								對人際關係的定義界線模糊，容易就能得到牠的好感，以及得到牠的善待。
							</p>

							<p>
								隨著多次參與世界級的戰爭及事件，看淡了死亡，也不會因為死亡而動搖了。
								<br />
								條件許可下，傾向選擇低調的行動；在團隊戰鬥中則愛當一名鬥士。
								<br />
								認真及在任務狀態時思考相當冷靜，判斷力也不錯；
								<br />
								擅長對於野獸及魔物，行動總是瞄準要害，是個合理主義者。
								<br />
								跟大部分冒險者的相性都差，能獨自應付多數困難，但團隊合作中是個隱性炸彈
							</p>

							<p>
								會在奇怪的地方表現出腦筋靈活的一面，
								<br />
								此外還有治不好的月月病，這通常是讓牠形象瞬間崩壞的致命傷。
							</p>
						</div>

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<div className='grid grid-cols-3 gap-x-4 text-center'>
							<div>
								<h5 className='text-gray-400 dark:text-gray-400 mb-1'>
									已完成劇本數
								</h5>
								<h1>50</h1>
							</div>
							<div>
								<h5 className='text-gray-400 dark:text-gray-400 mb-1'>
									已獲得的XP
								</h5>
								<h1>29300</h1>
							</div>
							<div>
								<h5 className='text-gray-400 dark:text-gray-400 mb-1'>
									已接觸的其他玩家角色
								</h5>
								<h1>30</h1>
							</div>
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
export default CharacterProfilePage
