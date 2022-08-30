import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import { useQueryParams } from 'hooks/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IAPISociotekaEntitiesList } from 'types/entities';
import { EEntity } from 'types/enums';

export const useSocials = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [socials, setSocials] = useState<IAPISociotekaEntitiesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getSocials = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let socials;

    try {
      socials = await API.socioteka.getList(
        EEntity.SOCIAL_WORK,
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        toast(
          'Произошла критическая ошибка при загрузке социальных программ!',
          {
            position: 'bottom-center',
          }
        );
      } else if (e instanceof ApiError) {
        toast(e.message, { position: 'bottom-center' });
      }
    }

    if (!socials?.data) {
      return;
    }

    setSocials(socials.data);
  };

  return { socials, isLoading, getSocials };
};
