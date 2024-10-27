import { SANDBOX_TEMPLATES } from '@codesandbox/sandpack-react';
import MarkdownIt from 'markdown-it';
import { highlight } from './highlight';
import { parseArgs } from './parseArgs';

export const toHtml = (markdown: string, playground?: boolean) => {
  if (!markdown) return '';

  const md = new MarkdownIt({ highlight });
  const defaultFence = md.renderer.rules.fence;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const { content, info } = tokens[idx];

    const args = parseArgs(info);

    if (playground && Object.keys(SANDBOX_TEMPLATES).includes(args.template)) {
      const el = document.createElement('div');

      Object.assign(el.dataset, {
        playground: true,
        code: content,
        template: args.template,
        autorun: args.autorun !== 'false',
      });

      return el.outerHTML;
    }

    return defaultFence?.(tokens, idx, options, env, self) || '';
  };

  return md.render(markdown);
};
