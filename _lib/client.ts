import { createClient } from 'next-sanity';

export const client = createClient({
  apiVersion: '2022-11-28',
  dataset: 'production',
  projectId: '0ciqok3x',
  useCdn: false,
});
