import { API } from 'api';
import { ApiError, ServerError } from 'api/errors';
import { useQueryParams } from 'hooks/useQueryParams';
import { ParsedQuery } from 'query-string';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IAPISociotekaEntitiesList } from 'types/entities';
import { EEntity } from 'types/enums';

export const useProjects = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [projects, setProjects] = useState<IAPISociotekaEntitiesList>({
    items: [],
    total: 0,
  });

  const params = useQueryParams();

  const getProjects = async (
    page: number,
    limit: number,
    lockedParams?: ParsedQuery<string>
  ) => {
    setIsLoading(true);
    let projects;

    try {
      projects = await API.socioteka.getList(
        EEntity.PROJECT,
        page,
        limit,
        lockedParams || (params as any)
      );

      setIsLoading(false);
    } catch (e) {
      if (e instanceof ServerError) {
        toast('Произошла критическая ошибка при загрузке проектов!', {
          position: 'bottom-center',
        });
      } else if (e instanceof ApiError) {
        toast(e.message, { position: 'bottom-center' });
      }
    }

    if (!projects?.data) {
      return;
    }

    setProjects(projects.data);
  };

  return { projects, isLoading, getProjects };
};
