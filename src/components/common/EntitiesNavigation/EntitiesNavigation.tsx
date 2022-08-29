import { Text } from 'components/kit';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { combineClasses } from 'utils/common';
import styles from './EntitiesNavigation.module.scss';

type Props = {
  active: number;
} & HTMLAttributes<HTMLDivElement>;

const config = [
  { id: 0, label: 'Проекты', link: '/projects' },
  { id: 1, label: 'Доп. общеобразовательные программы', link: '/education' },
  { id: 2, label: 'Методики и технологии', link: '/methodologies' },
  { id: 3, label: 'Клубы', link: '/clubs' },
  { id: 4, label: 'Программы по социальной работе', link: '/social' },
];

export const EntitiesNavigation = ({ active, className = '' }: Props) => {
  return (
    <div className={combineClasses(styles.wrapper, className)}>
      {config.map((entry) => (
        <Link to={entry.link} key={entry.id} className={styles.link}>
          <div
            className={combineClasses(
              styles.tab,
              active === entry.id ? styles.tab_active : ''
            )}
          >
            <Text isMedium>{entry.label}</Text>
          </div>
        </Link>
      ))}
    </div>
  );
};
