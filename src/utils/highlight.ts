import Prism from 'prismjs';

export const highlight = (code: string, lang: string) => {
  const grammar = Prism.languages[lang] ?? Prism.languages.plain;

  return Prism.highlight(code, grammar, lang);
};
