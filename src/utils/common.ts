import { EEntity } from 'types/enums';
import { ISelectRelations, ISelectValue } from 'types/interfaces';

export const combineClasses = (...classes: string[]) =>
  classes.filter((c) => c).join(' ');

export const getRelatedCategoriesOptions = (
  parents: number[],
  children: ISelectValue[],
  relations: ISelectRelations
): ISelectValue[] => {
  if (!parents.length) return [];

  let options: number[] = [];

  parents.forEach((parent) => {
    if (relations[`${parent}`])
      options = [...options, ...relations[`${parent}`]];
  });

  if (!options.length) return [];

  return children.filter((child) => options.includes(child.id));
};

export const simpleUuid = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};

export const getSelectedVocabularyLabels = (
  vocabulary: ISelectValue[] | null | undefined,
  ids: number[]
) => {
  return (
    vocabulary
      ?.filter((entry) => ids.includes(entry.id))
      .map((entry) => entry.label) ?? []
  );
};

export const getSelectedVocabularyLabel = (
  vocabulary: ISelectValue[] | null | undefined,
  id: number
) => {
  return vocabulary?.filter((entry) => id === entry.id)?.[0].label;
};

export const getEntity = (entity: string) => {
  switch (entity.toLowerCase()) {
    case 'social_project': {
      return EEntity.PROJECT;
    }
    case 'edu_program': {
      return EEntity.EDUCATION_PROGRAM;
    }
    case 'social_work': {
      return EEntity.SOCIAL_WORK;
    }
    case 'club': {
      return EEntity.CLUB;
    }
    case 'methodology': {
      return EEntity.METHODOLOGY;
    }
  }
};
