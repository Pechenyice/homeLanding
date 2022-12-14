import { ChevronLeftIcon, SearchIcon } from 'assets/icons';
import {
  Button,
  ESkeletonMode,
  Input,
  MultipleSelect,
  Select,
  Skeleton,
  Text,
} from 'components/kit';
import { useQueryParams } from 'hooks/useQueryParams';
import {
  ChangeEvent,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './SocialsFiltration.module.scss';
import { useSearchParams } from 'react-router-dom';
import { combineClasses } from 'utils/common';
import {
  RATING_OPTIONS,
  STATUS_OPTIONS,
  YES_NO_OPTIONS,
} from './../../../../constants/values';
import { useCategories } from 'hooks/queries/useCategories';
import { parseFilterParams } from 'utils/parse';
import { useGroups } from 'hooks/queries/useGroups';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { getRelatedCategoriesOptions } from 'utils/common';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { useWorksKindsToWorksNames } from 'hooks/queries/categoriesRelations/useWorksKindsToWorksNames';
import { useEntitiesYears } from 'hooks/queries/useEntitiesYears';
import { useDirections } from 'hooks/queries/useDirections';
import { useDistricts } from 'hooks/queries/useDistricts';
import { useProgramTypes } from 'hooks/queries/useProgramTypes';
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';

type Props = {
  onSearchClick: () => void;
  onClearClick: () => void;
} & HTMLAttributes<HTMLDivElement>;

const defaultState = {
  //common
  district_id: -1,

  rating: -1,
  year: -1,
  is_any_review: -1,
  is_approbation: -1,
  is_favorite: -1,
  is_publication: -1,
  is_remote_format: -1,
  is_practice_placed_in_asi_smarteka: -1,
  needy_category_ids: [],
  needy_category_target_group_ids: [],
  rnsu_category_ids: [],
  social_service_ids: [],
  need_recognition_ids: [],
  volunteer_id: -1,

  //specific
  public_work_ids: [],
  service_name_ids: [],
  service_type_ids: [],
  direction_id: -1,

  //[Added 12.10.2022 by clients correction]
  program_type_id: -1,
  conducting_classes_form_id: -1,
};

export const SocialsFiltration = ({
  onSearchClick,
  onClearClick,
  className = '',
}: Props) => {
  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  // common
  const {
    apiData: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();
  const {
    apiData: groups,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useGroups();
  const {
    apiData: categoriesToGroups,
    isLoading: categoriesToGroupsLoading,
    isError: categoriesToGroupsError,
  } = useCategoriesToGroups();

  const {
    apiData: rnsuCategory,
    isLoading: rnsuCategoryLoading,
    isError: rnsuCategoryError,
  } = useRnsuCategory();
  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
    isError: socialHelpFormError,
  } = useSocialHelpForm();
  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
    isError: attractingVolunteerError,
  } = useAttractingVolunteer();

  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
    isError: circumstancesRecognitionNeedError,
  } = useCircumstancesRecognitionNeed();

  const {
    apiData: entitiesYears,
    isLoading: entitiesYearsLoading,
    isError: entitiesYearsError,
  } = useEntitiesYears();

  // specific
  const {
    apiData: directions,
    isLoading: directionsLoading,
    isError: directionsError,
  } = useDirections();
  const {
    apiData: gosWorkNames,
    isLoading: gosWorkNamesLoading,
    isError: gosWorkNamesError,
  } = useGosWorkNames();

  const {
    apiData: worksKinds,
    isLoading: worksKindsLoading,
    isError: worksKindsError,
  } = useWorksKinds();
  const {
    apiData: worksNames,
    isLoading: worksNamesLoading,
    isError: worksNamesError,
  } = useWorksNames();
  const {
    apiData: worksKindsToWorksNames,
    isLoading: worksKindsToWorksNamesLoading,
    isError: worksKindsToWorksNamesError,
  } = useWorksKindsToWorksNames();

  const {
    apiData: districts,
    isLoading: districtsLoading,
    isError: districtsError,
  } = useDistricts();

  //[Added 12.10.2022 by clients correction]
  const {
    apiData: programTypes,
    isLoading: programTypesLoading,
    isError: programTypesError,
  } = useProgramTypes();
  const {
    apiData: conductingClassesForm,
    isLoading: conductingClassesFormLoading,
    isError: conductingClassesFormError,
  } = useConductingClassesForm();

  const [isOpened, setIsOpened] = useState(false);

  //default values for filtration
  const [state, setState] = useState({
    ...defaultState,
    ...parseFilterParams(params, [
      'needy_category_ids',
      'needy_category_target_group_ids',
      'rnsu_category_ids',
      'social_service_ids',
      'need_recognition_ids',
      'public_work_ids',
      'service_name_ids',
      'service_type_ids',
    ]),
  });

  const handleToggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const getPreparedQueryParams = () => {
    const preparedQueryParams = {
      //common
      district_id: state.district_id === -1 ? undefined : state.district_id,

      year: state.year === -1 ? undefined : state.year,
      rating: state.rating === -1 ? undefined : state.rating,
      is_any_review:
        state.is_any_review === -1 ? undefined : state.is_any_review,
      is_approbation:
        state.is_approbation === -1 ? undefined : state.is_approbation,
      is_favorite: state.is_favorite === -1 ? undefined : state.is_favorite,
      is_publication:
        state.is_publication === -1 ? undefined : state.is_publication,
      is_remote_format:
        state.is_remote_format === -1 ? undefined : state.is_remote_format,
      is_practice_placed_in_asi_smarteka:
        state.is_practice_placed_in_asi_smarteka === -1
          ? undefined
          : state.is_practice_placed_in_asi_smarteka,
      rnsu_category_ids: !state.rnsu_category_ids.length
        ? undefined
        : state.rnsu_category_ids.join(','),
      social_service_ids: !state.social_service_ids.length
        ? undefined
        : state.social_service_ids.join(','),
      volunteer_id: state.volunteer_id === -1 ? undefined : state.volunteer_id,

      needy_category_ids: !state.needy_category_ids.length
        ? undefined
        : state.needy_category_ids.join(','),
      needy_category_target_group_ids: !state.needy_category_target_group_ids
        .length
        ? undefined
        : state.needy_category_target_group_ids.join(','),
      need_recognition_ids: !state.need_recognition_ids.length
        ? undefined
        : state.need_recognition_ids.join(','),

      //specific
      direction_id: state.direction_id === -1 ? undefined : state.direction_id,
      public_work_ids: !state.public_work_ids.length
        ? undefined
        : state.public_work_ids.join(','),

      service_name_ids: !state.service_name_ids.length
        ? undefined
        : state.service_name_ids.join(','),
      service_type_ids: !state.service_type_ids.length
        ? undefined
        : state.service_type_ids.join(','),

      //[Added 12.10.2022 by clients correction]
      program_type_id:
        state.program_type_id === -1 ? undefined : state.program_type_id,
      conducting_classes_form_id:
        state.conducting_classes_form_id === -1
          ? undefined
          : state.conducting_classes_form_id,
    };

    const withSortingPreparedQueryParams = {
      ...preparedQueryParams,
      sortBy: params.sortBy || undefined,
      sortDirection: params.sortDirection || undefined,
      name: params.name || undefined,
    };

    return JSON.parse(JSON.stringify(withSortingPreparedQueryParams));
  };

  const getPreparedQueryParamsKeysWithoutSorting = () => {
    let queryParams = getPreparedQueryParams();
    queryParams = Object.keys(queryParams)
      .map((key) =>
        key === 'sortBy' || key === 'sortDirection' || key === 'name'
          ? undefined
          : key
      )
      .filter((key) => !!key);

    return queryParams;
  };

  useEffect(() => {
    const preparedQueryParams = getPreparedQueryParams();

    setSearchParams(preparedQueryParams as any);
  }, [state]);

  const notEmptyFiltersCount = useMemo(
    () => getPreparedQueryParamsKeysWithoutSorting().length,
    [state]
  );

  const clearFilters = () => {
    if (!getPreparedQueryParamsKeysWithoutSorting().length) return;

    setState(defaultState);
    onClearClick();
  };

  const bindChange = (name: string) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setState({ ...state, [name]: e.target.value });

  const bindSelectChange = (name: string) => (id: number) =>
    setState({ ...state, [name]: id });

  const bindMultipleSelectChange = (name: string, clearName?: string) => (
    id: number
  ) => {
    const isIdSelected = (state as any)[name].includes(id);

    const newMultipleSelect = isIdSelected
      ? (state as any)[name].filter((elem: number) => elem !== id)
      : [...(state as any)[name], id];

    if (clearName) {
      setState({
        ...state,
        [name]: newMultipleSelect,
        [clearName]: [],
      });
    } else {
      setState({ ...state, [name]: newMultipleSelect });
    }
  };

  return (
    <div
      className={combineClasses(
        styles.wrapper,
        isOpened ? styles.wrapper_opened : '',
        className
      )}
    >
      <div className={styles.inner}>
        <div className={styles.mainFiltration}>
          {districtsLoading ? (
            <Skeleton
              wrapperClassName={styles.filter}
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="????????????????????????????????????"
            />
          ) : districtsError ? (
            <Input value={''} heading="????????????????????????????????????" readOnly />
          ) : (
            <Select
              className={styles.filter}
              withUnselect
              emptyText="??????"
              unselectedText="??????"
              value={isNaN(+state.district_id) ? -1 : +state.district_id}
              options={districts!}
              heading="????????????????????????????????????"
              onChangeOption={bindSelectChange('district_id')}
            />
          )}

          <Select
            className={styles.filter}
            withUnselect
            emptyText="??????"
            unselectedText="??????"
            value={isNaN(+state.rating) ? -1 : +state.rating}
            options={RATING_OPTIONS}
            heading="??????????????"
            onChangeOption={bindSelectChange('rating')}
          />
        </div>

        <div className={styles.actionsFiltration}>
          <Text className={styles.clear} isMedium onClick={clearFilters}>
            ???????????????? ({notEmptyFiltersCount})
          </Text>
          <Button onClick={onSearchClick} className={styles.action}>
            <Text isMedium>??????????????????</Text>
          </Button>
        </div>
      </div>

      <div
        className={combineClasses(
          styles.filtrationAddon,
          isOpened ? styles.filtrationAddon_opened : ''
        )}
      >
        {/**
         *
         *
         * common
         *
         *
         */}
        <div className={styles.filter}>
          {entitiesYearsLoading ? (
            <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="??????" />
          ) : entitiesYearsError ? (
            <Input value={''} heading="??????" readOnly />
          ) : (
            <Select
              withUnselect
              emptyText="??????"
              unselectedText="??????"
              value={isNaN(+state.year) ? -1 : +state.year}
              options={entitiesYears!}
              heading="??????"
              onChangeOption={bindSelectChange('year')}
            />
          )}
        </div>
        <Select
          className={styles.filter}
          withUnselect
          emptyText="??????"
          unselectedText="??????"
          value={isNaN(+state.is_remote_format) ? -1 : +state.is_remote_format}
          options={YES_NO_OPTIONS}
          heading="?????????????????????? ???????????????????? ?? ?????????????????????????? ??????????????"
          onChangeOption={bindSelectChange('is_remote_format')}
        />
        <div className={styles.filter}>
          {rnsuCategoryLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="?????????????????? ????????"
            />
          ) : rnsuCategoryError ? (
            <Input value={''} heading="?????????????????? ????????" readOnly />
          ) : (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.rnsu_category_ids}
              options={rnsuCategory!}
              heading="?????????????????? ????????"
              onChangeOption={bindMultipleSelectChange('rnsu_category_ids')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {categoriesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="??????????????????"
            />
          ) : categoriesError ? (
            <Input value={''} heading="??????????????????" readOnly />
          ) : (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.needy_category_ids}
              options={categories!}
              heading="??????????????????"
              onChangeOption={bindMultipleSelectChange(
                'needy_category_ids',
                'needy_category_target_group_ids'
              )}
            />
          )}
        </div>
        <div className={styles.filter}>
          {groupsLoading || categoriesLoading || categoriesToGroupsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="?????????????? ????????????"
            />
          ) : groupsError || categoriesError || categoriesToGroupsError ? (
            <Input value={''} heading="?????????????? ????????????" readOnly />
          ) : state.needy_category_ids.length ? (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.needy_category_target_group_ids}
              options={getRelatedCategoriesOptions(
                state.needy_category_ids,
                groups!,
                categoriesToGroups!
              )}
              heading="?????????????? ????????????"
              onChangeOption={bindMultipleSelectChange(
                'needy_category_target_group_ids'
              )}
            />
          ) : (
            <Input
              hint="?????????????? ???????????????? ??????????????????"
              value={''}
              placeholder="??????"
              heading="?????????????? ????????????"
              readOnly
            />
          )}
        </div>

        {/**
         *
         *
         * specific
         *
         *
         */}
        <div className={styles.filter}>
          {directionsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="????????????????????????????"
            />
          ) : directionsError ? (
            <Input value={''} heading="????????????????????????????" readOnly />
          ) : (
            <Select
              emptyText="??????"
              unselectedText="??????"
              value={isNaN(+state.direction_id) ? -1 : +state.direction_id}
              options={directions!}
              heading="????????????????????????????"
              onChangeOption={bindSelectChange('direction_id')}
            />
          )}
        </div>

        <div className={styles.filter}>
          {worksKindsLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="?????? ????????????"
            />
          ) : worksKindsError ? (
            <Input value={''} heading="?????? ????????????" readOnly />
          ) : (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.service_type_ids}
              options={worksKinds!}
              heading="?????? ????????????"
              onChangeOption={bindMultipleSelectChange(
                'service_type_ids',
                'service_name_ids'
              )}
            />
          )}
        </div>
        <div className={styles.filter}>
          {worksKindsLoading ||
          worksNamesLoading ||
          worksKindsToWorksNamesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="???????????????????????? ????????????"
            />
          ) : worksKindsError ||
            worksNamesError ||
            worksKindsToWorksNamesError ? (
            <Input value={''} heading="???????????????????????? ????????????" readOnly />
          ) : state.service_type_ids.length ? (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.service_name_ids}
              options={getRelatedCategoriesOptions(
                state.service_type_ids,
                worksNames!,
                worksKindsToWorksNames!
              )}
              heading="???????????????????????? ????????????"
              onChangeOption={bindMultipleSelectChange('service_name_ids')}
            />
          ) : (
            <Input
              hint="?????????????? ???????????????? ???????? ??????????"
              value={''}
              placeholder="??????"
              heading="???????????????????????? ????????????"
              readOnly
            />
          )}
        </div>

        <div className={styles.filter}>
          {gosWorkNamesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="???????????????????????? ?????????????????????????????? ????????????"
            />
          ) : gosWorkNamesError ? (
            <Input
              value={''}
              heading="???????????????????????? ?????????????????????????????? ????????????"
              readOnly
            />
          ) : (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.public_work_ids}
              options={gosWorkNames!}
              heading="???????????????????????? ?????????????????????????????? ????????????"
              onChangeOption={bindMultipleSelectChange('public_work_ids')}
            />
          )}
        </div>

        {/**
         *
         *
         * common
         *
         *
         */}
        <div className={styles.filter}>
          {circumstancesRecognitionNeedLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="???????????????????????????? ?????????????????? ??????????????????????"
            />
          ) : circumstancesRecognitionNeedError ? (
            <Input
              value={''}
              heading="???????????????????????????? ?????????????????? ??????????????????????"
              readOnly
            />
          ) : (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.need_recognition_ids}
              options={circumstancesRecognitionNeed!}
              heading="???????????????????????????? ?????????????????? ??????????????????????"
              onChangeOption={bindMultipleSelectChange('need_recognition_ids')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {socialHelpFormLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="?????????? ?????????????????????? ????????????????????????"
            />
          ) : socialHelpFormError ? (
            <Input
              value={''}
              heading="?????????? ?????????????????????? ????????????????????????"
              readOnly
            />
          ) : (
            <MultipleSelect
              emptyText="??????"
              unselectedText="??????"
              values={state.social_service_ids}
              options={socialHelpForm!}
              heading="?????????? ?????????????????????? ????????????????????????"
              onChangeOption={bindMultipleSelectChange('social_service_ids')}
            />
          )}
        </div>

        {/**
         *
         *
         * common
         *
         *
         */}
        <Select
          className={styles.filter}
          withUnselect
          emptyText="??????"
          unselectedText="??????"
          value={isNaN(+state.is_favorite) ? -1 : +state.is_favorite}
          options={YES_NO_OPTIONS}
          heading="?????????????? ?? ?????????????????????? ????????????????"
          onChangeOption={bindSelectChange('is_favorite')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="??????"
          unselectedText="??????"
          value={isNaN(+state.is_publication) ? -1 : +state.is_publication}
          options={YES_NO_OPTIONS}
          heading="?????????????? ????????????????????"
          onChangeOption={bindSelectChange('is_publication')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="??????"
          unselectedText="??????"
          value={isNaN(+state.is_approbation) ? -1 : +state.is_approbation}
          options={YES_NO_OPTIONS}
          heading="?????????????????? ???? ?????????????????????????? ????????????????/?? ?????????????????? ????????????"
          onChangeOption={bindSelectChange('is_approbation')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="??????"
          unselectedText="??????"
          value={isNaN(+state.is_any_review) ? -1 : +state.is_any_review}
          options={YES_NO_OPTIONS}
          heading="???????????????????? ????????????????????, ????????????????, ??????????"
          onChangeOption={bindSelectChange('is_any_review')}
        />
        <Select
          className={styles.filter}
          withUnselect
          emptyText="??????"
          unselectedText="??????"
          value={
            isNaN(+state.is_practice_placed_in_asi_smarteka)
              ? -1
              : +state.is_practice_placed_in_asi_smarteka
          }
          options={YES_NO_OPTIONS}
          heading="???????????????? ?????????????????? ?? ?????? ????????????????????"
          onChangeOption={bindSelectChange(
            'is_practice_placed_in_asi_smarteka'
          )}
        />
        <div className={styles.filter}>
          {attractingVolunteerLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="?????????????????????? ????????????????????????/????????????????????"
            />
          ) : attractingVolunteerError ? (
            <Input
              value={''}
              heading="?????????????????????? ????????????????????????/????????????????????"
              readOnly
            />
          ) : (
            <Select
              withUnselect
              emptyText="??????"
              unselectedText="??????"
              value={isNaN(+state.volunteer_id) ? -1 : +state.volunteer_id}
              options={attractingVolunteer!}
              heading="?????????????????????? ????????????????????????/????????????????????"
              onChangeOption={bindSelectChange('volunteer_id')}
            />
          )}
        </div>
        {
          //[Added 12.10.2022 by clients correction]
        }
        <div className={styles.filter}>
          {programTypesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="?????? ??????????????????"
            />
          ) : programTypesError ? (
            <Input value={''} heading="?????? ??????????????????" readOnly />
          ) : (
            <Select
              emptyText="??????"
              unselectedText="??????"
              value={
                isNaN(+state.program_type_id) ? -1 : +state.program_type_id
              }
              options={programTypes!}
              heading="?????? ??????????????????"
              onChangeOption={bindSelectChange('program_type_id')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {conductingClassesFormLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="?????????? ???????????????????? ??????????????????????"
            />
          ) : conductingClassesFormError ? (
            <Input value={''} heading="?????????? ???????????????????? ??????????????????????" readOnly />
          ) : (
            <Select
              emptyText="??????"
              unselectedText="??????"
              value={
                isNaN(+state.conducting_classes_form_id)
                  ? -1
                  : +state.conducting_classes_form_id
              }
              options={conductingClassesForm!}
              heading="?????????? ???????????????????? ??????????????????????"
              onChangeOption={bindSelectChange('conducting_classes_form_id')}
            />
          )}
        </div>
      </div>

      <div className={styles.openedBlock}>
        <div
          className={styles.openedBlock__control}
          onClick={handleToggleIsOpened}
        >
          {isOpened ? (
            <Text isMedium>????????????</Text>
          ) : (
            <Text isMedium>????????????????</Text>
          )}
          <div
            className={
              isOpened ? styles.chevron_rotatedReverse : styles.chevron_rotated
            }
          >
            <ChevronLeftIcon className={styles.chevron} />
          </div>
        </div>
      </div>
    </div>
  );
};
