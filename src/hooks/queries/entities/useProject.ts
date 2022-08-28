import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { getProjectKey } from './../keys';

export const useProject = (id: string, isBest?: boolean) => {
  const query = useQuery(
    getProjectKey(id, isBest),
    () => API.project.get(id, isBest),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          toast('Произошла критическая ошибка при загрузке проекта!', {
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
    apiData: query.data?.data ? query.data.data : null,
    isError: query.isError || (query.data?.error ? true : false),
  };
};
