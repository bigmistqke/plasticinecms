import { register, Text } from '../plasticine'

const SimpleWrapper = (props: {
	placeholder?: string
	label: string
	value: string
	error?: string | boolean
	oninput: Function
}) => {
	console.log(
		'SIMPLEWRAP',
		<Text
			placeholder={props.placeholder}
			label={props.label}
			value={props.value}
			error={props.error}
			oninput={(value: string) => props.oninput(value.toUpperCase())}
			component
		/>
	)
	return (
		<Text
			placeholder={props.placeholder}
			label={props.label}
			value={props.value}
			error={props.error}
			oninput={(value: string) => props.oninput(value.toUpperCase())}
			component
		/>
	)
}

export default register(SimpleWrapper, 'string')
