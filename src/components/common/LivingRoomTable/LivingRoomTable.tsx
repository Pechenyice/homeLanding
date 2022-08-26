import { EEntity } from 'types/enums';
import { LivingRoomCard } from '../LivingRoomCard/LivingRoomCard';
import styles from './LivingRoomTable.module.scss';

export const LivingRoomTable = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <LivingRoomCard
          className={styles.card}
          image={'/cdea6c379fa83106550d.png'}
          realisation={0}
          entity={EEntity.PROJECT}
          name={
            'name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов'
          }
          company={
            'name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдловname фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов'
          }
          period={'2020'}
        />
        <LivingRoomCard
          className={styles.card}
          image={'/b7d009f7298c31724560.png'}
          realisation={0}
          entity={EEntity.PROJECT}
          name={
            'name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдловname фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдловм  name фывлфоы врлфыов рфылдв офырв олдыфрв ыфов рфы врфыд вфыловр фыдлов'
          }
          company={'company'}
          period={'2020'}
        />
        <LivingRoomCard
          className={styles.card}
          image={null}
          realisation={0}
          entity={EEntity.PROJECT}
          name={'name'}
          company={'company'}
          period={'2020'}
        />
        <LivingRoomCard
          className={styles.card}
          image={null}
          realisation={0}
          entity={EEntity.PROJECT}
          name={'name'}
          company={'company'}
          period={'2020'}
        />
      </div>
    </div>
  );
};
