<script lang="ts">
	import { onMount } from 'svelte';

	let dragOver: boolean = false;
	let fileList: string[] = [];

	const sendFiles = async (files: FileList) => {
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('file', files[i]);
		}
		await fetch('/api/files', {
			method: 'POST',
			body: formData
		});
		getFiles();
	};

	const getFiles = async () => {
		const response = await fetch('/api/files');
		fileList = await response.json();
	};

	const onDrop = (event: DragEvent) => {
		dragOver = false;
		const files = event.dataTransfer?.files;
		if (files) {
			sendFiles(files);
		}
	};

	onMount(getFiles);
  
</script>

<div
	on:drop|preventDefault={onDrop}
	on:dragover|preventDefault
	on:dragleave={() => (dragOver = false)}
	on:dragleave={() => (dragOver = true)}
	class="filedrop"
	class:dragOver
>
	{#each fileList as file}
    <a class="file" href={`/api/files/${encodeURIComponent(file)}`}>{file}</a>
	{/each}
</div>

<style>
	.filedrop {
		border: 1px solid lightgrey;
    border-radius: 3px;
    margin: 2em;
	}
	.filedrop.dragOver {
		border: 1px solid blue;
		background-color: lightblue;
	}
	.file {
    font-size: 12pt;
    padding: .3em .6em;
    display: block;
		font-family: monospace;
    border-bottom: 1px solid #eee;
    text-decoration: none;
	}
  .file:last-child {
    border-bottom: none;
  }
  .file:hover {
    background-color: #f7f7f7;
  }
</style>
