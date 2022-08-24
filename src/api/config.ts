import { EAPIMethod } from 'types/enums';
import { API_PREFIX } from './constants';
import { listFilter, listMapper } from './utils';

export const DYNAMIC_API_ROUTES = {
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
};
