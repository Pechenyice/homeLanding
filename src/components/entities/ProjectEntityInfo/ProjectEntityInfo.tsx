import { H2, H3, Tag } from 'components/kit';
import { combineClasses } from 'utils/common';
import styles from './ProjectEntityInfo.module.scss';

type Props = {
  //TODO: type from API
  project: any;
};

export const ProjectEntityInfo = ({ project }: Props) => {
  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения о практике</H2>

      <div className={styles.inner}>
        <Tag tag="Аннотация">
          <H3>
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
          </H3>
        </Tag>
      </div>

      <H2 className={combineClasses(styles.heading, styles.heading__next)}>
        Результаты практики
      </H2>

      <div className={styles.inner}>
        <Tag tag="Основные качественные результаты">
          <H3>
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
          </H3>
        </Tag>
      </div>
    </div>
  );
};
