import { readFileSync } from "fs";
import { join } from "path";

export function readJsonFile(file: string) {
  let filePath = ''

  if (process.env.NODE_ENV === 'production') {
    filePath = join(process.cwd(), `${process.env.APP_URL}/data/${file}.json`);
  } else {
    filePath = join(process.cwd(), `public/data/${file}.json`);
  }

  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}