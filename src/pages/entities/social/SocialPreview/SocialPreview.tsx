import { useParams } from 'react-router-dom';

import {
  CommonCompanyInfo,
  CommonEntityInfo,
  CommonEntityPreview,
  NotFound,
  SocialEntityInfo,
  Wrapper,
} from 'components';
import { BackButton, H4 } from 'components/kit';
import styles from './SocialPreview.module.scss';
import { PageLoader } from 'components';
import { EducationEntityInfo } from 'components/entities/EducationEntityInfo/EducationEntityInfo';
import { useSocial } from 'hooks/queries/entities/useSocial';

const ENTITY_NAME = 'Программа по соц. работе';

type Props = {
  isFull?: boolean;
};

export const SocialPreview = ({ isFull }: Props) => {
  const { id } = useParams();

  const { apiData: entity, isLoading: isEntityLoading } = useSocial(
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
          <BackButton path={isFull ? '/social' : '/'} />
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
            <SocialEntityInfo social={entity} />
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
