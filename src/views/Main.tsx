import mdDark from 'github-markdown-css/github-markdown-dark.css?raw';
import mdLight from 'github-markdown-css/github-markdown-light.css?raw';
import prismLight from 'prism-themes/themes/prism-vs.css?raw';
import prismDark from 'prism-themes/themes/prism-vsc-dark-plus.css?raw';
import React, { useCallback, useEffect } from 'react';
import { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { css, styled } from 'twin.macro';
import IconPosts from '~icons/ri/article-line';
import IconProjects from '~icons/ri/function-line';
import IconGithub from '~icons/ri/github-line';
import IconLanguage from '~icons/ri/global-line';
import IconEmail from '~icons/ri/mail-line';
import IconDark from '~icons/ri/moon-line';
import IconSnippets from '~icons/ri/sticky-note-line';
import IconLight from '~icons/ri/sun-line';

import { useDarkMode, DarkModeValueContext } from '../hooks/useDarkMode';
import i18n from '../i18n';
import { loadThemeStyles } from '../utils/loadThemeStyles';

const title = import.meta.env.VITE_TITLE;
const email = import.meta.env.VITE_EMAIL;
const githubUrl = import.meta.env.VITE_GITHUB_URL;

export default function Main() {
  const { t } = useTranslation();

  const [darkModeEnabled, setDarkModeEnabled] = useDarkMode();

  useEffect(() => {
    loadThemeStyles('prism-theme', darkModeEnabled ? prismDark : prismLight);
    loadThemeStyles('markdown-theme', darkModeEnabled ? mdDark : mdLight);
  }, [darkModeEnabled]);

  const onToggleDarkMode = useCallback(() => {
    setDarkModeEnabled(!darkModeEnabled);
  }, [darkModeEnabled]);

  const onToggleLanguage = useCallback(() => {
    changeLanguage(i18n.language === 'cn' ? 'en' : 'cn');
    localStorage.setItem('language', i18n.language);
  }, []);

  return (
    <DarkModeValueContext.Provider value={darkModeEnabled}>
      <div className="relative pb-16 min-h-screen flex flex-col">
        <header className="h-20 w-full">
          <div className="mx-auto max-w-screen-lg flex px-8 items-center h-full text-slate-500 font-semibold">
            <Link className="text-lg" to="/">
              <span>://</span>
              <span className="mx-0.5 text-blue-500">{title}</span>
            </Link>

            <nav className="grid gap-3 lg:gap-6 grid-flow-col ml-auto leading-5">
              <NavLink
                className="opacity-60 cursor-pointer hover:(opacity-100 text-blue-500) active:(opacity-100 text-blue-500"
                to="/posts"
              >
                <IconPosts className="inline lg:hidden" />
                <span className="hidden lg:inline">{t('tab.posts')}</span>
              </NavLink>

              <NavLink
                className="opacity-60 cursor-pointer hover:(opacity-100 text-blue-500) active:(opacity-100 text-blue-500"
                to="/snippets"
              >
                <IconSnippets className="inline lg:hidden" />
                <span className="hidden lg:inline">{t('tab.snippets')}</span>
              </NavLink>

              <NavLink
                className="opacity-60 cursor-pointer hover:(opacity-100 text-blue-500) active:(opacity-100 text-blue-500"
                to="/projects"
              >
                <IconProjects className="inline lg:hidden" />
                <span className="hidden lg:inline">{t('tab.projects')}</span>
              </NavLink>

              <div className="w-[1px] h-full bg-gray-200 dark:bg-gray-800"></div>

              <a
                className="opacity-60 cursor-pointer hover:(opacity-100 text-blue-500) active:(opacity-100 text-blue-500"
                href={`mailto:${email}`}
              >
                <IconEmail />
              </a>
              <a
                className="opacity-60 cursor-pointer hover:(opacity-100 text-blue-500) active:(opacity-100 text-blue-500"
                href={githubUrl}
                target="_blank"
              >
                <IconGithub />
              </a>
              <a
                className="opacity-60 cursor-pointer hover:(opacity-100 text-blue-500) active:(opacity-100 text-blue-500"
                onClick={onToggleLanguage}
              >
                <IconLanguage />
              </a>
              <a
                className="opacity-60 cursor-pointer hover:(opacity-100 text-blue-500) active:(opacity-100 text-blue-500"
                onClick={onToggleDarkMode}
              >
                {darkModeEnabled ? <IconLight /> : <IconDark />}
              </a>
            </nav>
          </div>
        </header>

        <Outlet />

        <footer className="absolute bottom-4 left-0 space-x-2 w-full text-sm text-center text-slate-300 select-none">
          <div className="mx-auto max-w-screen-lg dark:text-slate-800">
            <a tw="hover:text-blue-500" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY-NC-SA 4.0
            </a>
            <span className="ml-2">2024-present © DongWook Lee</span>
          </div>
        </footer>
      </div>
    </DarkModeValueContext.Provider>
  );
}
