import keywordData from './search-keywords.json';

type KeywordData = {
  keywords: string[];
};

const data = keywordData as KeywordData;
if (!Array.isArray(data.keywords) || data.keywords.length === 0) {
  throw new Error('test/data/search-keywords.json must provide at least one keyword');
}

export const searchKeywords = data.keywords;
