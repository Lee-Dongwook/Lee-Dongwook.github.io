import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleModel, createArticleModel } from '../models/articleModel';
import { useHandling } from './useHandling';
import github from '../services/github';

export function useArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleModel>();

  const [loading, load] = useHandling(
    useCallback(async () => {
      const result = await github.getIssue(parseInt(id!, 10));
      setArticle(createArticleModel(result));
    }, [id]),
    true,
  );

  useEffect(() => {
    load();
  }, [id]);

  return [article] as const;
}
