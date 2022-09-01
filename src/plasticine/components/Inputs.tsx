import { Component, createEffect, createUniqueId, onMount, Show } from "solid-js";
import { register } from "../helpers/register";
import { inputProps } from "./types";

const inputStyle = "rounded-lg border-2 p-1 pl-3 w-full outline-none text-slate-700"

const ErrorMessage: Component<{ error: string }> = (props) =>
    <Show when={props.error}>
        <span class="ml-2 text-sm text-red-500">{props.error}</span>
    </Show>

const Input: Component<inputProps> = (props) => ((id = createUniqueId()) => {
    const Element = (p: any) => props.type === 'textarea' ? <textarea {...p} /> : <input type={props.type} {...p} />

    return <>
        <div class="flex">
            <label class="w-32 text-sm p-1" for={id}>{props.label}</label>
            <div class="flex-1">
                <Element
                    id={id}
                    class={`${props.error ? "border-red-500" : "border-white"} ${inputStyle} `}
                    title={props.error || ""}

                    value={props.value || null}
                    placeholder={props.placeholder}

                    onfocus={props.onfocus}
                    onchange={props.onchange}
                    oninput={(e: { target: { value: any } }) => props.oninput(e.target.value)}
                />
                <ErrorMessage error={props.error} />
            </div>
        </div>
    </>
})()

export const Number = register((props: any) =>
    <Input
        {...props}
        type="text"
    />,
    "number"
);
export const Text = register((props: any) =>
    <Input
        {...props}
        type="text"
    />,
    "string"
);
export const Textarea = register((props: any) =>
    <Input
        {...props}
        type="textarea"
    />,
    "string"
);
