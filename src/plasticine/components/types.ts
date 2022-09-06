export interface TabData {
	amount: number
	selectedIndex: number
}

export interface RegisteredFieldData {
	type: Function
	label: string
	oninput?: Function
	validate?: Function
	children?: RegisteredFieldData[]
	defaultValue: any
	component: boolean
}

export interface ProgressData {
	alpha?: number
	total?: number
	loaded?: number
	message?: string
}
