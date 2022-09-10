import { ELoaderPalette, H2, H3, Link, Loader, Tag } from 'components/kit';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { useWorksKindsToWorksNames } from 'hooks/queries/categoriesRelations/useWorksKindsToWorksNames';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCategories } from 'hooks/queries/useCategories';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';
import { useDirections } from 'hooks/queries/useDirections';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useGroups } from 'hooks/queries/useGroups';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IEducation } from 'types/entities';
import {
  combineClasses,
  getSelectedVocabularyLabel,
  getSelectedVocabularyLabels,
} from 'utils/common';
import styles from './EducationEntityInfo.module.scss';

type Props = {
  education: IEducation;
};

export const EducationEntityInfo = ({ education }: Props) => {
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
    apiData: conductingClassesForm,
    isLoading: conductingClassesFormLoading,
    isError: conductingClassesFormError,
  } = useConductingClassesForm();

  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения о практике</H2>

      <div className={styles.inner}>
        <Tag tag="Аннотация">
          <H3>{education.primary.annotation}</H3>
        </Tag>
        <Tag tag="Цель" className={styles.nextTag}>
          <H3>{education.primary.purpose}</H3>
        </Tag>
        <Tag tag="Задачи" className={styles.nextTag}>
          <H3>{education.primary.objectives}</H3>
        </Tag>
        <Tag
          tag="Лучшая практика по мнению руководства организации"
          className={styles.nextTag}
        >
          <H3>{education.primary.is_best_practice ? 'Да' : 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Возможность реализации в дистанционном формате"
          className={styles.nextTag}
        >
          <H3>{education.primary.is_remote_format_possible ? 'Да' : 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Практика размещена в АСИ «Смартека»"
          className={styles.nextTag}
        >
          <H3>
            {education.primary.is_practice_placed_in_asi_smarteka
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
                  education.primary.payment_method_id
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
            {education.primary.partnership
              ? education.primary.partnership.description
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
                  education.primary.volunteer_id
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
                  education.primary.rnsu_category_ids
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
                  education.primary.needy_category_ids
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
                  education.primary.needy_category_target_group_ids
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
                  education.primary.need_recognition_ids
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
                education.primary.social_service_ids
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
                  education.info.direction_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Форма проведения занятий" className={styles.nextTag}>
          <H3>
            {conductingClassesFormLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  conductingClassesForm,
                  education.info.conducting_classes_form_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Сроки, режим занятий" className={styles.nextTag}>
          <H3>{education.info.dates_and_mode_of_study}</H3>
        </Tag>
      </div>

      <H2 className={combineClasses(styles.heading, styles.heading__next)}>
        Результаты практики
      </H2>

      <div className={styles.inner}>
        <Tag tag="Основные качественные результаты">
          <H3>{education.primary.qualitative_results}</H3>
        </Tag>
        <Tag tag="Социальные результаты" className={styles.nextTag}>
          <H3>{education.primary.social_results}</H3>
        </Tag>
        <Tag tag="Тиражируемость" className={styles.nextTag}>
          <H3>{education.primary.replicability ?? 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Апробация на инновационной площадке/в ресурсном центре"
          className={styles.nextTag}
        >
          <H3>
            {education.primary.approbation
              ? education.primary.approbation.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие экспертного заключения" className={styles.nextTag}>
          <H3>
            {education.primary.expert_opinion
              ? education.primary.expert_opinion.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие рецензии" className={styles.nextTag}>
          <H3>
            {education.primary.comment
              ? education.primary.comment.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие отзыва" className={styles.nextTag}>
          <H3>
            {education.primary.review
              ? education.primary.review.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Видеоролик" className={styles.nextTag}>
          <H3>
            {education.primary.video ? (
              <Link
                href={education.primary.video}
                target="_blank"
                className={styles.container}
              >
                <H3 className={styles.antiCapitalize}>
                  {education.primary.video}
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
          <H3>{education.primary.required_resources_description}</H3>
        </Tag>
      </div>
    </div>
  );
};
