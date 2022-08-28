import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { rnsuCategoriesKey } from './keys';

export const useRnsuCategory = () => {
  const query = useQuery(
    rnsuCategoriesKey,
    () => API.queries.fetchCategories(rnsuCategoriesKey),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          toast('Произошла критическая ошибка при загрузке категорий РНСУ!', {
            position: 'bottom-center',
          });
        } else if (e instanceof ApiError) {
          toast(e.message, {
            position: 'bottom-center',
          });
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
