import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { programTypesKey } from './keys';

export const useProgramTypes = () => {
  const query = useQuery(
    programTypesKey,
    () => API.queries.fetchCategories(programTypesKey),
    {
      onError: (e) => {
        if (e instanceof ServerError) {
          toast('Произошла критическая ошибка при загрузке видов программ!', {
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
