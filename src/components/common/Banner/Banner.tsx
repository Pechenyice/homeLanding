import { SPBIcon } from 'assets/icons';
import { Button, H1, H3, Text } from 'components/kit';
import { Link } from 'react-router-dom';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './Banner.module.scss';

export const Banner = () => {
  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <div className={styles.block}>
          <H1 className={styles.header}>
            Профессиональная социотека Санкт-Петербурга
          </H1>
          <H3 className={styles.text}>
            Электронный информационно-методический ресурс, включающий единую
            базу данных методик и технологий, разработанных и применяемых
            организациями социального обслуживания населения Санкт-Петербурга
            при предоставлении социальных услуг
          </H3>

          <Button palette="white" className={styles.button}>
            <Link to="/projects">
              <Text isMedium>
                Перейти к Профессиональной социотеке Санкт-Петербурга
              </Text>
            </Link>
          </Button>

          <SPBIcon className={styles.back} />
        </div>
      </Wrapper>
    </div>
  );
};
