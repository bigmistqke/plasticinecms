import { JSXElement } from 'solid-js'
import { ConfigProps, CustomJSXElement } from '../types'

const defaults = {
	number: 0,
	string: '',
	object: {},
	repeater: [{}],
	array: [],
}

type Keys = keyof typeof defaults
type Values = typeof defaults[Keys]

const getDefaultsFromReturnType = (key: Keys): typeof defaults[Keys] => defaults[key]

export const register = <TValue>(
	component: (props: ConfigProps) => JSXElement,
	returnType: Keys,
	defaultValue?: TValue
): ((props: ConfigProps) => JSXElement) => {
	return (props: ConfigProps) => {
		// this is the path it follows when using the component inside another component
		if (props.component) return component(props)

		// this is the path it follows during the configuration
		// we pass the component which will later be wrapped inside a Dynamic
		// and pass any metadata concerning the
		return Object.assign(
			() => {
				throw new Error('Cannot render directly')
			},
			{
				returnType,
				defaultValue: defaultValue || getDefaultsFromReturnType(returnType),
				...props,
				type: component,
			}
		)
	}
}

// const x = (register(({ label }) => 'hallo', 'string')({ label: 'string' }) as CustomJSXElement).returnType
