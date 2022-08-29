import { IAPIEntitiesList } from 'types/entities';
import { EEntity } from 'types/enums';
import { LivingRoomCard } from '../LivingRoomCard/LivingRoomCard';
import styles from './LivingRoomTable.module.scss';

type Props = {
  data: IAPIEntitiesList[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  onUpdatePage: (newPage: number) => void;
};

export const LivingRoomTable = ({
  data,
  total,
  page,
  limit,
  isLoading,
  onUpdatePage,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        {data.map((elem) => (
          <LivingRoomCard
            key={elem.id}
            className={styles.card}
            entityId={elem.id}
            image={elem.image ? '/storage/' + elem.image : null}
            realisation={elem.payment_id}
            entity={elem.variant}
            name={elem.name}
            company={elem.company}
            period={`${elem.year.start} - ${elem.year.end}`}
          />
        ))}
      </div>
    </div>
  );
};
