import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import * as api from 'helpers/api/api.helper'

import ReactHTML from 'src/components/ReactHTML'
import { Character } from 'src/types'
import { DEFAULT_CHARACTER } from 'src/types/Character.type'

type PageProps = {
	character: Required<Character>
}

const CharacterProfilePage: NextPage<PageProps> = ({ character }) => {
	return (
		<div className='container py-24'>
			<div className='grid grid-cols-3 gap-4'>
				<div>
					<div className='space-y-4'>
						<div className='w-2/3 mx-auto'>
							<div className='aspect-w-1 aspect-h-1'>
								<img
									src={
										character.portraitImage.formats?.small?.url ||
										character.portraitImage.url
									}
									alt=''
									className='rounded-full'
								/>
							</div>
						</div>
						<div className='text-center'>
							<h2>{character.name}</h2>
							<h5 className='text-subtitle text-sm'>
								Lv {character.level}. {character.race?.name}
								{character.clses?.[0]?.name}
							</h5>
						</div>

						<div className='text-center text-sm italic'>
							{character.bioSaying}
						</div>

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<table>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-key-basic'></i>
								</td>
								<td className='text-sm'>編號: {character.code}</td>
							</tr>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-player'></i>
								</td>
								<td className='text-sm'>玩家: {character.player.name}</td>
							</tr>
						</table>
						<table>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-bridge'></i>
								</td>
								<td className='text-sm'>所屬城市: {character.city.name}</td>
							</tr>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-seagull'></i>
								</td>
								<td className='text-sm'>背景: {character.background.name}</td>
							</tr>
						</table>
						<table>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-crown'></i>
								</td>
								<td className='text-sm'>稱號: {character.bioTitle}</td>
							</tr>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-castle-flag'></i>
								</td>
								<td className='text-sm'>組織: {character.bioOrganization}</td>
							</tr>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-pawn'></i>
								</td>
								<td className='text-sm'>身分: {character.bioRole}</td>
							</tr>
							<tr>
								<td className='w-8'>
									<i className='ra ra-fw ra-lg ra-pisces'></i>
								</td>
								<td className='text-sm'>信仰: {character.bioBelief}</td>
							</tr>
						</table>

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<div>
							<h5 className='text-subtitle'>個性</h5>
							<p>{character.bioPersonalityTrait}</p>
						</div>

						<div>
							<h5 className='text-subtitle'>理想</h5>
							<p>{character.bioIdeal}</p>
						</div>

						<div>
							<h5 className='text-subtitle'>羈絆</h5>
							<p>{character.bioBond}</p>
						</div>

						<div>
							<h5 className='text-subtitle'>缺憾</h5>
							<p>{character.bioFlaw}</p>
						</div>

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<div className='space-y-2'></div>
					</div>
				</div>
				<div className='col-span-2'>
					<div className='space-y-8'>
						<div className='text-right space-x-2'>
							<button data-ripplet className='button button-outline text-sm'>
								<i className='bi bi-share-fill mr-2'></i>
								<span>分享</span>
							</button>

							<NextLink
								href={{ pathname: `/character/${character.name}/sheet` }}
								passHref
							>
								<a data-ripplet className='button button-outline text-sm'>
									<i className='bi bi-file-spreadsheet-fill mr-2'></i>
									<span>角色卡</span>
								</a>
							</NextLink>

							<button data-ripplet className='button button-outline text-sm'>
								<i className='bi bi-pencil-fill mr-2'></i>
								<span>修改角色</span>
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
							<ReactHTML>{character.bioDescription}</ReactHTML>
						</div>

						<div className='py-4'>
							<div className='h-px w-3/4 bg-gray-400 mx-auto'></div>
						</div>

						<div className='grid grid-cols-3 gap-x-4 text-center'>
							<div>
								<h5 className='text-subtitle mb-1'>已完成劇本數</h5>
								<h1>{character.factCompletedGameCount}</h1>
							</div>
							<div>
								<h5 className='text-subtitle mb-1'>已獲得的XP</h5>
								<h1>{character.factCollectedXP}</h1>
							</div>
							<div>
								<h5 className='text-subtitle mb-1'>已接觸的其他玩家角色</h5>
								<h1>{character.factTouchedCharacterCount}</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const [character] = await Promise.all([
		api.getCharacterByName(params?.name as string),
	])

	if (!character) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			character: {
				...DEFAULT_CHARACTER,
				...character,
			},
		},
	}
}

export default CharacterProfilePage
