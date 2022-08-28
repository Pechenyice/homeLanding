import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { directionsKey } from './keys';

export const useDirections = () => {
  const query = useQuery(
    directionsKey,
    () => API.queries.fetchCategories(directionsKey),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          toast('Произошла критическая ошибка при загрузке направлений!', {
            position: 'bottom-center',
          });
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
