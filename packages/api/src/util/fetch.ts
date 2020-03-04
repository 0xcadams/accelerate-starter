import { default as zeitFetch, FetchOptions } from '@zeit/fetch';
import nodeFetch from 'node-fetch';

const customFetch = zeitFetch(nodeFetch);

export const fetch = async (url: string, options?: FetchOptions) => {
  return customFetch(url, options);
};
