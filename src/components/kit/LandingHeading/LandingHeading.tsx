import { FC } from 'react';

import styles from './LandingHeading.module.scss';

export const LandingHeading: FC = ({ children }) => {
  return <h2 className={styles.styled}>{children}</h2>;
};
