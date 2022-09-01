import { Component, createEffect, createSignal } from "solid-js"
import { Dynamic } from "solid-js/web"

import { useStore } from "../store"

import { fieldComponent } from "./types"

const Field: Component<fieldComponent> = (props) => {
    let { state, setState } = useStore(props);

    let [error, setError] = createSignal(false);

    createEffect(() => {
        if (typeof state() === 'undefined') {
            // setState(props.data.defaultValue)
        }
    })

    const oninput = (value: any) => {

        if (props.data.oninput)
            value = props.data.oninput(value)

        setState(value);

        if (!props.data.validate) {
            setError(false);
            return;
        }

        const result = props.data.validate(value);

        if (
            (typeof result === "object" && result.success) ||
            (typeof result === "boolean" && result)
        ) {
            setError(false);
            return;
        }

        setError(result.error || true);

        return false;
    }

    return <Dynamic
        {...props.data}
        path={props.path}
        component={props.data.type}
        data={props.data}
        error={error()}
        value={state()}
        oninput={oninput}
    />
}

export default Field