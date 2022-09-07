import { register, Text } from '../plasticine'
import { ConfigProps } from '../plasticine/types'

const SimpleWrapper = (props: ConfigProps) => {
	return (
		<Text
			placeholder={props.placeholder}
			label={props.label}
			value={props.value}
			error={props.error}
			oninput={(value: string) => (props.oninput ? props.oninput(value.toUpperCase()) : undefined)}
			component
		/>
	)
}

export default register(SimpleWrapper, 'string')
