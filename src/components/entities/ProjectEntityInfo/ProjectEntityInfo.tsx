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
import { useRealizationLevels } from 'hooks/queries/useRealizationLevels';
import { useRnsuCategory } from 'hooks/queries/useRnsuCategory';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { useWorksKinds } from 'hooks/queries/useWorksKinds';
import { useWorksNames } from 'hooks/queries/useWorksNames';
import { IProject } from 'types/entities';
import {
  combineClasses,
  getSelectedVocabularyLabel,
  getSelectedVocabularyLabels,
} from 'utils/common';
import styles from './ProjectEntityInfo.module.scss';

type Props = {
  project: IProject;
};

export const ProjectEntityInfo = ({ project }: Props) => {
  //FIXME: removed because of corrections for project
  // const {
  //   apiData: realisationForCitizen,
  //   isLoading: realisationForCitizenLoading,
  //   isError: realisationForCitizenError,
  // } = useRealisationForCitizen();
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

  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>???????????????? ?? ????????????????</H2>

      <div className={styles.inner}>
        <Tag tag="??????????????????">
          <H3>{project.primary.annotation}</H3>
        </Tag>
        <Tag tag="????????" className={styles.nextTag}>
          <H3>{project.primary.purpose}</H3>
        </Tag>
        <Tag tag="????????????" className={styles.nextTag}>
          <H3>{project.primary.objectives}</H3>
        </Tag>
        <Tag
          tag="???????????? ???????????????? ???? ???????????? ?????????????????????? ??????????????????????"
          className={styles.nextTag}
        >
          <H3>{project.primary.is_best_practice ? '????' : '??????'}</H3>
        </Tag>
        <Tag
          tag="?????????????????????? ???????????????????? ?? ?????????????????????????? ??????????????"
          className={styles.nextTag}
        >
          <H3>{project.primary.is_remote_format_possible ? '????' : '??????'}</H3>
        </Tag>
        <Tag
          tag="???????????????? ?????????????????? ?? ?????? ????????????????????"
          className={styles.nextTag}
        >
          <H3>
            {project.primary.is_practice_placed_in_asi_smarteka ? '????' : '??????'}
          </H3>
        </Tag>
        {/* 
          //FIXME: removed because of corrections for project
        */}
        {/* <Tag tag="???????????????????? ?????? ????????????????????" className={styles.nextTag}>
          <H3>
            {realisationForCitizenLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  realisationForCitizen,
                  project.primary.payment_method_id
                ) || '??????'}
              </H3>
            )}
          </H3>
        </Tag> */}
        <Tag
          tag="????????????????????????????, ?????????????????????? ?? ?????????????? ??????????????????????????"
          className={styles.nextTag}
        >
          <H3>
            {project.primary.partnership
              ? project.primary.partnership.description
              : '??????'}
          </H3>
        </Tag>
        <Tag
          tag="?????????????????????? ???????????????????????? ?? ????????????????????"
          className={styles.nextTag}
        >
          <H3>
            {attractingVolunteerLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  attractingVolunteer,
                  project.primary.volunteer_id
                ) || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="?????????????????? ???? ????????" className={styles.nextTag}>
          <H3>
            {rnsuCategoryLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  rnsuCategory,
                  project.primary.rnsu_category_ids
                ).join(', ') || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="??????????????????" className={styles.nextTag}>
          <H3>
            {categoriesLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  categories,
                  project.primary.needy_category_ids
                ).join(', ') || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="?????????????? ????????????" className={styles.nextTag}>
          <H3>
            {groupsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  groups,
                  project.primary.needy_category_target_group_ids
                ).join(', ') || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="???????????????????????????? ?????????????????? ??????????????????????"
          className={styles.nextTag}
        >
          <H3>
            {circumstancesRecognitionNeedLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  circumstancesRecognitionNeed,
                  project.primary.need_recognition_ids
                ).join(', ') || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="?????????? ?????????????????????? ????????????????????????" className={styles.nextTag}>
          {socialHelpFormLoading ? (
            <Loader palette={ELoaderPalette.DARK} />
          ) : (
            <H3>
              {getSelectedVocabularyLabels(
                socialHelpForm,
                project.primary.social_service_ids
              ).join(';\n') || '-'}
            </H3>
          )}
        </Tag>

        {
          // specific
        }
        <Tag tag="?????????????????????? - ???????????? ??????????????????????" className={styles.nextTag}>
          <H3>
            {project.info.participant
              ? project.info.participant.description
              : '??????'}
          </H3>
        </Tag>
        <Tag tag="???????????? ???????????????????? ??????????????" className={styles.nextTag}>
          <H3>{project.info.implementation_period}</H3>
        </Tag>
        <Tag tag="?????????????? ???????????????????? ??????????????" className={styles.nextTag}>
          <H3>
            {realizationLevelsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  realizationLevels,
                  project.info.implementation_level_id
                ) || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="???????? ??????????" className={styles.nextTag}>
          <H3>
            {worksKindsLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  worksKinds,
                  project.info.service_type_ids
                ).join(', ') || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="???????????????????????? ??????????" className={styles.nextTag}>
          <H3>
            {worksNamesLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  worksNames,
                  project.info.service_name_ids
                ).join(', ') || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="???????????????????????? ?????????????????????????????? ????????????"
          className={styles.nextTag}
        >
          <H3>
            {gosWorkNamesLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabels(
                  gosWorkNames,
                  project.info.public_work_ids
                ).join(', ') || '??????'}
              </H3>
            )}
          </H3>
        </Tag>
      </div>

      <H2 className={combineClasses(styles.heading, styles.heading__next)}>
        ???????????????????? ????????????????
      </H2>

      <div className={styles.inner}>
        <Tag tag="???????????????? ???????????????????????? ????????????????????">
          <H3>{project.primary.qualitative_results}</H3>
        </Tag>
        <Tag tag="???????????????????? ????????????????????" className={styles.nextTag}>
          <H3>{project.primary.social_results}</H3>
        </Tag>
        <Tag tag="????????????????????????????" className={styles.nextTag}>
          <H3>{project.primary.replicability || '??????'}</H3>
        </Tag>
        <Tag
          tag="?????????????????? ???? ?????????????????????????? ????????????????/?? ?????????????????? ????????????"
          className={styles.nextTag}
        >
          <H3>
            {project.primary.approbation
              ? project.primary.approbation.description
              : '??????'}
          </H3>
        </Tag>
        <Tag tag="?????????????? ?????????????????????? ????????????????????" className={styles.nextTag}>
          <H3>
            {project.primary.expert_opinion
              ? project.primary.expert_opinion.description
              : '??????'}
          </H3>
        </Tag>
        <Tag tag="?????????????? ????????????????" className={styles.nextTag}>
          <H3>
            {project.primary.comment
              ? project.primary.comment.description
              : '??????'}
          </H3>
        </Tag>
        <Tag tag="?????????????? ????????????" className={styles.nextTag}>
          <H3>
            {project.primary.review
              ? project.primary.review.description
              : '??????'}
          </H3>
        </Tag>
        <Tag tag="????????????????????" className={styles.nextTag}>
          <H3>
            {project.primary.video ? (
              <Link
                href={project.primary.video}
                target="_blank"
                className={styles.container}
              >
                <H3 className={styles.antiCapitalize}>
                  {project.primary.video}
                </H3>
              </Link>
            ) : (
              '??????'
            )}
          </H3>
        </Tag>
        <Tag
          tag="?????????????? ???????????????? ???????????????????????? ???????????????????? ??????????????????????"
          className={styles.nextTag}
        >
          <H3>{project.primary.required_resources_description}</H3>
        </Tag>
      </div>
    </div>
  );
};
