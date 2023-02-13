import {
  IAPISociotekaEntitiesList,
  IClub,
  IEducation,
  IEntitiesList,
  IMethodology,
  IProject,
  ISocial,
} from './entities';

export interface IResponseError {
  error: string | null;
}

export interface IInputError {
  exist: boolean;
  text: string;
}

export interface IEntitiesListResponse extends IResponseError {
  data: IEntitiesList | null;
}

export interface ISociotekaEntitiesListResponse extends IResponseError {
  data: IAPISociotekaEntitiesList | null;
}

export interface ISelectValue {
  id: number;
  label: string;
}

export interface IRnsuFilter {
  id: number;
  label: string;
  image_path: string;
  rnsu_ids: number[];
}
export interface ISelectRelations {
  [key: string]: number[];
}

export interface ILibraryWord {
  id: number;
  word: string;
  meaning: string;
}

export interface IStats {
  companies: number;
  jobs: number;
}

export interface IQueriesResponse extends IResponseError {
  data: ISelectValue[] | null;
}

export interface ILibraryWordsResponse extends IResponseError {
  data: ILibraryWord[] | null;
}

export interface IStatsResponse extends IResponseError {
  data: IStats | null;
}

export interface IRnsuFiltersResponse extends IResponseError {
  data: IRnsuFilter[] | null;
}

export interface IQueriesRelationsResponse extends IResponseError {
  data: ISelectRelations | null;
}

export interface IClubResponse extends IResponseError {
  data: IClub | null;
}

export interface IProjectResponse extends IResponseError {
  data: IProject | null;
}

export interface IEducationResponse extends IResponseError {
  data: IEducation | null;
}

export interface ISocialResponse extends IResponseError {
  data: ISocial | null;
}

export interface IMethodologyResponse extends IResponseError {
  data: IMethodology | null;
}
