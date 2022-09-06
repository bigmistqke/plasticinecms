import SimpleWrapper from '../custom/SimpleWrapper'
import { Text, Repeater, Textarea, Config } from '../plasticine'

export default (
	<Config useAsTitle="title">
		<SimpleWrapper
			label="title"
			test="whatever"
			placeholder="tryout"
			validate={(value: any) => {
				return value.indexOf('/') === -1
					? { success: true }
					: { success: false, error: 'no slashes allowed in title' }
			}}
		/>
		<Repeater label="credits">
			<Text label="name" test="ok" />
			<Repeater label="credits">
				<Text label="name" />
				<Textarea
					label="description"
					oninput={(value: any) => value.toUpperCase()}
					validate={(value: any) => {
						return value.indexOf('/') === -1
							? { success: true }
							: {
									success: false,
									error: 'no slashes allowed in title',
							  }
					}}
				/>
			</Repeater>
		</Repeater>
	</Config>
)
