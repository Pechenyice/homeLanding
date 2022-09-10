import { ELoaderPalette, H2, H3, Link, Loader, Tag } from 'components/kit';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { useWorksKindsToWorksNames } from 'hooks/queries/categoriesRelations/useWorksKindsToWorksNames';
import { useActivityOrganizationForms } from 'hooks/queries/useActivityOrganizationForms';
import { useApplicationPeriods } from 'hooks/queries/useApplicationPeriods';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCategories } from 'hooks/queries/useCategories';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';
import { useDirections } from 'hooks/queries/useDirections';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useGroups } from 'hooks/queries/useGroups';
import { usePrevalences } from 'hooks/queries/usePrevalences';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IMethodology } from 'types/entities';
import {
  combineClasses,
  getSelectedVocabularyLabel,
  getSelectedVocabularyLabels,
} from 'utils/common';
import styles from './MethodologyEntityInfo.module.scss';

type Props = {
  methodology: IMethodology;
};

export const MethodologyEntityInfo = ({ methodology }: Props) => {
  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
    isError: realisationForCitizenError,
  } = useRealisationForCitizen();
  const {
    apiData: realizationLevels,
    isLoading: realizationLevelsLoading,
    isError: realizationLevelsError,
  } = useRealizationLevels();

  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
    isError: attractingVolunteerError,
  } = useAttractingVolunteer();
  const {
    apiData: rnsuCategory,
    isLoading: rnsuCategoryLoading,
    isError: rnsuCategoryError,
  } = useRnsuCategory();

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
    apiData: gosWorkNames,
    isLoading: gosWorkNamesLoading,
    isError: gosWorkNamesError,
  } = useGosWorkNames();
  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
    isError: circumstancesRecognitionNeedError,
  } = useCircumstancesRecognitionNeed();

  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
    isError: socialHelpFormError,
  } = useSocialHelpForm();

  const {
    apiData: worksKindsToWorksNames,
    isLoading: worksKindsToWorksNamesLoading,
    isError: worksKindsToWorksNamesError,
  } = useWorksKindsToWorksNames();
  const {
    apiData: categoriesToGroups,
    isLoading: categoriesToGroupsLoading,
    isError: categoriesToGroupsError,
  } = useCategoriesToGroups();

  const {
    apiData: directions,
    isLoading: directionsLoading,
    isError: directionsError,
  } = useDirections();

  const {
    apiData: prevalences,
    isLoading: prevalencesLoading,
    isError: prevalencesError,
  } = usePrevalences();

  const {
    apiData: applicationPeriods,
    isLoading: applicationPeriodsLoading,
    isError: applicationPeriodsError,
  } = useApplicationPeriods();

  const {
    apiData: activityOrganizationForms,
    isLoading: activityOrganizationFormsLoading,
    isError: activityOrganizationFormsError,
  } = useActivityOrganizationForms();

  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения о практике</H2>

      <div className={styles.inner}>
        <Tag tag="Аннотация">
          <H3>{methodology.primary.annotation}</H3>
        </Tag>
        <Tag tag="Цель" className={styles.nextTag}>
          <H3>{methodology.primary.purpose}</H3>
        </Tag>
        <Tag tag="Задачи" className={styles.nextTag}>
          <H3>{methodology.primary.objectives}</H3>
        </Tag>
        <Tag
          tag="Лучшая практика по мнению руководства организации"
          className={styles.nextTag}
        >
          <H3>{methodology.primary.is_best_practice ? 'Да' : 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Возможность реализации в дистанционном формате"
          className={styles.nextTag}
        >
          <H3>
            {methodology.primary.is_remote_format_possible ? 'Да' : 'Нет'}
          </H3>
        </Tag>
        <Tag
          tag="Практика размещена в АСИ «Смартека»"
          className={styles.nextTag}
        >
          <H3>
            {methodology.primary.is_practice_placed_in_asi_smarteka
              ? 'Да'
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Реализация для гражданина" className={styles.nextTag}>
          <H3>
            {realisationForCitizenLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  realisationForCitizen,
                  methodology.primary.payment_method_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="Взаимодействие, партнерство с другими организациями"
          className={styles.nextTag}
        >
          <H3>
            {methodology.primary.partnership
              ? methodology.primary.partnership.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag
          tag="Привлечение добровольцев и волонтеров"
          className={styles.nextTag}
        >
          <H3>
            {attractingVolunteerLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  attractingVolunteer,
                  methodology.primary.volunteer_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Категории по РНСУ" className={styles.nextTag}>
          <H3>
            {rnsuCategoryLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  rnsuCategory,
                  methodology.primary.rnsu_category_ids
                ).join(', ') ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Категории" className={styles.nextTag}>
          <H3>
            {categoriesLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  categories,
                  methodology.primary.needy_category_ids
                ).join(', ') ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Целевые группы" className={styles.nextTag}>
          <H3>
            {groupsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  groups,
                  methodology.primary.needy_category_target_group_ids
                ).join(', ') ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="Обстоятельства признания нуждаемости"
          className={styles.nextTag}
        >
          <H3>
            {circumstancesRecognitionNeedLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  circumstancesRecognitionNeed,
                  methodology.primary.need_recognition_ids
                ).join(', ') ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Формы социального обслуживания" className={styles.nextTag}>
          {socialHelpFormLoading ? (
            <Loader palette={ELoaderPalette.DARK} />
          ) : (
            <H3>
              {getSelectedVocabularyLabels(
                socialHelpForm,
                methodology.primary.social_service_ids
              ).join(';\n')}
            </H3>
          )}
        </Tag>

        {
          // specific
        }
        <Tag tag="Направленность" className={styles.nextTag}>
          <H3>
            {directionsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  directions,
                  methodology.info.direction_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Распространенность методики" className={styles.nextTag}>
          <H3>
            {prevalencesLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  prevalences,
                  methodology.info.prevalence_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="Автор(ы) (составитель) технологии/методики, информация о согласовании (при наличии)"
          className={styles.nextTag}
        >
          <H3>{methodology.info.authors ?? 'Нет'}</H3>
        </Tag>
        <Tag tag="Ссылка на публикацию" className={styles.nextTag}>
          <H3>{methodology.info.publication_link ?? 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Исследование эффективности или доказательности методики/технологии"
          className={styles.nextTag}
        >
          <H3>{methodology.info.effectiveness_study ?? 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Ссылка на исследование эффективности или доказательности методики/технологии"
          className={styles.nextTag}
        >
          <H3>{methodology.info.effectiveness_study_link ?? 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Форма организации деятельности при реализации технологии/методики"
          className={styles.nextTag}
        >
          <H3>
            {activityOrganizationFormsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  activityOrganizationForms,
                  methodology.info.activity_organization_form_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="Период применения (продолжительность реализации)"
          className={styles.nextTag}
        >
          <H3>
            {applicationPeriodsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  applicationPeriods,
                  methodology.info.application_period_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="Количество реализованных полных циклов"
          className={styles.nextTag}
        >
          <H3>{methodology.info.realized_cycles ?? 'Нет'}</H3>
        </Tag>
        <Tag tag="Продолжительность одного цикла" className={styles.nextTag}>
          <H3>{methodology.info.cycle_duration ?? 'Нет'}</H3>
        </Tag>
        <Tag tag="Виды услуг" className={styles.nextTag}>
          <H3>
            {worksKindsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  worksKinds,
                  methodology.info.service_type_ids
                ).join(', ') ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Наименования услуг" className={styles.nextTag}>
          <H3>
            {worksNamesLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  worksNames,
                  methodology.info.service_name_ids
                ).join(', ') ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="Наименования государственной работы"
          className={styles.nextTag}
        >
          <H3>
            {gosWorkNamesLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  gosWorkNames,
                  methodology.info.public_work_ids
                ).join(', ') ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
      </div>

      <H2 className={combineClasses(styles.heading, styles.heading__next)}>
        Результаты практики
      </H2>

      <div className={styles.inner}>
        <Tag tag="Основные качественные результаты">
          <H3>{methodology.primary.qualitative_results}</H3>
        </Tag>
        <Tag tag="Социальные результаты" className={styles.nextTag}>
          <H3>{methodology.primary.social_results}</H3>
        </Tag>
        <Tag tag="Тиражируемость" className={styles.nextTag}>
          <H3>{methodology.primary.replicability ?? 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Апробация на инновационной площадке/в ресурсном центре"
          className={styles.nextTag}
        >
          <H3>
            {methodology.primary.approbation
              ? methodology.primary.approbation.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие экспертного заключения" className={styles.nextTag}>
          <H3>
            {methodology.primary.expert_opinion
              ? methodology.primary.expert_opinion.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие рецензии" className={styles.nextTag}>
          <H3>
            {methodology.primary.comment
              ? methodology.primary.comment.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие отзыва" className={styles.nextTag}>
          <H3>
            {methodology.primary.review
              ? methodology.primary.review.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Видеоролик" className={styles.nextTag}>
          <H3>
            {methodology.primary.video ? (
              <Link
                href={methodology.primary.video}
                target="_blank"
                className={styles.container}
              >
                <H3 className={styles.antiCapitalize}>
                  {methodology.primary.video}
                </H3>
              </Link>
            ) : (
              'Нет'
            )}
          </H3>
        </Tag>
        <Tag
          tag="Краткое описание необходимого ресурсного обеспечения"
          className={styles.nextTag}
        >
          <H3>{methodology.primary.required_resources_description}</H3>
        </Tag>
      </div>
    </div>
  );
};
