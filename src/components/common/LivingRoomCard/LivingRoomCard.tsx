import { PrefabIcon } from 'assets/icons';
import { ELoaderPalette, H3, H4, Loader } from 'components/kit';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { EEntity, EEntityTranslation } from 'types/enums';
import { combineClasses, getEntity } from 'utils/common';
import styles from './LivingRoomCard.module.scss';

type Props = {
  entityId: number;
  realisation: number;
  image: string | null | undefined;
  entity: string;
  name: string;
  company: string;
  period: string;
} & HTMLAttributes<HTMLDivElement>;

export const LivingRoomCard = ({
  entityId,
  realisation,
  image,
  entity,
  name,
  company,
  period,
  className = '',
  ...rest
}: Props) => {
  const navigate = useNavigate();

  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
    isError: realisationForCitizenError,
  } = useRealisationForCitizen();

  const getEntityName = () => {
    const eEntity = getEntity(entity);

    switch (eEntity) {
      case EEntity.PROJECT: {
        return 'Проект';
      }
      case EEntity.EDUCATION_PROGRAM: {
        return 'Программа дополнительного образования';
      }
      case EEntity.SOCIAL_WORK: {
        return 'Соц. работа';
      }
      case EEntity.CLUB: {
        return 'Клуб';
      }
      case EEntity.METHODOLOGY: {
        return 'Методика и технология';
      }
    }

    return '';
  };

  const getEntityLink = () => {
    const eEntity = getEntity(entity);

    switch (eEntity) {
      case EEntity.PROJECT: {
        return `/projects/${entityId}`;
      }
      case EEntity.EDUCATION_PROGRAM: {
        return `/education/${entityId}`;
      }
      case EEntity.SOCIAL_WORK: {
        return `/social/${entityId}`;
      }
      case EEntity.CLUB: {
        return `/clubs/${entityId}`;
      }
      case EEntity.METHODOLOGY: {
        return `/methodologies/${entityId}`;
      }
    }

    return '/#';
  };

  return (
    <div
      className={combineClasses(styles.wrapper, className)}
      onClick={() => navigate(getEntityLink())}
    >
      <div className={styles.header}>
        <div className={styles.image}>
          {image ? (
            <img src={image} className={styles.image__content} />
          ) : (
            <PrefabIcon />
          )}
        </div>
        <div className={styles.realisation}>
          {realisationForCitizenLoading ? (
            <Loader palette={ELoaderPalette.DARK} />
          ) : realisationForCitizenError ? (
            '-'
          ) : (
            <H4 className={styles.realisation__content}>
              {realisationForCitizen?.find((rfc) => rfc.id === realisation)
                ?.label ?? '-'}
            </H4>
          )}
        </div>
        <div className={styles.entity}>
          <H4 isMedium>{getEntityName()}</H4>
        </div>
        <div className={styles.name}>
          <H3 isMedium>{name}</H3>
        </div>
        <div className={styles.company}>
          <H4>{company}</H4>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.period}>
          <H4 isMedium className={styles.period__prefix}>
            Срок реализации
          </H4>
          <H4 isMedium className={styles.period__content}>
            {period}
          </H4>
        </div>
        <div className={styles.action}>
          <H3 isMedium>Подробнее о практике</H3>
        </div>
      </div>
    </div>
  );
};
