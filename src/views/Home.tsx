import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import IconArrowRight from '~icons/ri/arrow-right-line';
import { ShapeEffect } from '../components/ShapeEffect';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="px-8 py-20 w-full flex flex-col flex-1 justify-center">
      <div className="absolute [z-index:0] top-0 left-0 w-full h-full [user-select:none] pointer-events-none opacity-50 blur-sm">
        <ShapeEffect count={12} sizes={[30, 60]} />
      </div>
      <div className="absolute [z-index:2] top-0 left-0 w-full h-full [user-select:none] pointer-events-none">
        <ShapeEffect count={12} sizes={[40, 80]} />
      </div>
      <div className="relative [z-index:1] mx-auto max-w-screen-lg text-center">
        <h2 className="text-5xl text-slate-600 font-bold leading-10">{t('intro.title')}</h2>
        <p className="text-3xl mt-6 text-slate-400">{t('intro.description')}</p>
        <Link to="/posts">
          <button className="mt-12 py-3 px-6 inline-flex items-center bg-blue-500 active:bg-blue-600 text-blue-50 text-center gap-4 hover:gap-8 rounded-full outline-none transition-all">
            <span>{t('intro.link')}</span>
            <IconArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
}
