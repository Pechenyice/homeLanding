import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils/common';

import styles from './LandingHeading.module.scss';

export const LandingHeading: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
}) => {
  return (
    <h2 className={combineClasses(styles.styled, className)}>{children}</h2>
  );
};
