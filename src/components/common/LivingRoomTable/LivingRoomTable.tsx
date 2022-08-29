import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import { ELoaderPalette, H3, H4, Loader } from 'components/kit';
import { ChangeEvent, useEffect, useState } from 'react';
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
  const [localPageState, setLocalPageState] = useState(page);

  useEffect(() => {
    if (localPageState !== page) setLocalPageState(page);
  }, [page]);

  const totalNumber = total;
  const maxPagesNumber = Math.ceil(total / limit);

  let startNumber = (page - 1) * limit + 1;
  startNumber = totalNumber === 0 ? 0 : startNumber;
  let endNumber = startNumber + limit - 1;
  endNumber = endNumber > total ? total : endNumber;

  const handleSafeUpdatePage = (newPage: number) => {
    if (newPage < 1 || newPage > maxPagesNumber) return;
    if (newPage === page) {
      setLocalPageState(newPage);
      return;
    }

    setLocalPageState(newPage);
    onUpdatePage(newPage);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalPageState(+e.target.value);
  };

  const handleBlur = () => {
    let pageToCheck = localPageState;

    if (isNaN(pageToCheck)) pageToCheck = page;
    if (pageToCheck < 0) pageToCheck = 1;
    if (pageToCheck > maxPagesNumber) pageToCheck = maxPagesNumber;

    handleSafeUpdatePage(pageToCheck);
  };

  const tableContent = (
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
  );

  const tableFooter = (
    <div className={styles.table__footer}>
      <div className={styles.table__footerInfo}>
        <H4>
          Показано: {startNumber} - {endNumber} из {totalNumber}
        </H4>
      </div>
      {!!totalNumber && (
        <div className={styles.table__footerPagination}>
          <ChevronLeftIcon
            className={styles.table__footerControl}
            onClick={() => handleSafeUpdatePage(page - 1)}
          />
          <div className={styles.table__footerPaginationController}>
            <input
              type="number"
              className={styles.table__paginator}
              value={localPageState}
              onChange={handleChange}
              onBlur={handleBlur}
            />{' '}
            <H3 className={styles.table__paginatorHeading}>
              {' '}
              из {maxPagesNumber}
            </H3>
          </div>
          <ChevronRightIcon
            className={styles.table__footerControl}
            onClick={() => handleSafeUpdatePage(page + 1)}
          />
        </div>
      )}
    </div>
  );

  const selectedContent = isLoading ? (
    <div className={styles.table__loader}>
      <Loader palette={ELoaderPalette.DARK} />
    </div>
  ) : totalNumber ? (
    tableContent
  ) : (
    <div className={styles.table__loader}>
      <H4>По вашему запросу ничего не найдено</H4>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {selectedContent}
      {tableFooter}
    </div>
  );
};
