import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { categoriesKey, groupsKey } from './../keys';

export const useCategoriesToGroups = () => {
  const query = useQuery(
    [categoriesKey, groupsKey, 'categories', 'relations'],
    () => API.queries.fetchCategoriesRelations(categoriesKey, groupsKey),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          toast(
            'Произошла критическая ошибка при загрузке ключей словарей категорий!',
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
