import { Global, css } from '@emotion/react';
import React from 'react';
import tw, { GlobalStyles } from 'twin.macro';

const customStyles = css`
  @import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@5.2/distr/fira_code.css);

  body {
    font-family: 'Fira Code VF', 'Segoe UI', 'Consolas', 'monospace', 'Microsoft YaHei';
    font-variant-ligatures: normal;
    background-size: 32px 32px;
    background-image: radial-gradient(rgba(59, 130, 246, 0.2) 1px, rgba(59, 130, 246, 0) 0px);
    ${tw`overflow-y-scroll antialiased`}
    ${tw`bg-slate-50 text-slate-900`}
    ${tw`dark:bg-black dark:text-slate-400`}
  }

  *::-webkit-scrollbar {
    ${tw`w-2 h-2`}
  }

  *::-webkit-scrollbar-thumb {
    ${tw`bg-slate-200 dark:bg-slate-700`}
  }

  .markdown-body pre {
    @apply rounded shadow-md border border-gray-200 bg-white dark:bg-slate-800 dark:border-gray-800;
  }
`;

export default function GlobalStyle() {
  return (
    <>
      <GlobalStyles />
      <Global styles={customStyles} />
    </>
  );
}
