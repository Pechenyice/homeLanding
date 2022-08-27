import { H2, H3, Tag } from 'components/kit';
import styles from './CommonEntityInfo.module.scss';

type Props = {
  //TODO: type from API
  entity: any;
};

export const CommonEntityInfo = ({ entity }: Props) => {
  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения о практике</H2>

      <div className={styles.inner}>
        <Tag tag="Формы социального обслуживания">
          <H3>
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
            nullnullnullnullnull v null null nullnull null null nullnull
          </H3>
        </Tag>
        <Tag tag="Аннотация" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag tag="Цель" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag tag="Задачи" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag tag="Реализация для гражданина" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag tag="Социальный результат" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
        <Tag
          tag="Возможность реализации в дистанционном формате"
          className={styles.nextTag}
        >
          <H3>null</H3>
        </Tag>
        <Tag
          tag="Привлечение добровольцев и волонтеров"
          className={styles.nextTag}
        >
          <H3>null</H3>
        </Tag>
        <Tag
          tag="Обстоятельства признания нуждаемости"
          className={styles.nextTag}
        >
          <H3>null</H3>
        </Tag>
        <Tag
          tag="Практика размещена в АСИ 'Смартека'"
          className={styles.nextTag}
        >
          <H3>null</H3>
        </Tag>
        <Tag tag="Видео ролик" className={styles.nextTag}>
          <H3>null</H3>
        </Tag>
      </div>
    </div>
  );
};
