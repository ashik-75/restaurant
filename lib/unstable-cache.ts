import { unstable_cache as unstable_next_cache } from "next/cache";
import { cache } from "react";

export const unstable_cache = <Inputs extends unknown[], Output>(
  callback: (...args: Inputs) => Promise<Output>,
  key: string[],
  options: { revalidate: number; tags?: string[] }
) => cache(unstable_next_cache(callback, key, options));
