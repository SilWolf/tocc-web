import { useCallback, useState } from 'react'
import AttributeNumberStepper, {
	AttributeChangerStepperResult,
} from 'src/components/AttributeChangerStepper'

type Props = React.HTMLAttributes<HTMLDivElement> & {
	onChange?: (value: AttributeChangerStepperResult) => void
}

const AttributeChanger = ({ onChange, ...props }: Props): JSX.Element => {
	const handleChange = useCallback(
		(result) => {
			if (onChange) {
				onChange(result)
			}
		},
		[onChange]
	)

	return (
		<AttributeNumberStepper
			defaultValue={8}
			min={8}
			max={15}
			defaultBonusValue={0}
			bonusMin={0}
			bonusMax={2}
			onChange={handleChange}
		/>
	)
}

export default AttributeChanger
