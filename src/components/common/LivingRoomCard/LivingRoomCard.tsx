import { PrefabIcon } from 'assets/icons';
import { ELoaderPalette, H3, H4, Loader } from 'components/kit';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { HTMLAttributes } from 'react';
import { EEntity, EEntityTranslation } from 'types/enums';
import { combineClasses } from 'utils/common';
import styles from './LivingRoomCard.module.scss';

type Props = {
  realisation: number;
  image: string | null | undefined;
  //TODO: retype to API case
  entity: any;
  name: string;
  company: string;
  period: string;
} & HTMLAttributes<HTMLDivElement>;

export const LivingRoomCard = ({
  realisation,
  image,
  entity,
  name,
  company,
  period,
  className = '',
  ...rest
}: Props) => {
  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
    isError: realisationForCitizenError,
  } = useRealisationForCitizen();

  return (
    <div className={combineClasses(styles.wrapper, className)}>
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
          <H4 isMedium>
            {
              //TODO: retype to API case
              entity
            }
          </H4>
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
          <H3 isMedium>Подробнее</H3>
        </div>
      </div>
    </div>
  );
};
