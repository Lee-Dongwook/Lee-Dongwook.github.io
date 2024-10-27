import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, type To } from 'react-router-dom';
import tw from 'twin.macro';
import IconComment from '~icons/ri/chat-2-line';

import { ArticleModel } from '../models/articleModel';
import LabelItem from './LabelItem';

export interface ArticleItemProps {
  article: ArticleModel;
  getLink: (id: number) => To;
  getLabelLink: (label: string) => To;
}

export default function ArticleItem(props: ArticleItemProps) {
  const { article, getLink, getLabelLink } = props;

  const { t } = useTranslation();

  const createdAt = useMemo(() => format(new Date(article.createdAt), t('dateFormat')), [article]);

  return (
    <div className="flex flex-col justify-center h-20 border-t border-dotted border-gray-300 dark:border-gray-800">
      <div className="flex items-center">
        <div className="hidden lg:block w-36 text-sm text-slate-400 dark:text-slate-600 text-right">
          {createdAt}
        </div>
        <div className="ml-4 flex-l min-w-0 truncate">
          <Link to={getLink(article.number)}>{article.title}</Link>
        </div>
      </div>
      <div className="flex items-center mt-1">
        <div className="hidden lg:block w-36 text-sm text-slate-400 dark:text-slate-600 text-right">
          <IconComment className="inline mr-2" />
          {article.comments}
        </div>
        <div className="ml-4 flex flex-1 min-w-0 truncate text-sm text-slate-400">
          {article.labels.map((label) => (
            <LabelItem key={label.id} label={label} getLink={getLabelLink} />
          ))}
        </div>
      </div>
    </div>
  );
}
