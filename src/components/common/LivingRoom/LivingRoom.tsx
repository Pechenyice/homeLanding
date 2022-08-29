import { SPBIcon } from 'assets/icons';
import { ChevronIcon } from 'assets/icons/chevron';
import { Button, H1, H3, LandingHeading, Text } from 'components/kit';
import { MainFiltrationTable } from '../MainFiltrationTable/MainFiltrationTable';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './LivingRoom.module.scss';

export const LivingRoom = () => {
  return (
    <div className={styles.wrapper} id="main">
      <Wrapper>
        <div>
          <div className={styles.header}>
            <LandingHeading>Виртуальная гостиная</LandingHeading>
            <a href="#">
              <div className={styles.links}>
                <Text isMedium className={styles.link}>
                  К Профессиональной социотеке Санкт-Петербурга
                </Text>
                <ChevronIcon />
              </div>
            </a>
          </div>
          <MainFiltrationTable />
        </div>
      </Wrapper>
    </div>
  );
};
