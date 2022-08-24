export interface IResponseError {
  error: string | null;
}

export interface IEntitiesList {}

export interface IEntitiesListResponse extends IResponseError {
  data: IEntitiesList | null;
}
