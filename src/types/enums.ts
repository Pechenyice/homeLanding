export enum EAPIMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum EProposalStatus {
  'ACCEPTED' = 0,
  'PENDING' = 1,
  'REJECTED' = 2,
}

export enum EEntity {
  PROJECT = 'project',
  EDUCATION_PROGRAM = 'edu_program',
  SOCIAL_WORK = 'social',
  CLUB = 'club',
  METHODOLOGY = 'methodology',
}

export enum EEntityTranslation {
  PROJECT = 'Проект',
  EDUCATION_PROGRAM = 'Дополнительное образование',
  SOCIAL_WORK = 'Социальная работа',
  CLUB = 'Клуб',
  METHODOLOGY = 'Методика и технология',
}
