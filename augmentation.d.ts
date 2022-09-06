import { ConfigProps } from './src/plasticine/components/types'

declare module 'solid-js/jsx-runtime' {
	namespace JSX {
		interface CustomElement extends ConfigProps {
			returnType: string
			defaultValue: any
			type: (props: ConfigProps) => JSX.Element
		}
		interface ElementRegistry {
			CustomElement: CustomElement
		}
	}
}
