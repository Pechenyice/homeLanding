import { EEntity } from 'types/enums';

export const YES_NO_OPTIONS = [
  { id: 0, label: 'Нет' },
  { id: 1, label: 'Да' },
];

export const ENTITY_API_OPTIONS = [
  { id: 0, label: EEntity.PROJECT },
  { id: 1, label: EEntity.EDUCATION_PROGRAM },
  { id: 2, label: EEntity.SOCIAL_WORK },
  { id: 3, label: EEntity.CLUB },
  { id: 4, label: EEntity.METHODOLOGY },
];

export const ENTITY_OPTIONS = [
  { id: 0, label: 'Проекты' },
  { id: 1, label: 'Доп. общеобразовательные программы' },
  { id: 2, label: 'Программы по социальной работе' },
  { id: 3, label: 'Клубы' },
  { id: 4, label: 'Методики и технологии' },
];
