import {
  IClubResponse,
  IEntitiesListResponse,
  IQueriesRelationsResponse,
  IQueriesResponse,
} from 'types/interfaces';
import { aborts } from './aborts';
import { API_ROUTES, DYNAMIC_API_ROUTES } from './config';
import { safeFetch } from './wrapper';

export const API = {
  queries: {
    fetchYears(): Promise<IQueriesResponse> {
      const params = API_ROUTES.QUERIES_YEARS;

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
    fetchCategories(category: string): Promise<IQueriesResponse> {
      const params = DYNAMIC_API_ROUTES.QUERIES_CATEGORIES(category);

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
    fetchCategoriesRelations(
      parentCategory: string,
      childCategory: string
    ): Promise<IQueriesRelationsResponse> {
      const params = DYNAMIC_API_ROUTES.QUERIES_CATEGORIES_RELATIONS(
        parentCategory,
        childCategory
      );

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
  },
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

  club: {
    get(id: string, isBest?: boolean): Promise<IClubResponse> {
      const params = DYNAMIC_API_ROUTES.GET_CLUB(id, isBest);

      return safeFetch(
        params.url,
        params.method,
        aborts.ENTITIES_GET_CONTROLLER
      );
    },
  },
};
