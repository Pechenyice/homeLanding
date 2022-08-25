import { EAPIMethod } from 'types/enums';
import { ApiError, ServerError } from './errors';

async function checkResponse(response: any) {
  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 500 || response.status === 504) {
    throw new ServerError(
      'Произошла ошибка при взаимодействии с сервером, попробуйте позже!'
    );
  }
  throw new ApiError((await response.json()).error);
}

async function checkFileResponse(response: any) {
  if (response.status === 200) {
    return response;
  }
  if (response.status === 500 || response.status === 504) {
    throw new ServerError(
      'Произошла ошибка при взаимодействии с сервером, попробуйте позже!'
    );
  }
  throw new ApiError((await response.json()).error || 'Неизвестная ошибка');
}

export function safeFetch(
  url: string,
  method: string,
  controller: AbortController,
  body: any = {},
  contentType: string = 'application/json'
) {
  const options: any = {
    method,
    headers:
      contentType === 'multipart/form-data'
        ? { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
        : {
            'Content-Type': contentType,
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
    signal: controller.signal,
  };

  if (method === EAPIMethod.POST)
    options.body =
      contentType === 'multipart/form-data' ? body : JSON.stringify(body);
  if (method === EAPIMethod.PUT)
    options.body =
      contentType === 'multipart/form-data' ? body : JSON.stringify(body);
  if (method === EAPIMethod.PATCH)
    options.body =
      contentType === 'multipart/form-data' ? body : JSON.stringify(body);

  if (contentType === 'application/pdf')
    return fetch(url, options).then(checkFileResponse);

  return fetch(url, options).then(checkResponse);
}
