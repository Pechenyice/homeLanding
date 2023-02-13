import { EEntity } from 'types/enums';
import {
  IClubResponse,
  IEducationResponse,
  IEntitiesListResponse,
  ILibraryWordsResponse,
  IMethodologyResponse,
  IProjectResponse,
  IQueriesRelationsResponse,
  IQueriesResponse,
  IRnsuFiltersResponse,
  ISocialResponse,
  ISociotekaEntitiesListResponse,
  IStatsResponse,
} from 'types/interfaces';
import { aborts } from './aborts';
import { API_ROUTES, DYNAMIC_API_ROUTES } from './config';
import { safeFetch } from './wrapper';

export const API = {
  statistic: {
    fetchAllStats(): Promise<IStatsResponse> {
      const params = API_ROUTES.STATS;

      return safeFetch(params.url, params.method, aborts.STATISTIC_GET_STATS);
    },
  },
  library: {
    fetchAllWords(): Promise<ILibraryWordsResponse> {
      const params = API_ROUTES.LIBRARY_WORDS;

      return safeFetch(params.url, params.method, aborts.LIBRARY_GET_ALL_WORDS);
    },
  },
  queries: {
    fetchYears(): Promise<IQueriesResponse> {
      const params = API_ROUTES.QUERIES_YEARS;

      return safeFetch(
        params.url,
        params.method,
        aborts.QUERIES_CATEGORIES_CONTROLLER
      );
    },
    fetchRnsuFilters(): Promise<IRnsuFiltersResponse> {
      const params = API_ROUTES.QUERIES_RNSU_FILTERS;

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
  socioteka: {
    getList(
      entity: EEntity,
      page: number,
      limit: number,
      queryParams: { [key: string]: string }
    ): Promise<ISociotekaEntitiesListResponse> {
      const params = DYNAMIC_API_ROUTES.GET_SOCIOTEKA_ENTITIES_LIST(
        entity,
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
  project: {
    get(id: string, isBest?: boolean): Promise<IProjectResponse> {
      const params = DYNAMIC_API_ROUTES.GET_PROJECT(id, isBest);

      return safeFetch(
        params.url,
        params.method,
        aborts.ENTITIES_GET_CONTROLLER
      );
    },
  },
  education: {
    get(id: string, isBest?: boolean): Promise<IEducationResponse> {
      const params = DYNAMIC_API_ROUTES.GET_EDUCATION(id, isBest);

      return safeFetch(
        params.url,
        params.method,
        aborts.ENTITIES_GET_CONTROLLER
      );
    },
  },
  social: {
    get(id: string, isBest?: boolean): Promise<ISocialResponse> {
      const params = DYNAMIC_API_ROUTES.GET_SOCIAL(id, isBest);

      return safeFetch(
        params.url,
        params.method,
        aborts.ENTITIES_GET_CONTROLLER
      );
    },
  },
  methodology: {
    get(id: string, isBest?: boolean): Promise<IMethodologyResponse> {
      const params = DYNAMIC_API_ROUTES.GET_METHODOLOGY(id, isBest);

      return safeFetch(
        params.url,
        params.method,
        aborts.ENTITIES_GET_CONTROLLER
      );
    },
  },
};
