import { StatisticIcon } from 'assets/icons';
import { SPBIcon } from 'assets/icons/spb';
import { Button, H1, H3, LandingHeading, Text } from 'components/kit';
import { Wrapper } from '../Wrapper/Wrapper';
import styles from './Statistic.module.scss';
import { useStatistic } from 'hooks/queries/statistic/useStatistic';

const inputs = [
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
  const { apiData: stats, isLoading: statsLoading } = useStatistic();

  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <LandingHeading>О социотеке</LandingHeading>
        <div className={styles.flexBox}>
          <div className={styles.statistic}>
            <div className={styles.content}>
              {statsLoading ? (
                <div className={styles.placeholder}>
                  <div className={styles.placeholder__content}></div>
                </div>
              ) : (
                stats?.jobs_count ?? '-'
              )}
            </div>
            <Text>Практик и решений</Text>
          </div>
          <div className={styles.statistic}>
            <div className={styles.content}>
              {statsLoading ? (
                <div className={styles.placeholder}>
                  <div className={styles.placeholder__content}></div>
                </div>
              ) : (
                stats?.companies_count ?? '-'
              )}
            </div>
            <Text>Организаций</Text>
          </div>
          <div className={styles.statistic}>
            <div className={styles.content}>
              {statsLoading ? (
                <div className={styles.placeholder}>
                  <div className={styles.placeholder__content}></div>
                </div>
              ) : (
                stats?.best_jobs_count ?? '-'
              )}
            </div>
            <Text>Лучших практик</Text>
          </div>
          <div className={styles.statistic}>
            <div className={styles.content}>
              {statsLoading ? (
                <div className={styles.placeholder}>
                  <div className={styles.placeholder__content}></div>
                </div>
              ) : (
                stats?.remote_format_jobs_count ?? '-'
              )}
            </div>
            <Text>Практик в дистанционном формате</Text>
          </div>
        </div>
      </Wrapper>
      <StatisticIcon className={styles.back} />
    </div>
  );
};
