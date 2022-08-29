import {
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
