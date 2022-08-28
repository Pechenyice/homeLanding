import { API, ApiError, ServerError } from 'api';
import { useQueryParams } from 'hooks/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IEntitiesList } from 'types/interfaces';

export const useEntities = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [entities, setEntities] = useState<IEntitiesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getEntities = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let entities;

    try {
      entities = await API.entities.getList(
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        toast('Произошла критическая ошибка при загрузке лучших практик!', {
          position: 'bottom-center',
        });
      } else if (e instanceof ApiError) {
        toast('Не удалось получить лучшие практики', {
          position: 'bottom-center',
        });
      }
    }

    if (!entities?.data) {
      return;
    }

    setEntities(entities.data);
  };

  return { entities, isLoading, getEntities };
};
