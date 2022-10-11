import { useParams } from 'react-router-dom';

import {
  ClubEntityInfo,
  CommonCompanyInfo,
  CommonEntityInfo,
  CommonEntityPreview,
  NotFound,
  ProjectEntityInfo,
  Wrapper,
} from 'components';
import { BackButton, H4 } from 'components/kit';
import styles from './ClubPreview.module.scss';
import { useClub } from 'hooks/queries/entities/useClub';
import { PageLoader } from 'components';

const ENTITY_NAME = 'Клуб';

type Props = {
  isFull?: boolean;
};

export const ClubPreview = ({ isFull }: Props) => {
  const { id } = useParams();

  const { apiData: entity, isLoading: isEntityLoading } = useClub(
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
          <BackButton path={isFull ? '/clubs' : '/'} />
          <H4 isMedium className={styles.tag}>
            {ENTITY_NAME}
          </H4>
          <CommonEntityPreview
            isFull={isFull}
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
            <ClubEntityInfo club={entity} />
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
