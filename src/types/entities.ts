export interface IAPIEntitiesList {
  id: number;
  variant: string;
  payment_id: number;
  name: string;
  company: string;
  year: IMinMaxPart;
  image: IAPIFileInfo['file']['path'] | null;
}

export interface IEntitiesList {
  items: IAPIEntitiesList[];
  total: number;
}

export interface IAPISociotekaEntitiesList {
  items: IAPISociotekaEntitiesListElement[];
  total: number;
}

export interface IAPISociotekaEntitiesListElement {
  id: number;
  name: string;
  annotation: number;
  company: string;
  rating: IAPIRating;
}

export interface IAPIFileInfo {
  file: { id: number; path: string; original_name: string };
}

export interface IAPIOptionalDescriptionResult {
  description: string;
}

export interface IAPICommonPrimaryPart {
  name: string; //наименование проекта
  annotation: string; //Аннотация
  objectives: string; //Основные задачи
  purpose: string; //Цель проекта
  payment_method_id: number; //Реализация для гражданина бесплатно/платно
  partnership: IAPIOptionalDescriptionResult | null; //Взаимодействие, партнерство с другими организациями
  volunteer_id: number; //Привлечение добровольцев и волонтеров
  rnsu_category_ids: number[]; //Категории по РНСУ
  needy_category_ids: number[]; //Категории
  needy_category_target_group_ids: number[]; // Целевые группы
  social_service_ids: number[]; //Форма социального обслуживания (сопровождения)
  need_recognition_ids: number[]; //Обстоятельства признания нуждаемости
  qualitative_results: string; //Основные качественные результаты
  social_results: string; //Социальные результаты
  replicability: string | null; // Тиражируемость
  approbation: IAPIOptionalDescriptionResult | null; //	Апробация на инновационной площадке/в ресурсном центре
  expert_opinion: IAPIOptionalDescriptionResult | null; //Наличие экспертного заключения
  review: IAPIOptionalDescriptionResult | null; //Наличие отзыва
  comment: IAPIOptionalDescriptionResult | null; //Наличие рецензии
  video: string | null; //Видеоролик
  required_resources_description: string; //Краткое описание необходимого ресурсного обеспечения
  photo_file: IAPIFileInfo['file'] | null; //ID файла обложки
  gallery_files: IAPIFileInfo['file'][]; //Галерея
  is_best_practice: boolean; //Лучшая практика по мнению руководства организации
  is_remote_format_possible: boolean; //Возможность реализации в дистанционном формате
  is_practice_placed_in_asi_smarteka: boolean; //Практика размещена в АСИ "Смартека"
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

export interface IAPICommonCompany {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  site: string;
}

export interface IMinMaxPart {
  start: number;
  end: number;
}

//entities

export interface ICommonPart {
  id: number;

  company: IAPICommonCompany;

  primary: IAPICommonPrimaryPart;

  year: IMinMaxPart;

  rating: IAPIRating;
}

//project

export interface IAPIProjectInfoPart {
  participant: IAPIOptionalDescriptionResult | null;
  implementation_period: string;
  implementation_level_id: number;
  public_work_ids: number[];
  service_type_ids: number[];
  service_name_ids: number[];
}

export interface IProject extends ICommonPart {
  info: IAPIProjectInfoPart;
}

//education

export interface IAPIEducationInfoPart {
  direction_id: number;
  conducting_classes_form_id: number;
  dates_and_mode_of_study: string;
}

export interface IEducation extends ICommonPart {
  info: IAPIEducationInfoPart;
}

//social

export interface IAPISocialInfoPart {
  program_type_id: number;
  direction_id: number;
  conducting_classes_form_id: number;
  dates_and_mode_of_study: string;
  public_work_ids: number[];
  service_type_ids: number[];
  service_name_ids: number[];
}

export interface ISocial extends ICommonPart {
  info: IAPISocialInfoPart;
}

//club

export interface IAPIClubInfoPart {
  schedule: string;
  conducting_classes_form_id: number;
  public_work_ids: number[];
  service_type_ids: number[];
  service_name_ids: number[];
}

export interface IClub extends ICommonPart {
  info: IAPIClubInfoPart;
}

//methodology

export interface IAPIMethodologyInfoPart {
  direction_id: number;
  prevalence_id: number;
  activity_organization_form_id: number;
  application_period_id: number;
  authors: string | null;
  publication_link: string | null;
  effectiveness_study: string | null;
  effectiveness_study_link: string | null;
  realized_cycles: string;
  cycle_duration: string;
  public_work_ids: number[];
  service_type_ids: number[];
  service_name_ids: number[];
}

export interface IMethodology extends ICommonPart {
  info: IAPIMethodologyInfoPart;
}
