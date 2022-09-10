import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import { useQueryParams } from 'hooks/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IAPISociotekaEntitiesList } from 'types/entities';
import { EEntity } from 'types/enums';

export const useEducations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [educations, setEducations] = useState<IAPISociotekaEntitiesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getEducations = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let educations;

    try {
      educations = await API.socioteka.getList(
        EEntity.EDUCATION_PROGRAM,
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        toast(
          'Произошла критическая ошибка при загрузке программ дополнительного образования!',
          {
            position: 'bottom-center',
          }
        );
      } else if (e instanceof ApiError) {
        toast(e.message, { position: 'bottom-center' });
      }
    }

    if (!educations?.data) {
      return;
    }

    setEducations(educations.data);
  };

  return { educations, isLoading, getEducations };
};
