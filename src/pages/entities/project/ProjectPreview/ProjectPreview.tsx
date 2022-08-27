import {
  CommonCompanyInfo,
  CommonEntityInfo,
  CommonEntityPreview,
  ProjectEntityInfo,
  Wrapper,
} from 'components';
import { BackButton, H4 } from 'components/kit';
import styles from './ProjectPreview.module.scss';

const ENTITY_NAME = 'Проект';

type Props = {
  isFull?: boolean;
};

export const ProjectPreview = ({ isFull }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Wrapper>
          <BackButton />
          <H4 isMedium className={styles.tag}>
            {ENTITY_NAME}
          </H4>
          <CommonEntityPreview
            name={
              ' s dljwafl kjsadhfkldjsfbdsf bsdmlfsab dlasnb dasmdbv as s dljwafl kjsadhfkldjsfbdsf bsdmlfsab dlasnb dasmdbv as s dljwafl kjsadhfkldjsfbdsf bsdmlfsab dlasnb dasmdbv as s dljwafl kjsadhfkldjsfbdsf bsdmlfsab dlasnb dasmdbv as'
            }
            image={{
              id: 123,
              path: '/cdea6c379fa83106550d.png',
              original_name: '123',
            }}
            gallery={[
              {
                id: 123,
                path: '/b7d009f7298c31724560.png',
                original_name: '123',
              },
              {
                id: 123,
                path: '/b7d009f7298c31724560.png',
                original_name: '123',
              },
            ]}
            rating={{
              count: 3,
              fields: {
                is_favorite: true,
                is_practice_placed_in_asi_smarteka: true,
                is_has_publication: false,
                is_has_approbation: true,
                is_has_replicability: false,
                is_has_any_review: false,
              },
            }}
            period={'2022'}
          />
        </Wrapper>
      </div>
      <div className={styles.content}>
        <Wrapper>
          {isFull ? (
            <ProjectEntityInfo project={null} />
          ) : (
            <CommonEntityInfo entity={null} />
          )}
        </Wrapper>
      </div>
      <div className={styles.footer}>
        <Wrapper>
          <CommonCompanyInfo company={null} />
        </Wrapper>
      </div>
    </div>
  );
};
