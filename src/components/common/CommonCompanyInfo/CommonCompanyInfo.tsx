import { H2, H3, Link, Tag } from 'components/kit';
import styles from './CommonCompanyInfo.module.scss';

type Props = {
  //TODO: type from API
  company: any;
};

export const CommonCompanyInfo = ({ company }: Props) => {
  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения об организации</H2>

      <div className={styles.inner}>
        <Tag tag="Полное наименование организации">
          <H3>
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
          </H3>
        </Tag>
        <Tag tag="Адрес" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag tag="Телефон" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag tag="Электронная почта" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag tag="Ссылка на сайт организации" className={styles.nextTag}>
          <Link
            href={'https://google.com'}
            target="_blank"
            className={styles.container}
          >
            <H3>null</H3>
          </Link>
        </Tag>
      </div>
    </div>
  );
};
