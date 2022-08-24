import { ButtonHTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import { ELoaderPalette, Loader } from '../Loader/Loader';
import styles from './Button.module.scss';

type Props = {
  isLoading?: boolean;
  palette?: 'blue' | 'white' | 'grey';
};

export const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & Props
) => {
  const {
    isLoading,
    disabled,
    className,
    children,
    onClick,
    palette = 'blue',
    ...rest
  } = props;

  console.log(onClick);

  return (
    <button
      className={combineClasses(
        styles.styled,
        (styles as any)[palette],
        disabled ? styles.styled_disabled : '',
        className ?? ''
      )}
      onClick={!disabled && !isLoading ? onClick : undefined}
      {...rest}
    >
      {isLoading ? (
        <Loader
          palette={
            palette === 'blue' ? ELoaderPalette.LIGHT : ELoaderPalette.DARK
          }
        />
      ) : (
        children
      )}
    </button>
  );
};
