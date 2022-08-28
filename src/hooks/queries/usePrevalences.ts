import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { prevalencesKey } from './keys';

export const usePrevalences = () => {
  const query = useQuery(
    prevalencesKey,
    () => API.queries.fetchCategories(prevalencesKey),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          toast(
            'Произошла критическая ошибка при загрузке распространенностей!',
            { position: 'bottom-center' }
          );
        } else if (e instanceof ApiError) {
          toast(e.message, { position: 'bottom-center' });
        }
      },
    }
  );

  return {
    ...query,
    apiError: query.data?.error,
    apiData: query.data?.data,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
