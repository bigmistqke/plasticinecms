import { JSX } from 'solid-js/jsx-runtime'
import { LabeledInputProps } from '../components/Inputs'

const defaultValues = (key: string) => {
	const valuePairs: { [key: string]: any } = {
		number: 0,
		string: '',
		object: {},
		repeater: [{}],
		array: [],
	}
	return valuePairs[key]
}

interface RegisterProps extends LabeledInputProps {
	component: boolean
}

export const register = (
	component: (props: LabeledInputProps) => JSX.Element,
	returnType: string,
	defaultValue?: any
) => {
	console.log(component)

	return (props: any) => {
		if (props.component) return component(props)
		return {
			returnType,
			defaultValue: defaultValue || defaultValues(returnType),
			...props,
			type: component,
		}
	}
}
