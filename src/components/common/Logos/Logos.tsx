import styles from './Logos.module.scss';

import comitet from 'assets/images/comitet.png';
import gimc from 'assets/images/GIMC.png';

export const Logos = () => {
  return (
    <div className={styles.images}>
      <img src={comitet} className={styles.comitet} />
      <img src={gimc} className={styles.gimc} />
    </div>
  );
};
