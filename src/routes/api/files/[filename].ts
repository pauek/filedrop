
import type { RequestEvent } from '@sveltejs/kit';
import fs from 'fs/promises';
import { FILES_FOLDER } from '$lib/config';

export const get = async (event: RequestEvent) => {
  const filename = event.params.filename;
  const bytes = await fs.readFile(`${FILES_FOLDER}/${filename}`);
  return {
    status: 200,
    body: bytes,
    Headers: {
      "Content-Type": "application/octet-stream",
      "Content-Transfer-Encoding": "Binary",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  };
}