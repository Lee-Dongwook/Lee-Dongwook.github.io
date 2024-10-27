import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CommentModel } from '../models/commentModel';
import MarkdownHtml from './MarkdownHtml';

export interface CommentItemProps {
  comment: CommentModel;
}

export default function CommentItem(props: CommentItemProps) {
  const { comment } = props;

  const { t } = useTranslation();

  const createdAt = useMemo(() => {
    return format(new Date(comment.createdAt), 'yyyy-MM-dd HH:mm:ss');
  }, ['article']);

  const link = useMemo(() => {
    const { origin, pathname } = window.location;
    return [origin, pathname, `#${comment.id}`].join('');
  }, [comment]);

  return (
    <div className="relative mt-8 pt-8 pl-12 border-t border-gray-300 dark:border-gray-800">
      <div className="absolute top-8 left-0 w-8 h-8 rounded-full overflow-hidden">
        <img src={comment.user.avatarUrl} alt="Avatar" />
      </div>
      <header className="mb-2 space-x-4 flex items-center text-sm">
        <a href={comment.user.htmlUrl}>{comment.user.login}</a>
        {comment.authorAssociation === 'OWNER' && (
          <span className="px-1 text-xs text-white leading-5 rounded-sm bg-blue-500">
            {t('comment.owner')}
          </span>
        )}
        <a href={link} className="opacity-40 text-xs">
          {createdAt}
        </a>
      </header>
      <MarkdownHtml markdown={comment.body} />
    </div>
  );
}
