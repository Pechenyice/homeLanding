import { ELoaderPalette, Loader } from 'components/kit';
import styles from './PageLoader.module.scss';

export const PageLoader = () => {
  return (
    <div className={styles.wrapper}>
      <Loader palette={ELoaderPalette.DARK} />
    </div>
  );
};
