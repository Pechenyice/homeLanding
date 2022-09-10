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
        <Tag tag="Формы социального обслуживания">
          {socialHelpFormLoading ? (
            <Loader palette={ELoaderPalette.DARK} />
          ) : (
            <H3>
              {getSelectedVocabularyLabels(
                socialHelpForm,
                entity.social_service_ids
              ).join(';\n')}
            </H3>
          )}
        </Tag>
        <Tag tag="Аннотация" className={styles.nextTag}>
          <H3>{entity.annotation}</H3>
        </Tag>
        <Tag tag="Цель" className={styles.nextTag}>
          <H3>{entity.purpose}</H3>
        </Tag>
        <Tag tag="Задачи" className={styles.nextTag}>
          <H3>{entity.objectives}</H3>
        </Tag>
        <Tag tag="Реализация для гражданина" className={styles.nextTag}>
          <H3>
            {realisationForCitizenLoading ? (
              <Loader palette={ELoaderPalette.DARK} />
            ) : (
              <H3>
                {getSelectedVocabularyLabel(
                  realisationForCitizen,
                  entity.payment_method_id
                ) ?? '-'}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag tag="Социальный результат" className={styles.nextTag}>
          <H3>{entity.social_results}</H3>
        </Tag>
        <Tag
          tag="Возможность реализации в дистанционном формате"
          className={styles.nextTag}
        >
          <H3>{entity.is_remote_format_possible ? 'Да' : 'Нет'}</H3>
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
                  entity.volunteer_id
                ) ?? '-'}
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
                  entity.need_recognition_ids
                ).join(', ')}
              </H3>
            )}
          </H3>
        </Tag>
        <Tag
          tag="Практика размещена в АСИ «Смартека»"
          className={styles.nextTag}
        >
          <H3>{entity.is_practice_placed_in_asi_smarteka ? 'Да' : 'Нет'}</H3>
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
