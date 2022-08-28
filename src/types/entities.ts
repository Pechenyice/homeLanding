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
  video: string | null; //Видео ролик
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
