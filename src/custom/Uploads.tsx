import { createEffect, createSignal, For, Show } from "solid-js"
import { Dynamic } from "solid-js/web";
import { register } from "../plasticine"
import z from "zod"
import uploadFile from "../plasticine/helpers/uploadFile";
import { buttonStyle } from "../plasticine/components/styles";

const Thumbnail = (props: { file: File }) => {
    const filetypes = {
        mov: (props: { class: string, src: string }) => <video {...props} />,
        mp4: (props: { class: string, src: string }) => <video {...props} />,
        jpg: (props: { class: string, src: string }) => <img {...props} />,
        jpeg: (props: { class: string, src: string }) => <img {...props} />,
        png: (props: { class: string, src: string }) => <img {...props} />,
    }

    const extension = props.file.name.split(".").slice(1)[0].toLowerCase();

    return extension in filetypes ?
        <Dynamic component={filetypes[extension]} class="w-16 h-16 object-fill rounded-full shrink-0" src={URL.createObjectURL(props.file)} /> :
        <div class="w-16 h-16 object-fill rounded-full shrink-0 bg-slate-400"></div>

}

const Progress = (props) => {
    createEffect(() => console.log(props.alpha))
    return <div class="rounded-xl h-6 w-32 relative flex overflow-hidden self-center">
        <span class="absolute z-10 w-full text-center self-center text-xs">{props.loaded} / {props.total} {props}</span>
        <span class="absolute left-0 top-0 h-full bg-slate-200 " style={{ width: props.alpha * 100 + "%" }} />
    </div>
}

const File = (props: { file: File }) => {
    const [progress, setProgress] = createSignal<{ alpha: number, loaded: number, total: number }>();
    const [completed, setCompleted] = createSignal(false);

    uploadFile({
        file: props.file,
        onprogress: (p) => setProgress(p),
        onerror: (error) => console.error("error uploading ", error),
        onsuccess: () => { setTimeout(() => { setCompleted(true) }, 1000) }
    })

    return <div class="p-2 flex gap-2">
        <Thumbnail file={props.file} />
        <span class="pl-2 flex-1 text-xs self-center">{props.file.name}</span>
        <Show when={!completed()}>
            <Progress alpha={progress()?.alpha} loaded={progress()?.loaded} total={progress()?.total} />
        </Show>
        <button class={`self-center ${buttonStyle}`}>delete</button>
    </div>
}



const Uploads = (props) => {
    const [previews, setPreviews] = createSignal<File[]>([]);

    const processInput = (fileList: FileList) => {
        const files = Array.from(fileList)
        setPreviews(files);
        props.oninput(files.map(file => file.name))



        /* fetch('http://localhost:2999/upload-file', {
            method: 'POST',
            body: formData
        }) */


    }

    createEffect(() => console.log("VALUE", props.value))

    return <>
        <input type="file" multiple oninput={(e) => {
            processInput(e.target.files)
        }} />
        <For each={previews() || []}>
            {
                file => <File file={file} />
            }
        </For>

    </>
}

export default register(Uploads, "string")