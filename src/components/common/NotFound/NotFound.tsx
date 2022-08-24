import { useNavigate } from 'react-router-dom';

import { Button, H1, Text } from 'components/kit';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  const navigate = useNavigate();

  const navigateToMain = () => navigate('/');

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <H1 className={styles.spacer}>404: Not Found</H1>
        <Button className={styles.resizer} onClick={navigateToMain}>
          <Text isMedium>На главную</Text>
        </Button>
      </div>
    </div>
  );
};
