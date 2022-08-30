import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import { useQueryParams } from 'hooks/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IAPISociotekaEntitiesList } from 'types/entities';
import { EEntity } from 'types/enums';

export const useClubs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [clubs, setClubs] = useState<IAPISociotekaEntitiesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getClubs = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let clubs;

    try {
      clubs = await API.socioteka.getList(
        EEntity.CLUB,
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        toast('Произошла критическая ошибка при загрузке клубов!', {
          position: 'bottom-center',
        });
      } else if (e instanceof ApiError) {
        toast(e.message, { position: 'bottom-center' });
      }
    }

    if (!clubs?.data) {
      return;
    }

    setClubs(clubs.data);
  };

  return { clubs, isLoading, getClubs };
};
