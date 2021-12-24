import { GetServerSideProps, NextPage } from 'next'
import NextLink from 'next/link'

import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import Alert from 'src/components/Alert'

import Breadcrumb from 'src/components/Breadcrumb'
import { Input } from 'src/components/Form'
import AttributeChanger from 'src/widgets/AttributeChanger'
import apis, { getApis } from 'src/helpers/api/api.helper'
import {
	GetServerSidePropsContextWithIronSession,
	serverSidePropsWithSession,
} from 'src/hooks/withSession.hook'
import { Race } from 'src/types/Race.type'
import { SessionUser } from 'src/types/User.type'

type PageProps = {
	races: Race[]
}

const CharacterCreatePage: NextPage<PageProps> = () => {
	const racesQuery = useQuery(['races'], apis.getRaces, {
		select: (races) => {
			races.sort((a, b) => a.order - b.order)

			const optGroupsMap: Record<
				string,
				{ id: string; order: number; race: Race; children: Race[] }
			> = races
				.filter((race) => race.isParentRace)
				.reduce<
					Record<
						string,
						{ id: string; order: number; race: Race; children: Race[] }
					>
				>((prev, race) => {
					prev[race.id] = {
						id: race.id,
						order: race.order,
						race,
						children: [],
					}
					return prev
				}, {})

			optGroupsMap['others'] = {
				id: 'others',
				order: 999999,
				race: {
					id: '-others',
					name: '其他',
					order: 999999,
					isParentRace: true,
				},
				children: [],
			}

			for (const race of races) {
				if (race.isParentRace) {
					continue
				}

				if (!race.parentRace) {
					optGroupsMap['others'].children.push(race)
				} else if (optGroupsMap[race.parentRace]) {
					optGroupsMap[race.parentRace].children.push(race)
				}
			}

			return Object.values(optGroupsMap).sort((a, b) => a.order - b.order)
		},
	})

	const handleChangeAttribute = useCallback((result) => {
		console.log(result)
	}, [])

	return (
		<>
			<div className='container space-y-6'>
				<div className='inline-block'>
					<Breadcrumb className='text-white'>
						<NextLink href='/' passHref>
							<a>TOCC</a>
						</NextLink>
						<NextLink href='/character' passHref>
							<a>角色列表</a>
						</NextLink>
						<strong>建立角色</strong>
					</Breadcrumb>
				</div>

				<div className='parchment framed'>
					<p>這頁面將會引導您建立一個完整的TOCC角色。</p>
					<p>
						建立的角色將會符合 Dungeon &#38; Dragon
						規範，即使不懂得規則也沒關係。
					</p>
				</div>

				<div className='parchment parchment-narrowed'>
					<div className='flex text-center items-center'>
						<div className='flex-1'>1. 選擇種族</div>
						<div className='flex-1'>2. 選擇背景</div>
						<div className='flex-1'>3. 分配能力值</div>
						<div className='flex-1'>4. 技能</div>
						<div className='flex-1'>5. 職業</div>
					</div>
				</div>

				<div className='parchment space-y-4'>
					<h3>1. 選擇種族</h3>
					<p className='italic'>
						被各大小城市包圍的內海『碧之藍淚』，自古開始就孕育了許多生命與物種。
						<br />
						神族逝去、龍族沒落。時過境遷，在這一由凡人統治的時代裡，你的角色也將作為奇幻世界下一名智慧物種，在歷史上留下一筆偉名。
					</p>

					<p>
						請選擇角色的種族。不同種族之間各有其特性與優勢，仔細選擇心儀的種族吧！
					</p>

					{racesQuery.data && (
						<Input type='select'>
							{racesQuery.data.map((optGroup) => (
								<optgroup key={optGroup.id} label={optGroup.race.name}>
									{optGroup.children.map((race) => (
										<option key={race.id} value={race.id}>
											{race.name}
										</option>
									))}
								</optgroup>
							))}
						</Input>
					)}
				</div>

				<div className='parchment space-y-4'>
					<h3>2. 選擇背景</h3>
					<p className='italic'>
						生物由出生到成長，經歷的命運無窮無盡。兩個完全一樣的個體是不存在的。
						<br />
						隨著長大成年，隨著認識到了生存的意思，隨著學會了戰鬥，那便成為了一個人的背景。
					</p>

					<p>
						請選擇角色的背景。背景往往與角色如何學會戰鬥、如何成為等級1的冒險者，以及與冒險的目標息息相關，也是增加角色色彩的重要一環。
					</p>

					{racesQuery.data && (
						<Input type='select'>
							{racesQuery.data.map((optGroup) => (
								<optgroup key={optGroup.id} label={optGroup.race.name}>
									{optGroup.children.map((race) => (
										<option key={race.id} value={race.id}>
											{race.name}
										</option>
									))}
								</optgroup>
							))}
						</Input>
					)}
				</div>

				<div className='parchment space-y-4'>
					<h3>3. 選擇起始職業</h3>
					<p className='italic'>
						每人都有他的導師，教導他如何在危惡的世界中生存。
						<br />
						最初學會的戰鬥技巧，便是一生用於保護自己的能力，亦是打開未來道路的鑰匙。
					</p>

					<p>
						請選擇角色的起始職業。此職業是角色達到等級1時的職業，與角色的背景息息相關。
						<br />
						比方說士兵出身的角色，很可能是一名戰士；孤兒出身的角色，很可能是一名盜賊。
						<br />
						當然，人生與命運都是曲折離奇的，冒險者最擅長的便是跳脫常規。
					</p>

					{racesQuery.data && (
						<Input type='select'>
							{racesQuery.data.map((optGroup) => (
								<optgroup key={optGroup.id} label={optGroup.race.name}>
									{optGroup.children.map((race) => (
										<option key={race.id} value={race.id}>
											{race.name}
										</option>
									))}
								</optgroup>
							))}
						</Input>
					)}
				</div>

				<div className='parchment space-y-4'>
					<h3>3. 分配能力值</h3>
					<p className='italic'>
						即便是擁有同一血脈的親族，個體間也充滿差異，這是神的巧思。
						<br />
						凡人總是充滿著缺憾與不足，卻又各擁有著特長，當兩個人走在一起，就能互相彌補對方的不足。
					</p>

					<p>
						請分配角色的能力值。你在前面選擇的種族也會提供一定的能力值加成。每項能力都各有其用處，請謹慎分配。
						<br />
						不同職業都有其推薦優先分配的屬性，例如戰士、野蠻人推薦力量，盜賊推薦敏捷等等。
						<br />
						分配的最終目的，是為了在解決困難時，能更有效地配合職業能力，以成為一名厲害的冒險者。
					</p>

					<Alert type='warning'>
						在 Dungeon &#38; Dragon
						的戰鬥中，能力值佔了一個十分重要的地位，建議先了解戰鬥的玩法後，再決定能力值的分配。
					</Alert>

					<div className='flex'>
						<div className='flex-1'>
							<AttributeChanger label='力量' onChange={handleChangeAttribute} />
						</div>
						<div className='flex-1'>
							<AttributeChanger label='敏捷' onChange={handleChangeAttribute} />
						</div>
						<div className='flex-1'>
							<AttributeChanger label='體質' onChange={handleChangeAttribute} />
						</div>
						<div className='flex-1'>
							<AttributeChanger label='智力' onChange={handleChangeAttribute} />
						</div>
						<div className='flex-1'>
							<AttributeChanger label='感知' onChange={handleChangeAttribute} />
						</div>
						<div className='flex-1'>
							<AttributeChanger label='魅力' onChange={handleChangeAttribute} />
						</div>
					</div>

					<div>
						<div className='flex'>
							<div>ICON</div>
							<div className='flex-1'>力量</div>
							<div>I</div>
						</div>
						<div className='py-2 flex justify-center items-center'>
							<div>12</div>
							<div>+</div>
							<div>0</div>
						</div>
					</div>

					<table>
						<tr>
							<td>力量</td>
							<td></td>
							<td></td>
							<td>
								<p>力量代表著肌肉力量，是戰士、野蠻人等前衛職業的核心屬性。</p>
								<ul>
									<li>進行近戰武器攻擊和徒手攻擊時，你的命中及傷害+X</li>
									<li>你的助跑跳躍距離為X呎(跳遠)和Y呎(跳高)</li>
									<li>你可負重X磅</li>
								</ul>
							</td>
						</tr>
						<tr>
							<td>敏捷</td>
							<td></td>
							<td></td>
							<td>
								<p>
									敏捷代表著活動能力，是盜賊、遊俠等重視隱密的職業的核心屬性。
								</p>
								<ul>
									<li>進行遠程武器攻擊和以靈巧武器攻擊時，你的命中及傷害+X</li>
									<li>戰鬥前的先攻值+X</li>
								</ul>
							</td>
						</tr>
						<tr>
							<td>體質</td>
							<td></td>
							<td></td>
							<td>
								<p>體質代表著生命力，是能提升戰鬥存活率的泛用屬性。</p>
								<ul>
									<li>你的HP+X/每等級</li>
									<li>你可承受窒息X回合</li>
								</ul>
							</td>
						</tr>
						<tr>
							<td>智力</td>
							<td></td>
							<td></td>
							<td>
								<p>智力代表著知識量，是法師的核心屬性。</p>
							</td>
						</tr>
						<tr>
							<td>感知</td>
							<td></td>
							<td></td>
							<td>
								<p>感知代表著運用經驗的智慧。</p>
							</td>
						</tr>
						<tr>
							<td>魅力</td>
							<td></td>
							<td></td>
							<td>
								<p>魅力代表著存在感及人緣。</p>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</>
	)
}

export const getServerSideProps: GetServerSideProps =
	serverSidePropsWithSession(
		async (context: GetServerSidePropsContextWithIronSession) => {
			const sessionUser = context.req.session.get<SessionUser>('sessionUser')
			const _apis = getApis({ jwt: sessionUser?.jwt })

			return {
				props: {},
			}
		}
	)

export default CharacterCreatePage
