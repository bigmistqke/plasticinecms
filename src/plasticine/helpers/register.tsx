import { JSXElement } from 'solid-js'
import { JSX } from 'solid-js/jsx-runtime'
import { LabeledInputProps } from '../components/Inputs'
import { ConfigProps } from '../types'

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

export const register = (
	component: (props: ConfigProps) => JSXElement,
	returnType: string,
	defaultValue?: any
): ((props: ConfigProps) => JSXElement) => {
	return (props: ConfigProps) => {
		// this is the path it follows when using the component inside another component
		if (props.component) return component(props)
		// this is the path it follows during the configuration
		// we pass the component which will later be wrapped inside a Dynamic
		// and pass any metadata concerning the
		return {
			returnType,
			defaultValue: defaultValue || defaultValues(returnType),
			...props,
			type: component,
		}
	}
}
