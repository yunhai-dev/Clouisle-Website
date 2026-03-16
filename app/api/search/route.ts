import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

const searchApi = createFromSource(source, {
  language: 'english',
  localeMap: {
    en: 'english',
    zh: 'english',
  },
});

export const GET = searchApi.staticGET;
