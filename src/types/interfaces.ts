export interface IResponseError {
  error: string | null;
}

export interface IAPIFileInfo {
  file: { id: number; path: string; original_name: string };
}

export interface IAPIRating {
  count: number;
  fields: IAPIRatingFields;
}

export interface IAPIRatingFields {
  is_favorite: boolean;
  is_practice_placed_in_asi_smarteka: boolean;
  is_has_publication: boolean;
  is_has_approbation: boolean;
  is_has_replicability: boolean;
  is_has_any_review: boolean;
}

export interface IInputError {
  exist: boolean;
  text: string;
}

export interface IEntitiesList {}

export interface IEntitiesListResponse extends IResponseError {
  data: IEntitiesList | null;
}

export interface ISelectValue {
  id: number;
  label: string;
}
export interface ISelectRelations {
  [key: string]: number[];
}

export interface IQueriesResponse extends IResponseError {
  data: ISelectValue[] | null;
}

export interface IQueriesRelationsResponse extends IResponseError {
  data: ISelectRelations | null;
}
