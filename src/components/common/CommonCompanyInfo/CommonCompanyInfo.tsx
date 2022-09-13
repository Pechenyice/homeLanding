import { H2, H3, Link, Tag } from 'components/kit';
import { IAPICommonCompany } from 'types/entities';
import styles from './CommonCompanyInfo.module.scss';

type Props = {
  company: IAPICommonCompany;
};

export const CommonCompanyInfo = ({ company }: Props) => {
  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>
        Сведения об организации, предоставляющей данную практику
      </H2>

      <div className={styles.inner}>
        <Tag tag="Полное наименование организации">
          <H3>{company.full_name}</H3>
        </Tag>
        <Tag tag="Телефон" className={styles.nextTag}>
          <H3>{company.phone}</H3>
        </Tag>
        <Tag tag="Электронная почта" className={styles.nextTag}>
          <H3>{company.email}</H3>
        </Tag>
        <Tag tag="Ссылка на сайт организации" className={styles.nextTag}>
          <Link
            href={company.site}
            target="_blank"
            className={styles.container}
          >
            <H3>{company.site}</H3>
          </Link>
        </Tag>

        <H3 className={styles.hint}>
          Признание гражданина нуждающимся в социальном обслуживании
          осуществляет Санкт-Петербургское государственное казенное учреждение
          "Центр организации социального обслуживания" +7 812 576-0-576
        </H3>
      </div>
    </div>
  );
};
