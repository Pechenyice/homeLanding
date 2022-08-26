import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils';
import styles from './H4.module.scss';

type Props = {
  isMedium?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;

export const H4: FC<Props> = (props) => {
  const { isMedium, children, className } = props;

  return (
    <h4
      className={combineClasses(
        styles.styled,
        isMedium ? styles.medium : '',
        className ?? ''
      )}
    >
      {children}
    </h4>
  );
};
