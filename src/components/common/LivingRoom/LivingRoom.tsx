import { SPBIcon } from 'assets/icons';
import { ChevronIcon } from 'assets/icons/chevron';
import { Button, H1, H3, LandingHeading, Text } from 'components/kit';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './LivingRoom.module.scss';

export const LivingRoom = () => {
  return (
    <div className={styles.wrapper} id="main">
      <Wrapper>
        <div className={styles.inner}>
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
          {/* <MainFiltration /> */}
          {/* <MainTable /> */}
        </div>
      </Wrapper>
    </div>
  );
};
