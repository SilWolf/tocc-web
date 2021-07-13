import { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useForm } from 'react-hook-form'

import { Game, gameDefaultValue, GameRaw } from '../../../../types/Game.type'

import * as api from '../../../../apis/api.helper'
import { Input } from '../../../../components/Form'

type FormProps = GameRaw

type PageProps = {
	game?: Game
	isNew?: boolean
}

const AdminGameDetailPage: NextPage<PageProps> = ({ isNew, game }) => {
	const { register } = useForm<FormProps>({
		defaultValues: gameDefaultValue,
	})

	return (
		<>
			<form className='form'>
				<div className='space-y-4'>
					<div className='flex gap-x-4 justify-between items-center'>
						<div className='flex-1'>
							<div className='form-group form-group-transparent'>
								<Input
									type='text'
									placeholder='編號 (選擇日期,城市,GM後會自動填入)'
									{...register('code')}
								/>
							</div>

							<div className='form-group form-group-transparent'>
								<Input
									type='text'
									className='text-xl font-semibold'
									placeholder='未命名的劇本'
									{...register('title')}
								/>
							</div>
						</div>
						<div>
							<button className='button button-primary'>儲存</button>
						</div>
					</div>

					<div className='h-px bg-gray-400'></div>

					<div className='grid grid-cols-3 gap-x-4'>
						<div className='col-span-2 space-y-6'>
							<div className='flex justify-start gap-4'>
								<Input
									type='select'
									label='城市 (店舖)'
									wrapperProps={{ className: 'flex-1' }}
									{...register('city')}
								/>
								<Input
									type='select'
									label='DM'
									wrapperProps={{ className: 'flex-1' }}
									{...register('dm')}
								/>
							</div>

							<div className='flex justify-start gap-4'>
								<Input
									type='date'
									label='開始時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('startAt')}
								/>
								<Input
									type='date'
									label='結束時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('endAt')}
								/>
							</div>

							<div className='flex justify-start gap-4'>
								<Input
									type='date'
									label='世界觀開始時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('worldStartAt')}
								/>
								<Input
									type='date'
									label='世界觀結束時間'
									wrapperProps={{ className: 'flex-1' }}
									{...register('worldEndAt')}
								/>
							</div>

							<div className='flex justify-start gap-4'>
								<Input
									label='人數下限'
									type='number'
									wrapperProps={{ className: 'w-24' }}
									{...register('capacityMin')}
								/>
								<Input
									label='人數上限'
									type='number'
									wrapperProps={{ className: 'w-24' }}
									{...register('capacityMax')}
								/>
								<div className='w-8'></div>
								<Input
									label='等級下限'
									type='number'
									wrapperProps={{ className: 'w-24' }}
									{...register('lvMin')}
								/>
								<Input
									label='等級上限'
									type='number'
									wrapperProps={{ className: 'w-24' }}
									{...register('lvMax')}
								/>
							</div>

							<Input
								type='textarea'
								label='劇本簡介'
								rows={6}
								{...register('description')}
							/>
							<Input
								type='textarea'
								label='備註'
								rows={6}
								{...register('remark')}
							/>

							<div className='h-px bg-gray-400'></div>
						</div>
						<div>123</div>
					</div>
				</div>
			</form>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	if (params?.id === 'new') {
		return {
			props: {
				isNew: true,
			},
		}
	}

	if (!params?.id) {
		return {
			notFound: true,
		}
	}

	const [game] = await Promise.all([api.getGameById(params.id as string)])

	return {
		props: {
			game,
		},
	}
}

export default AdminGameDetailPage
