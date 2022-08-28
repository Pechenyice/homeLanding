import { EAPIMethod } from 'types/enums';
import { API_PREFIX } from './constants';
import { listFilter, listMapper } from './utils';

export const API_ROUTES = {
  QUERIES_YEARS: {
    url: `${API_PREFIX}/dictionaries/jobs/reporting-periods/years`,
    method: EAPIMethod.GET,
  },
};

export const DYNAMIC_API_ROUTES = {
  QUERIES_CATEGORIES: (category: string) => ({
    url: `${API_PREFIX}/dictionaries/categories/${category}`,
    method: EAPIMethod.GET,
  }),
  QUERIES_CATEGORIES_RELATIONS: (
    parentCategory: string,
    childCategory: string
  ) => ({
    url: `${API_PREFIX}/dictionaries/categories/${parentCategory}/${childCategory}`,
    method: EAPIMethod.GET,
  }),

  GET_ENTITIES_LIST: (
    page: number,
    limit: number,
    queryParams: { [key: string]: string }
  ) => {
    let url = `${API_PREFIX}/jobs?page=${page}&limit=${limit}&${Object.entries(
      queryParams
    )
      .filter(listFilter)
      .map(listMapper)
      .join('&')}`;

    if (url.endsWith('&')) url = url.slice(0, -1);

    return {
      url,
      method: EAPIMethod.GET,
    };
  },

  GET_CLUB: (id: string, isBest?: boolean) => {
    let url = `${API_PREFIX}/users/jobs/clubs/${
      isBest ? 'best' : 'approved'
    }/${id}`;

    return {
      url,
      method: EAPIMethod.GET,
    };
  },
};
