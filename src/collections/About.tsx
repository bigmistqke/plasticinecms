import ComposedWrapper from '../custom/ComposedWrapper'
import SimpleWrapper from '../custom/SimpleWrapper'
import Upload from '../custom/Upload'
import Uploads from '../custom/Uploads'
import { Text, Config } from '../plasticine'

export default (
	<Config useAsTitle="simple wrapper">
		<Text test="ok" />
		{/* <SimpleWrapper
            label="simple wrapper"
            placeholder="this custom wrapper CAPS LOCKS everything"
            validate={(value: any) => {
                return value.indexOf("/") === -1 ?
                    { success: true } :
                    { success: false, error: "no slashes allowed in title" }
            }}
        />
        <ComposedWrapper
            label="advanced wrapper"
            placeholder="this custom wrapper is a wrapper around the wrapper above and adds additional ' ' in between the characters"
            validate={(value: any) => {
                return value.indexOf("/") === -1 ?
                    { success: true } :
                    { success: false, error: "no slashes allowed in title" }
            }}
        />
        <Repeater label="credits">
            <Text label="name" />
            <Textarea
                label="description"
                oninput={(value: any) => value.toUpperCase()}
                validate={(value: any) => {
                    return value.indexOf("/") === -1 ?
                        { success: true } :
                        { success: false, error: "no slashes allowed in title" }
                }}
            />
        </Repeater> */}
	</Config>
)
