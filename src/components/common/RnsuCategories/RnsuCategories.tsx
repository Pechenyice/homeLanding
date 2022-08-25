import { H4 } from 'components/kit';
import { combineClasses } from 'utils/common';
import styles from './RnsuCategories.module.scss';

type Props = {
  values: number[];
  onChange: (isActive: boolean, values: number[]) => void;
  onClear: () => void;
};

const rnsuCategories = [
  {
    label: 'Дети',
    ids: [1, 2, 3],
    icon_path: '/123',
  },
  {
    label: 'Не Дети',
    ids: [4],
    icon_path: '/23',
  },
  {
    label: 'sjfsdjkfgdsfhksd',
    ids: [5],
    icon_path: '/13',
  },
  {
    label:
      'sjfsdjkfgdsfhksd  da ddadsa ds sjfsdjkfgdsfhksd asd as dasd sjfsdjkfgdsfhksd',
    ids: [6],
    icon_path: '/22',
  },
];

export const RnsuCategories = ({ values, onChange, onClear }: Props) => {
  const bindChange = (isActive: boolean, ids: number[]) => () =>
    onChange(!isActive, ids);

  return (
    <div className={styles.wrapper}>
      <div
        className={combineClasses(
          styles.category,
          !values.length ? styles.category_active : ''
        )}
        onClick={onClear}
      >
        <H4>Все</H4>
      </div>
      {rnsuCategories.map((rnsu) => {
        const isActive = rnsu.ids.every((id) => values.includes(id));
        return (
          <div
            key={rnsu.label}
            className={combineClasses(
              styles.category,
              isActive ? styles.category_active : ''
            )}
            onClick={bindChange(isActive, rnsu.ids)}
          >
            <img src={rnsu.icon_path} className={styles.icon} />
            <H4>{rnsu.label}</H4>
          </div>
        );
      })}
    </div>
  );
};
