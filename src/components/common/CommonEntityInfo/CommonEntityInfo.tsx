import { ELoaderPalette, H2, H3, Link, Loader, Tag } from 'components/kit';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { IAPICommonPrimaryPart } from 'types/entities';
import {
  getSelectedVocabularyLabel,
  getSelectedVocabularyLabels,
} from 'utils/common';
import styles from './CommonEntityInfo.module.scss';

type Props = {
  entity: IAPICommonPrimaryPart;
};

export const CommonEntityInfo = ({ entity }: Props) => {
  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
  } = useSocialHelpForm();

  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
  } = useRealisationForCitizen();

  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
  } = useAttractingVolunteer();

  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
  } = useCircumstancesRecognitionNeed();

  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения о практике</H2>

      <div className={styles.inner}>
        <Tag tag="Аннотация">
          <H3>{entity.annotation}</H3>
        </Tag>
        <Tag tag="Формы социального обслуживания" className={styles.nextTag}>
          {socialHelpFormLoading ? (
            <Loader palette={ELoaderPalette.DARK} />
          ) : (
            <H3>
              {getSelectedVocabularyLabels(
                socialHelpForm,
                entity.social_service_ids
              ).join(';\n') || '-'}
            </H3>
          )}
        </Tag>
        <Tag tag="Видеоролик" className={styles.nextTag}>
          <H3>
            {entity.video ? (
              <Link
                href={entity.video}
                target="_blank"
                className={styles.container}
              >
                <H3 className={styles.antiCapitalize}>{entity.video}</H3>
              </Link>
            ) : (
              'Нет'
            )}
          </H3>
        </Tag>
      </div>
    </div>
  );
};
