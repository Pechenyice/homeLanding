import { ELoaderPalette, H2, H3, Link, Loader, Tag } from 'components/kit';
import { useCategoriesToGroups } from 'hooks/queries/categoriesRelations/useCategoriesToGroups';
import { useWorksKindsToWorksNames } from 'hooks/queries/categoriesRelations/useWorksKindsToWorksNames';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCategories } from 'hooks/queries/useCategories';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useConductingClassesForm } from 'hooks/queries/useConductingClassesForm';
import { useGosWorkNames } from 'hooks/queries/useGosWorkNames';
import { useGroups } from 'hooks/queries/useGroups';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IClub } from 'types/entities';
import {
  combineClasses,
  getSelectedVocabularyLabel,
  getSelectedVocabularyLabels,
} from 'utils/common';
import styles from './ClubEntityInfo.module.scss';

type Props = {
  club: IClub;
};

export const ClubEntityInfo = ({ club }: Props) => {
  //FIXME: removed because of corrections for project
  // const {
  //   apiData: realisationForCitizen,
  //   isLoading: realisationForCitizenLoading,
  //   isError: realisationForCitizenError,
  // } = useRealisationForCitizen();

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
    apiData: conductingClassesForm,
    isLoading: conductingClassesFormLoading,
    isError: conductingClassesFormError,
  } = useConductingClassesForm();

  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения о практике</H2>

      <div className={styles.inner}>
        <Tag tag="Аннотация">
          <H3>{club.primary.annotation}</H3>
        </Tag>
        <Tag tag="Цель" className={styles.nextTag}>
          <H3>{club.primary.purpose}</H3>
        </Tag>
        <Tag tag="Задачи" className={styles.nextTag}>
          <H3>{club.primary.objectives}</H3>
        </Tag>
        <Tag
          tag="Лучшая практика по мнению руководства организации"
          className={styles.nextTag}
        >
          <H3>{club.primary.is_best_practice ? 'Да' : 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Возможность реализации в дистанционном формате"
          className={styles.nextTag}
        >
          <H3>{club.primary.is_remote_format_possible ? 'Да' : 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Практика размещена в АСИ «Смартека»"
          className={styles.nextTag}
        >
          <H3>
            {club.primary.is_practice_placed_in_asi_smarteka ? 'Да' : 'Нет'}
          </H3>
        </Tag>
        {/* 
          //FIXME: removed because of corrections for project
        */}
        {/* <Tag tag="Реализация для гражданина" className={styles.nextTag}>
          <H3>
            {realisationForCitizenLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  realisationForCitizen,
                  club.primary.payment_method_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag> */}
        <Tag
          tag="Взаимодействие, партнерство с другими организациями"
          className={styles.nextTag}
        >
          <H3>
            {club.primary.partnership
              ? club.primary.partnership.description
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
                  club.primary.volunteer_id
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
                  club.primary.rnsu_category_ids
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
                  club.primary.needy_category_ids
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
                  club.primary.needy_category_target_group_ids
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
                  club.primary.need_recognition_ids
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
                club.primary.social_service_ids
              ).join(';\n')}
            </H3>
          )}
        </Tag>

        {
          // specific
        }
        <Tag tag="Форма проведения занятий" className={styles.nextTag}>
          <H3>
            {conductingClassesFormLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  conductingClassesForm,
                  club.info.conducting_classes_form_id
                ) ?? 'Нет'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="График" className={styles.nextTag}>
          <H3>{club.info.schedule}</H3>
        </Tag>
        <Tag tag="Виды услуг" className={styles.nextTag}>
          <H3>
            {worksKindsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  worksKinds,
                  club.info.service_type_ids
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
                  club.info.service_name_ids
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
                  club.info.public_work_ids
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
          <H3>{club.primary.qualitative_results}</H3>
        </Tag>
        <Tag tag="Социальные результаты" className={styles.nextTag}>
          <H3>{club.primary.social_results}</H3>
        </Tag>
        <Tag tag="Тиражируемость" className={styles.nextTag}>
          <H3>{club.primary.replicability ?? 'Нет'}</H3>
        </Tag>
        <Tag
          tag="Апробация на инновационной площадке/в ресурсном центре"
          className={styles.nextTag}
        >
          <H3>
            {club.primary.approbation
              ? club.primary.approbation.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие экспертного заключения" className={styles.nextTag}>
          <H3>
            {club.primary.expert_opinion
              ? club.primary.expert_opinion.description
              : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие рецензии" className={styles.nextTag}>
          <H3>
            {club.primary.comment ? club.primary.comment.description : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Наличие отзыва" className={styles.nextTag}>
          <H3>
            {club.primary.review ? club.primary.review.description : 'Нет'}
          </H3>
        </Tag>
        <Tag tag="Видеоролик" className={styles.nextTag}>
          <H3>
            {club.primary.video ? (
              <Link
                href={club.primary.video}
                target="_blank"
                className={styles.container}
              >
                <H3 className={styles.antiCapitalize}>{club.primary.video}</H3>
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
          <H3>{club.primary.required_resources_description}</H3>
        </Tag>
      </div>
    </div>
  );
};
