import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useEffect, memo, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tw from 'twin.macro';
import IconComments from '~icons/ri/chat-2-line';

import CommentItem from '../components/CommentItem';
import LabelItem from '../components/LabelItem';
import MarkdownHtml from '../components/MarkdownHtml';
import { Pagination } from '../components/Pagination';

import { useArticle } from '../hooks/useArticle';
import { useComments } from '../hooks/useComments';
import { CommentModel } from '../models/commentModel';
import { createQueryURL } from '../utils/createQueryUrl';
import { LabelModel } from '../models/labelModel';

export default memo(function Article() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [article] = useArticle();
  const [loading, comments, query] = useComments();

  const createdAt = useMemo(() => {
    return article ? format(new Date(article.createdAt), t('dateFormat')) : '';
  }, ['article']);

  const newCommentUrl = useMemo(() => {
    return article ? `${article.htmlUrl}#new_comment_field` : '';
  }, [article]);

  const getLabelLink = useCallback((label: string) => {
    return `../${createQueryURL({ label, page: 1 })}`;
  }, []);

  const onPageChange = useCallback((page: number) => {
    navigate(createQueryURL({ page }));
  }, []);

  return (
    <article className="mx-auto w-full max-w-screen-lg px-8 py-12">
      <article>
        {article && (
          <>
            <h2 className="text-2xl text-slate-700">{article.title}</h2>
            <div className="mt-4 mb-8 space-x-4 flex flex-wrap content-center text-sm text-slate-400">
              <span>{createdAt}</span>
              <span className="flex items-center">
                {article.labels.map((label: LabelModel) => (
                  <LabelItem key={label.id} label={label} getLink={getLabelLink} />
                ))}
              </span>
              <span className="flex items-center">
                <IconComments />
                <span className="ml-1">{article.comments}</span>
              </span>
            </div>
            <MarkdownHtml markdown={article.body} playground />
          </>
        )}
      </article>

      <section className="mt-8">
        <h2 className="text-2xl text-slate-700">{t('comment.title')}</h2>
        <a className="mt-4 block w-full h-10 leading-10 text-slate-400 text-center border border-gray-400 rounded-sm outline-none cursor-pointer">
          {t('comment.btn')}
        </a>

        {!!comments.length && (
          <div>
            {comments.map((comment: CommentModel) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Pagination
            page={query.page}
            pageSize={query.pageSize}
            total={article ? article.comments : 0}
            onChange={onPageChange}
          />
        </div>
      </section>
    </article>
  );
});
