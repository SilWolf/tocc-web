import classNames from 'classnames'
import { useCallback, useMemo, useState } from 'react'
import { AttributeChangerStepperResult } from 'src/components/AttributeChangerStepper'
import AttributeChanger from '../AttributeChanger'

type Props = React.HTMLAttributes<HTMLDivElement>

const AttributesInput = ({ ...others }: Props): JSX.Element => {
	const [attributePointMap, setAttributePointMap] = useState<
		Record<string, number>
	>({})

	const handleChangeAttribute = useCallback(
		(attribute: string) => (result: AttributeChangerStepperResult) => {
			setAttributePointMap((prev) => ({
				...prev,
				[attribute]: result.point,
			}))
		},
		[]
	)

	const availablePoint = useMemo(
		() =>
			27 -
			Object.values(attributePointMap).reduce<number>(
				(prev, curr) => prev + curr,
				0
			),
		[attributePointMap]
	)

	return (
		<div {...others}>
			<div className='flex gap-x-4 justify-center items-center text-center'>
				<div>
					<div className='text-2xl'>
						<span
							className={classNames({ 'text-red-500': availablePoint < 0 })}
						>
							{availablePoint}
						</span>
						/27
					</div>
					<div className='text-xs'>可用pt</div>
				</div>
				<div>
					<div className='text-2xl'>2/2</div>
					<div className='text-xs'>可用種族加成</div>
				</div>
			</div>

			<div className='flex gap-x-4'>
				<div className='flex-1'>
					<AttributeChanger
						label='力量'
						onChange={handleChangeAttribute('str')}
					/>
				</div>
				<div className='flex-1'>
					<AttributeChanger
						label='敏捷'
						onChange={handleChangeAttribute('dex')}
					/>
				</div>
				<div className='flex-1'>
					<AttributeChanger
						label='體質'
						onChange={handleChangeAttribute('con')}
					/>
				</div>
				<div className='flex-1'>
					<AttributeChanger
						label='智力'
						onChange={handleChangeAttribute('int')}
					/>
				</div>
				<div className='flex-1'>
					<AttributeChanger
						label='感知'
						onChange={handleChangeAttribute('wis')}
					/>
				</div>
				<div className='flex-1'>
					<AttributeChanger
						label='魅力'
						onChange={handleChangeAttribute('cha')}
					/>
				</div>
			</div>
		</div>
	)
}

export default AttributesInput
