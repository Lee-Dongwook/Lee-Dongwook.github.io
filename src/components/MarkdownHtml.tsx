import { SANDBOX_TEMPLATES } from '@codesandbox/sandpack-react';
import MarkdownIt from 'markdown-it';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';
import tw, { styled } from 'twin.macro';

import Playground, { PlaygroundProps } from './Playground';
import { DarkModeValueContext } from '../hooks/useDarkMode';
import { highlight } from '../utils/highlight';
import { parseArgs } from '../utils/parseArgs';
import { toHtml } from '../utils/toHtml';

type ReactRootElement = HTMLDivElement & { reactRoot?: Root };

export interface MarkdownHtmlProps {
  markdown: string;
  playground?: boolean;
}

export default memo(function MarkdownHtml(props: MarkdownHtmlProps) {
  const { markdown, playground } = props;
  const darkMode = useContext(DarkModeValueContext);

  const container = useRef<HTMLDivElement>(null);
  const playgrounds = useRef<Root[]>([]);
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    setHtml(toHtml(markdown, playground));
  });

  useEffect(() => {
    if (!container.current) return;

    container.current
      .querySelectorAll<HTMLDivElement>('[data-playground]')
      .forEach((el: ReactRootElement) => {
        if (!el.reactRoot) {
          el.reactRoot = createRoot(el);
          playgrounds.current.push(el.reactRoot);
        }

        el.reactRoot.render(
          <Playground
            {...(el.dataset as unknown as PlaygroundProps)}
            theme={darkMode ? 'dark' : 'light'}
          />,
        );
      });
  }, [html, darkMode]);

  useEffect(() => {
    return () => {
      playgrounds.current.forEach((root) => {
        setTimeout(() => root.unmount(), 0);
      });
    };
  }, []);

  return (
    <div
      className="bg-transparent markdown-body"
      ref={container}
      dangerouslySetInnerHTML={{ __html: html }}
    >
      {/* <pre className="rounded shadow-md border border-gray-200 bg-white dark:bg-slate-800 dark:border-gray-800"></pre> */}
    </div>
  );
});
