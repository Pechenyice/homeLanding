import { ProfileIcon } from 'assets/icons';
import { Text } from 'components/kit';

import { Wrapper } from '../Wrapper/Wrapper';

import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { Logos } from '../Logos/Logos';

export const Header = () => {
  const navigate = useNavigate();

  const redirectToSystem = () => {
    window.location.assign('/account/');
  };

  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <div className={styles.header}>
          <Logos />
          <div className={styles.link} onClick={redirectToSystem}>
            <ProfileIcon />
            <Text isMedium>Личный кабинет организации</Text>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
