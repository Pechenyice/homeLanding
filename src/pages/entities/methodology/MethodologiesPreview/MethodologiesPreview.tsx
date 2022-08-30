import { useParams } from 'react-router-dom';

import {
  ClubEntityInfo,
  CommonCompanyInfo,
  CommonEntityInfo,
  CommonEntityPreview,
  MethodologyEntityInfo,
  NotFound,
  Wrapper,
} from 'components';
import { BackButton, H4 } from 'components/kit';
import styles from './MethodologiesPreview.module.scss';
import { PageLoader } from 'components';
import { useMethodology } from 'hooks/queries/entities/useMethodology';

const ENTITY_NAME = 'Методика и технология';

type Props = {
  isFull?: boolean;
};

export const MethodologiesPreview = ({ isFull }: Props) => {
  const { id } = useParams();

  const { apiData: entity, isLoading: isEntityLoading } = useMethodology(
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
          <BackButton path={isFull ? '/methodologies' : '/'} />
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
            <MethodologyEntityInfo methodology={entity} />
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
