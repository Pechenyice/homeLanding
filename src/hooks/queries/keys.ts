export const districtsKey = 'district';
export const organizationTypesKey = 'organization-type';
export const realisationForCitizenKey = 'payment-method';
export const realizationLevelsKey = 'implementation-level';
export const attractingVolunteerKey = 'volunteer';
export const rnsuCategoriesKey = 'rnsu-category';
export const categoriesKey = 'needy-category';
export const groupsKey = 'needy-category-target-group';
export const circumstancesRecognitionNeedKey = 'need-recognition';
export const worksKindsKey = 'service-type';
export const worksNamesKey = 'service-name';
export const gosWorkNamesKey = 'public-work';
export const socialHelpFormKey = 'social-service';
export const directionsKey = 'direction';
export const conductingClassesFormKey = 'conducting-classes-form';
export const programTypesKey = 'program-type';
export const prevalencesKey = 'prevalence';
export const applicationPeriodsKey = 'application-period';
export const activityOrganizationFormsKey = 'activity-organization-form';

export const getEntitiesYearsKey = 'entitiesYears';

export const getProjectKey = (id: string, isBest?: boolean) => [
  'project',
  id,
  isBest,
];

export const getEducationProgramKey = (id: string, isBest?: boolean) => [
  'educationProgram',
  id,
  isBest,
];

export const getSocialWorkKey = (id: string, isBest?: boolean) => [
  'socialWork',
  id,
  isBest,
];

export const getClubKey = (id: string, isBest?: boolean) => [
  'club',
  id,
  isBest,
];

export const getMethodologyKey = (id: string, isBest?: boolean) => [
  'methodology',
  id,
  isBest,
];
