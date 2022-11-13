import { LoaderDarkIcon, LoaderGrayIcon, LoaderLightIcon } from 'assets/icons';
import { HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './Loader.module.scss';

export enum ELoaderPalette {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  MIDDLE = 'MIDDLE',
}

interface Props {
  palette: ELoaderPalette;
}

export const Loader = (props: Props & HTMLAttributes<HTMLDivElement>) => {
  const { palette, className, ...rest } = props;

  return (
    <div
      className={combineClasses(
        styles.styled,
        palette === ELoaderPalette.MIDDLE ? styles.styled_small : '',
        className ?? ''
      )}
      {...rest}
    >
      {palette === ELoaderPalette.LIGHT ? (
        <LoaderLightIcon />
      ) : palette === ELoaderPalette.MIDDLE ? (
        <LoaderGrayIcon />
      ) : (
        <LoaderDarkIcon />
      )}
    </div>
  );
};
