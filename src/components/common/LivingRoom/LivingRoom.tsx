import { SPBIcon } from 'assets/icons';
import { ChevronIcon } from 'assets/icons/chevron';
import { Button, H1, H3, LandingHeading, Text } from 'components/kit';
import { Link } from 'react-router-dom';
import { MainFiltrationTable } from '../MainFiltrationTable/MainFiltrationTable';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './LivingRoom.module.scss';

export const LivingRoom = () => {
  return (
    <div className={styles.wrapper} id="main">
      <Wrapper>
        <div>
          <div className={styles.header}>
            <LandingHeading className={styles.heading}>
              Виртуальная гостиная
            </LandingHeading>
          </div>
          <MainFiltrationTable />
        </div>
      </Wrapper>
    </div>
  );
};
