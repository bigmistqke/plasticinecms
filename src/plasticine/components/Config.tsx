import { Component, JSX } from 'solid-js'

const Config: Function = (props: { useAsTitle: string; children: Function | Function[] }) => {
	return {
		useAsTitle: props.useAsTitle,
		fields: Array.isArray(props.children) ? props.children : [props.children],
	}
}
export default Config
