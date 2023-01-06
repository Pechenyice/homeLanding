import { EAPIMethod, EEntity } from 'types/enums';
import { getEntity } from 'utils/common';
import { ADMIN_API_PREFIX, API_PREFIX } from './constants';
import { getEntityPath, listFilter, listMapper } from './utils';

export const API_ROUTES = {
  QUERIES_YEARS: {
    url: `${API_PREFIX}/dictionaries/jobs/reporting-periods/years`,
    method: EAPIMethod.GET,
  },
  QUERIES_RNSU_FILTERS: {
    url: `${API_PREFIX}/dictionaries/categories/rnsu-category/groups`,
    method: EAPIMethod.GET,
  },

  LIBRARY_WORDS: {
    url: `${ADMIN_API_PREFIX}/library`,
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
    let url = `${API_PREFIX}/users/jobs/all/best?page=${page}&limit=${limit}&${Object.entries(
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

  GET_SOCIOTEKA_ENTITIES_LIST: (
    entity: EEntity,
    page: number,
    limit: number,
    queryParams: { [key: string]: string }
  ) => {
    let url = `${API_PREFIX}/users/jobs/${getEntityPath(
      entity
    )}/approved?page=${page}&limit=${limit}&${Object.entries(queryParams)
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
  GET_PROJECT: (id: string, isBest?: boolean) => {
    let url = `${API_PREFIX}/users/jobs/social-projects/${
      isBest ? 'best' : 'approved'
    }/${id}`;

    return {
      url,
      method: EAPIMethod.GET,
    };
  },
  GET_EDUCATION: (id: string, isBest?: boolean) => {
    let url = `${API_PREFIX}/users/jobs/edu-programs/${
      isBest ? 'best' : 'approved'
    }/${id}`;

    return {
      url,
      method: EAPIMethod.GET,
    };
  },
  GET_SOCIAL: (id: string, isBest?: boolean) => {
    let url = `${API_PREFIX}/users/jobs/social-works/${
      isBest ? 'best' : 'approved'
    }/${id}`;

    return {
      url,
      method: EAPIMethod.GET,
    };
  },
  GET_METHODOLOGY: (id: string, isBest?: boolean) => {
    let url = `${API_PREFIX}/users/jobs/methodologies/${
      isBest ? 'best' : 'approved'
    }/${id}`;

    return {
      url,
      method: EAPIMethod.GET,
    };
  },
};
