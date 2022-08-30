import { ELoaderPalette, H4, Loader } from 'components/kit';
import { useRnsuFilters } from 'hooks/queries/useRnsuFilters';
import { combineClasses } from 'utils/common';
import styles from './RnsuCategories.module.scss';

type Props = {
  values: number[];
  onChange: (isActive: boolean, value: number) => void;
  onClear: () => void;
};

export const RnsuCategories = ({ values, onChange, onClear }: Props) => {
  const {
    apiData: rnsuFilters,
    isLoading: rnsuFiltersLoading,
  } = useRnsuFilters();

  const bindChange = (isActive: boolean, id: number) => () =>
    onChange(!isActive, id);

  if (rnsuFiltersLoading) {
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
        <Loader palette={ELoaderPalette.DARK} />
      </div>
    );
  }

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
      {rnsuFilters?.map((rnsu) => {
        const isActive = values.includes(rnsu.id);
        return (
          <div
            key={rnsu.id}
            className={combineClasses(
              styles.category,
              isActive ? styles.category_active : ''
            )}
            onClick={bindChange(isActive, rnsu.id)}
          >
            <img src={rnsu.image_path} className={styles.icon} />
            <H4>{rnsu.label}</H4>
          </div>
        );
      })}
    </div>
  );
};
