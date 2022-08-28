import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { getSocialWorkKey } from './../keys';

export const useSocial = (id: string, isBest?: boolean) => {
  const query = useQuery(
    getSocialWorkKey(id, isBest),
    () => API.social.get(id, isBest),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          toast(
            'Произошла критическая ошибка при загрузке программы по соц. работе!',
            {
              position: 'bottom-center',
            }
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
    apiData: query.data?.data ? query.data.data : null,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
