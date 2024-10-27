import { useMemo, useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentModel } from '../models/commentModel';
import github from '../services/github';
import { useHandling } from './useHandling';
import { useQuery } from './useQuery';

export function useCommentsQuery() {
  const { id } = useParams();
  const { page } = useQuery();

  return useMemo(
    () => ({
      issue: parseInt(id!, 10),
      page: parseInt(page ?? '1', 10),
      pageSize: parseInt(import.meta.env.VITE_COMMENT_PAGE_SIZE, 10),
    }),
    [id, page],
  );
}

export function useComments() {
  const query = useCommentsQuery();
  const [comments, setComments] = useState<CommentModel[]>([]);

  const [loading, load] = useHandling(
    useCallback(async () => {
      const result = (await github.listComments(query)) as unknown as CommentModel[];

      setComments(
        result.map((raw) => ({
          id: raw.id,
          body: raw.body,
          htmlUrl: raw.htmlUrl,
          authorAssociation: raw.authorAssociation,
        })),
      );
    }, [query]),
    true,
  );

  useEffect(() => {
    load();
  }, [query]);

  return [loading, comments, query] as const;
}
