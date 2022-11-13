import { ELoaderPalette, H4, Loader } from 'components/kit';
import styles from './LibraryLoadingIndicator.module.scss';

export const LibraryLoadingIndicator = () => {
  return (
    <div className={styles.wrapper}>
      <H4>Библиотека терминов загружается...</H4>
      <Loader palette={ELoaderPalette.MIDDLE} />
    </div>
  );
};
