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
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import styles from './LivingRoomFiltration.module.scss';
import { useSearchParams } from 'react-router-dom';
import { combineClasses } from 'utils/common';
import { parseFilterParams } from 'utils/parse';
import { getRelatedCategoriesOptions } from 'utils/common';
import { useEntitiesYears } from 'hooks/queries/useEntitiesYears';
import { useDistricts } from 'hooks/queries/useDistricts';
import { useOrganizationTypes } from 'hooks/queries/useOrganizationTypes';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useCategories } from 'hooks/queries/useCategories';
import { useGroups } from 'hooks/queries/useGroups';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { ENTITY_OPTIONS, YES_NO_OPTIONS } from '../../../constants/values';

type Props = {
  onSearchClick: () => void;
  onClearClick: () => void;
};

const defaultState = {
  entity: -1,
  district_id: -1,

  type_id: -1,
  year: -1,
  social_service_ids: [],
  realisation_id: -1,
  needy_category_ids: [],
  needy_category_target_group_ids: [],
  volunteer_id: -1,
  is_remote_format: -1,
};

export const LivingRoomFiltration = ({
  onSearchClick,
  onClearClick,
}: Props) => {
  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const {
    apiData: districts,
    apiError: districtsApiError,
    isLoading: districtsLoading,
    isError: districtsError,
  } = useDistricts();
  const {
    apiData: organizationTypes,
    apiError: organizationTypesApiError,
    isLoading: organizationTypesLoading,
    isError: organizationTypesError,
  } = useOrganizationTypes();

  const {
    apiData: entitiesYears,
    isLoading: entitiesYearsLoading,
    isError: entitiesYearsError,
  } = useEntitiesYears();
  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
    isError: socialHelpFormError,
  } = useSocialHelpForm();

  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
    isError: realisationForCitizenError,
  } = useRealisationForCitizen();

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
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
    isError: attractingVolunteerError,
  } = useAttractingVolunteer();

  const [isOpened, setIsOpened] = useState(false);

  //default values for filtration
  const [state, setState] = useState({
    ...defaultState,
    ...parseFilterParams(params, [
      'social_service_ids',
      'needy_category_ids',
      'needy_category_target_group_ids',
    ]),
  });

  const handleToggleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const getPreparedQueryParams = () => {
    const preparedQueryParams = {
      entity: state.entity === -1 ? undefined : state.entity,
      district_id: state.district_id === -1 ? undefined : state.district_id,

      type_id: state.type_id === -1 ? undefined : state.type_id,
      year: state.year === -1 ? undefined : state.year,
      social_service_ids: !state.social_service_ids.length
        ? undefined
        : state.social_service_ids.join(','),
      realisation_id:
        state.realisation_id === -1 ? undefined : state.realisation_id,
      needy_category_ids: !state.needy_category_ids.length
        ? undefined
        : state.needy_category_ids.join(','),
      needy_category_target_group_ids: !state.needy_category_target_group_ids
        .length
        ? undefined
        : state.needy_category_target_group_ids.join(','),
      volunteer_id: state.volunteer_id === -1 ? undefined : state.volunteer_id,
      is_remote_format:
        state.is_remote_format === -1 ? undefined : state.is_remote_format,
    };

    const withOutsidePreparedQueryParams = {
      ...preparedQueryParams,
      search: params.search || undefined,
      rnsu: params.rnsu || undefined,
    };

    return JSON.parse(JSON.stringify(withOutsidePreparedQueryParams));
  };

  const getPreparedQueryParamsKeysWithoutOutside = () => {
    let queryParams = getPreparedQueryParams();
    queryParams = Object.keys(queryParams)
      .map((key) => (key === 'search' || key === 'rnsu' ? undefined : key))
      .filter((key) => !!key);

    return queryParams;
  };

  useEffect(() => {
    const preparedQueryParams = getPreparedQueryParams();

    setSearchParams(preparedQueryParams as any);
  }, [state]);

  const notEmptyFiltersCount = useMemo(
    () => getPreparedQueryParamsKeysWithoutOutside().length,
    [state]
  );

  const clearFilters = () => {
    if (!getPreparedQueryParamsKeysWithoutOutside().length) return;

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
        isOpened ? styles.wrapper_opened : ''
      )}
    >
      <div className={styles.inner}>
        <div className={styles.mainFiltration}>
          <Select
            className={combineClasses(styles.filter_main)}
            withUnselect
            emptyText="Все"
            unselectedText="Все"
            value={isNaN(+state.entity) ? -1 : +state.entity}
            options={ENTITY_OPTIONS}
            heading="Категория практики"
            onChangeOption={bindSelectChange('entity')}
          />

          <div className={styles.filter_main}>
            {districtsLoading ? (
              <Skeleton
                mode={ESkeletonMode.INPUT}
                withLoader
                heading="Подведомственное КСП"
              />
            ) : districtsError ? (
              <Input value={''} heading="Подведомственное КСП" readOnly />
            ) : (
              <Select
                withUnselect
                emptyText="Все"
                unselectedText="Все"
                value={isNaN(+state.district_id) ? -1 : +state.district_id}
                options={districts!}
                heading="Подведомственное КСП"
                onChangeOption={bindSelectChange('district_id')}
              />
            )}
          </div>
        </div>

        <div className={styles.actionsFiltration}>
          <Text className={styles.clear} isMedium onClick={clearFilters}>
            Сбросить ({notEmptyFiltersCount})
          </Text>
          <Button onClick={onSearchClick} className={styles.action}>
            <Text isMedium>Применить</Text>
          </Button>
        </div>
      </div>

      <div
        className={combineClasses(
          styles.filtrationAddon,
          isOpened ? styles.filtrationAddon_opened : ''
        )}
      >
        <div className={styles.filter}>
          {organizationTypesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Тип организации"
            />
          ) : organizationTypesError ? (
            <Input value={''} heading="Тип организации" readOnly />
          ) : (
            <Select
              className={styles.filter}
              withUnselect
              emptyText="Все"
              unselectedText="Все"
              value={isNaN(+state.type_id) ? -1 : +state.type_id}
              options={organizationTypes!}
              heading="Тип организации"
              onChangeOption={bindSelectChange('type_id')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {entitiesYearsLoading ? (
            <Skeleton mode={ESkeletonMode.INPUT} withLoader heading="Год" />
          ) : entitiesYearsError ? (
            <Input value={''} heading="Год" readOnly />
          ) : (
            <Select
              className={styles.filter}
              withUnselect
              emptyText="Все"
              unselectedText="Все"
              value={isNaN(+state.year) ? -1 : +state.year}
              options={entitiesYears!}
              heading="Год"
              onChangeOption={bindSelectChange('year')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {socialHelpFormLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Форма социального обслуживания"
            />
          ) : socialHelpFormError ? (
            <Input
              value={''}
              heading="Форма социального обслуживания"
              readOnly
            />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.social_service_ids}
              options={socialHelpForm!}
              heading="Форма социального обслуживания"
              onChangeOption={bindMultipleSelectChange('social_service_ids')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {realisationForCitizenLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Реализация для гражданина"
            />
          ) : realisationForCitizenError ? (
            <Input value={''} heading="Реализация для гражданина" readOnly />
          ) : (
            <Select
              emptyText="Все"
              unselectedText="Все"
              value={isNaN(+state.realisation_id) ? -1 : +state.realisation_id}
              options={socialHelpForm!}
              heading="Реализация для гражданина"
              onChangeOption={bindSelectChange('realisation_id')}
            />
          )}
        </div>
        <div className={styles.filter}>
          {categoriesLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Категории"
            />
          ) : categoriesError ? (
            <Input value={''} heading="Категории" readOnly />
          ) : (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.needy_category_ids}
              options={categories!}
              heading="Категории"
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
              heading="Целевые группы"
            />
          ) : groupsError || categoriesError || categoriesToGroupsError ? (
            <Input value={''} heading="Целевые группы" readOnly />
          ) : state.needy_category_ids.length ? (
            <MultipleSelect
              emptyText="Все"
              unselectedText="Все"
              values={state.needy_category_target_group_ids}
              options={getRelatedCategoriesOptions(
                state.needy_category_ids,
                groups!,
                categoriesToGroups!
              )}
              heading="Целевые группы"
              onChangeOption={bindMultipleSelectChange(
                'needy_category_target_group_ids'
              )}
            />
          ) : (
            <Input
              hint="Сначала выберите категории"
              value={''}
              placeholder="Все"
              heading="Целевые группы"
              readOnly
            />
          )}
        </div>
        <div className={styles.filter}>
          {attractingVolunteerLoading ? (
            <Skeleton
              mode={ESkeletonMode.INPUT}
              withLoader
              heading="Привлечение добровольцев и волонтёров"
            />
          ) : attractingVolunteerError ? (
            <Input
              value={''}
              heading="Привлечение добровольцев и волонтёров"
              readOnly
            />
          ) : (
            <Select
              emptyText="Все"
              unselectedText="Все"
              value={isNaN(+state.volunteer_id) ? -1 : +state.volunteer_id}
              options={attractingVolunteer!}
              heading="Привлечение добровольцев и волонтёров"
              onChangeOption={bindSelectChange('volunteer_id')}
            />
          )}
        </div>
        <Select
          className={styles.filter}
          withUnselect
          emptyText="Все"
          unselectedText="Все"
          value={isNaN(+state.is_remote_format) ? -1 : +state.is_remote_format}
          options={YES_NO_OPTIONS}
          heading="Возможность реализации в дистанционном формате"
          onChangeOption={bindSelectChange('is_remote_format')}
        />
      </div>

      <div className={styles.openedBlock}>
        <div
          className={styles.openedBlock__control}
          onClick={handleToggleIsOpened}
        >
          {isOpened ? (
            <Text isMedium>Скрыть</Text>
          ) : (
            <Text isMedium>Показать</Text>
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
