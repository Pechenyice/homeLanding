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

export enum EStarsColor {
  is_favorite = '#F24177',
  is_has_any_review = '#70AD46',
  is_has_approbation = '#27BFE6',
  is_has_publication = '#4473C5',
  is_has_replicability = '#F4B740',
  is_practice_placed_in_asi_smarteka = '#526287',
}
