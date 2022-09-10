import { useParams } from 'react-router-dom';

import {
  CommonCompanyInfo,
  CommonEntityInfo,
  CommonEntityPreview,
  NotFound,
  Wrapper,
} from 'components';
import { BackButton, H4 } from 'components/kit';
import styles from './EducationPreview.module.scss';
import { PageLoader } from 'components';
import { useEducation } from 'hooks/queries/entities/useEducation';
import { EducationEntityInfo } from 'components/entities/EducationEntityInfo/EducationEntityInfo';

const ENTITY_NAME = 'Программа дополнительного образования';

type Props = {
  isFull?: boolean;
};

export const EducationPreview = ({ isFull }: Props) => {
  const { id } = useParams();

  const { apiData: entity, isLoading: isEntityLoading } = useEducation(
    id as string,
    !isFull
  );

  if (isEntityLoading) {
    return <PageLoader />;
  }

  if (!entity) {
    return <NotFound />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Wrapper>
          <BackButton path={isFull ? '/education' : '/'} />
          <H4 isMedium className={styles.tag}>
            {ENTITY_NAME}
          </H4>
          <CommonEntityPreview
            name={entity.primary.name}
            image={entity.primary.photo_file}
            gallery={entity.primary.gallery_files}
            rating={entity.rating}
            period={`${entity.year.start} - ${entity.year.end}`}
          />
        </Wrapper>
      </div>
      <div className={styles.content}>
        <Wrapper>
          {isFull ? (
            <EducationEntityInfo education={entity} />
          ) : (
            <CommonEntityInfo entity={entity.primary} />
          )}
        </Wrapper>
      </div>
      <div className={styles.footer}>
        <Wrapper>
          <CommonCompanyInfo company={entity.company} />
        </Wrapper>
      </div>
    </div>
  );
};
