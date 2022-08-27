import { FC, HTMLAttributes, ReactNode } from 'react';
import { combineClasses } from 'utils/common';
import { H4 } from '../H4/H4';
import styles from './Tag.module.scss';

type Props = {
  tag: string;
} & HTMLAttributes<HTMLDivElement>;

export const Tag: FC<Props> = ({ tag, children, className = '', ...rest }) => {
  return (
    <div className={combineClasses(styles.wrapper, className)} {...rest}>
      <H4 isMedium className={styles.tag}>
        {tag}
      </H4>
      {children}
    </div>
  );
};
