import classNames from 'classnames'
import memoize from 'fast-memoize'
import { useMemo, useState } from 'react'
import { AttributeChangerStepperResult } from 'src/components/AttributeChangerStepper'
import AttributeChanger from '../AttributeChanger'

type Props = React.HTMLAttributes<HTMLDivElement>

const ATTRIBUTES = [
	{ label: '力量', abbr: 'str' },
	{ label: '敏捷', abbr: 'dex' },
	{ label: '體質', abbr: 'con' },
	{ label: '智力', abbr: 'int' },
	{ label: '感知', abbr: 'wis' },
	{ label: '魅力', abbr: 'cha' },
]

const AttributesInput = ({ ...others }: Props): JSX.Element => {
	const [attributePointMap, setAttributePointMap] = useState<
		Record<string, number>
	>({})

	const handleChangeAttribute = useMemo(
		() =>
			memoize(
				(attribute: string) => (result: AttributeChangerStepperResult) => {
					setAttributePointMap((prev) => ({
						...prev,
						[attribute]: result.point,
					}))
				}
			),
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
				{ATTRIBUTES.map((attribute) => (
					<div className='flex-1'>
						<AttributeChanger
							label={attribute.label}
							onChange={handleChangeAttribute(attribute.abbr)}
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default AttributesInput
