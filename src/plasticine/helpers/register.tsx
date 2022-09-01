const defaultValues = (key: string) => ({
    "number": 0,
    "string": "",
    "object": {},
    "repeater": [{}],
    "array": []
}[key])

export const register = (component: Function, returnType: string, defaultValue?: any) => {
    return (props: any) => {
        if (props.component) return component(props);
        return {
            type: component,
            returnType,
            defaultValue: defaultValue || defaultValues(returnType),
            ...props
        }
    }
}

