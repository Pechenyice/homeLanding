import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEntities, useQueryParams } from 'hooks';

import styles from './MainFiltrationTable.module.scss';

export const MainFiltrationTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const { entities, isLoading, getEntities } = useEntities();

  useEffect(() => {
    getEntities(page, limit);
  }, [page, limit]);

  const handleSearchClick = () => {
    if (page === 1) {
      getEntities(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleClearClick = () => {
    if (page === 1) {
      getEntities(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleUpdatePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      {/* <Search placeholder="Поиск по наименованию" /> */}
      {/* <RnsuCategories /> */}
      {/* <LivingRoomFiltration /> */}
      {/* <MainTable /> */}
    </div>
  );
};
