import { JSXElement } from 'solid-js'

export default (props: { id: string; label: string; children: JSXElement }) => (
	<div class="flex">
		<label class="w-32 text-sm p-1" for={props.id}>
			{props.label}
		</label>
		<div class="flex-1">{props.children}</div>
	</div>
)
