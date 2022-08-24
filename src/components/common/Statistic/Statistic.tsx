import { StatisticIcon } from 'assets/icons';
import { SPBIcon } from 'assets/icons/spb';
import { Button, H1, H3, LandingHeading, Text } from 'components/kit';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './Statistic.module.scss';

const inputs = [
  {
    content: '100+',
    description: 'Практик и решений',
  },
  {
    content: '50+',
    description: 'Организаций',
  },
  {
    content: '100%',
    description: 'Покрытие социальных услуг',
  },
  {
    content: '1',
    description: 'Уникальное решение',
  },
];

export const Statistic = () => {
  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <LandingHeading>О социотеке</LandingHeading>
        <div className={styles.flexBox}>
          {inputs.map((input) => (
            <div key={input.description} className={styles.statistic}>
              <div className={styles.content}>{input.content}</div>
              <Text>{input.description}</Text>
            </div>
          ))}
        </div>
      </Wrapper>
      <StatisticIcon className={styles.back} />
    </div>
  );
};
