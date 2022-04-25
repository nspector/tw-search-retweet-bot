import * as db from '#tools/db';
import * as scrape from '#tools/scrape';
import dedup from '#utils/tools/utils/tools/dedup';
import diff from '#utils/tools/utils/calc/diff';

const data: () => Promise<string[]> = async (): Promise<string[]> => {
  try {
    const db_data: string[] = dedup<string>(
      (await (await db()).read()) as string[]
    );
    const scrape_data: string[] = dedup<string>(await scrape());
    const diff_data: string[] = diff<string[]>(scrape_data)(db_data) as [];
    if (diff_data.length) {
      await (await db()).write(diff_data);
    }
    return diff_data;
  } catch (e: unknown) {
    throw new Error(e as string);
  }
};

export = data;
