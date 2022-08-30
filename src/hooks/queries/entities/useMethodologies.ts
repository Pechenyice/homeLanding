import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import { useQueryParams } from 'hooks/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IAPISociotekaEntitiesList } from 'types/entities';
import { EEntity } from 'types/enums';

export const useMethodologies = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [methodologies, setMethodologies] = useState<IAPISociotekaEntitiesList>(
    {
      items: [],
      total: 0,
    }
  );

  const params = useQueryParams();

  const getMethodologies = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let methodologies;

    try {
      methodologies = await API.socioteka.getList(
        EEntity.METHODOLOGY,
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        toast(
          'Произошла критическая ошибка при загрузке методик и технологий!',
          {
            position: 'bottom-center',
          }
        );
      } else if (e instanceof ApiError) {
        toast(e.message, { position: 'bottom-center' });
      }
    }

    if (!methodologies?.data) {
      return;
    }

    setMethodologies(methodologies.data);
  };

  return { methodologies, isLoading, getMethodologies };
};
