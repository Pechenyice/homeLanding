import { Banner, LivingRoom, Statistic } from 'components';
import styles from './Main.module.scss';

export const Main = () => {
  return (
    <div>
      <Banner />
      <LivingRoom />
      <Statistic />
    </div>
  );
};
