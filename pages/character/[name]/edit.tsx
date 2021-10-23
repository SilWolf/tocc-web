import { GetServerSideProps, NextPage } from 'next'

import apis from 'helpers/api/api.helper'

import { Character } from 'src/types'
import { DEFAULT_CHARACTER } from 'src/types/Character.type'

type PageProps = {
	character: Required<Character>
}

const CharacterEditPage: NextPage<PageProps> = ({ character }) => {
	return (
		<div className='container py-24'>
			<div className='grid grid-cols-3 gap-4'>
				<div>
					<div className='space-y-4'>
						<div className='tab'>總覽</div>

						<div>
							<h6 className='text-subtitle'>基本設定</h6>
							<div className='tab'>種族</div>
							<div className='tab'>背景</div>
							<div className='tab'>能力值</div>
							<div className='tab'>個人資料</div>
						</div>

						<div>
							<h6 className='text-subtitle'>等級 1</h6>
							<div className='tab'>職業</div>
						</div>
					</div>
				</div>
				<div className='col-span-2'>
					<div className='space-y-8'></div>
				</div>
			</div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const [character] = await Promise.all([
		apis.getCharacterByName(params?.name as string),
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

export default CharacterEditPage
