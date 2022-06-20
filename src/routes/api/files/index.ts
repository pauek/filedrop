import type { RequestEvent } from '@sveltejs/kit';
import fs from 'fs/promises';
import { FILES_FOLDER } from '$lib/config';

export const post = async (event: RequestEvent) => {
	try {
		const formData = await event.request.formData();
		for (let entry of formData.getAll('file')) {
			const file = entry as File;
			const bytes = await file.arrayBuffer();
			const view = new Uint8Array(bytes);
			await fs.writeFile(`${FILES_FOLDER}/${file.name}`, view);
      console.log("Wrote", file.name, `${bytes.byteLength} bytes`);
		}
		return {
			body: { ok: true }
		};
	} catch (e: any) {
    console.error(e);
		return {
      status: 500,
			body: { error: e.toString() }
		};
	}
};

export const get = async (event: RequestEvent) => {
  const files = await fs.readdir(FILES_FOLDER);
  return {
    body: files,
  }
}