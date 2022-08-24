import { IEntitiesListResponse } from 'types/interfaces';
import { aborts } from './aborts';
import { DYNAMIC_API_ROUTES } from './config';
import { safeFetch } from './wrapper';

export const API = {
  entities: {
    getList(
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ): Promise<IEntitiesListResponse> {
      const params = DYNAMIC_API_ROUTES.GET_ENTITIES_LIST(
        page,
        limit,
        queryParams
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.ENTITIES_GET_LIST_CONTROLLER
      );
    },
  },
};
