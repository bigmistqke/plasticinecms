import { register } from "../plasticine"
import SimpleWrapper from "./SimpleWrapper"

const ComposedWrapper = (props: any) => {
    return <SimpleWrapper
        placeholder={props.placeholder}

        label={props.label}
        value={props.value}

        error={props.error}
        oninput={(value: string) => {
            props.oninput(value.split("").filter(v => v !== " ").join(" "))
        }}

        component
    />
}

export default register(ComposedWrapper, "string")