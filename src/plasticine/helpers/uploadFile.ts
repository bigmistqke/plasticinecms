import { ProgressData } from '../components/types'

const uploadFile = ({
	file,
	onprogress,
	onerror,
	onsuccess,
}: {
	file: File
	onprogress?: (progress: ProgressData) => void
	onerror?: (message: string) => void
	onsuccess?: (message: string) => void
}) => {
	const formData = new FormData()
	formData.append('avatar', file)

	let xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:2999/upload-file')
	xhr.send(formData)

	xhr.onload = function () {
		if (xhr.status != 200) {
			if (onerror) onerror(`Error ${xhr.status}: ${xhr.statusText}`)
		} else {
			if (onsuccess) onsuccess(xhr.responseText)
		}
	}

	xhr.onprogress = function (event) {
		if (onprogress) {
			onprogress({
				alpha: event.loaded / event.total,
				total: event.total,
				loaded: event.loaded,
			})
		}
	}

	xhr.onerror = function () {
		if (onerror) {
			onerror('Request failed')
		} else {
			console.error('Request failed')
		}
	}
}

export default uploadFile
