import { LinkIcon } from 'assets/icons';
import { FC, HTMLAttributes } from 'react';
import { combineClasses } from 'utils/common';
import styles from './Link.module.scss';

type Props = {
  href: string;
  target?: string;
} & HTMLAttributes<any>;

export const Link: FC<Props> = ({
  href,
  target,
  children,
  className = '',
  ...rest
}) => {
  return (
    <a
      href={href}
      target={target}
      className={combineClasses(styles.wrapper, className)}
      {...rest}
    >
      {children}
      <LinkIcon />
    </a>
  );
};
