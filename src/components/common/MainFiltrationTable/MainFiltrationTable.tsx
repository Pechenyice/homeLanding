import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEntities, useQueryParams } from 'hooks';

import styles from './MainFiltrationTable.module.scss';
import { Search } from '../Search/Search';
import { RnsuCategories } from '../RnsuCategories/RnsuCategories';
import { LivingRoomFiltration } from '../LivingRoomFiltration/LivingRoomFiltration';
import { LivingRoomTable } from '../LivingRoomTable/LivingRoomTable';

export const MainFiltrationTable = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const [search, setSearch] = useState('');
  const [rnsuIds, setRnsuIds] = useState<number[]>([]);

  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const { entities, isLoading, getEntities } = useEntities();

  useEffect(() => {
    getEntities(page, limit);
  }, [page, limit]);

  useEffect(() => {
    setSearch((params.name as any) || '');
    setRnsuIds(
      (params.rnsu_category_group_ids as any)
        ?.split(',')
        .map((id: string) => +id) || []
    );
  }, []);

  const handleSearchClick = () => {
    if (page === 1) {
      getEntities(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleClearClick = () => {
    if (page === 1) {
      getEntities(page, limit, {
        name: params.name || undefined,
        rnsu_category_group_ids: params.rnsu_category_group_ids || undefined,
      } as any);
    } else {
      setPage(1);
    }
  };

  const handleUpdatePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    let preparedQueryParams = {
      ...params,
      name: e.target.value ? e.target.value : undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);
  };

  const handleRnsuChange = (isActive: boolean, id: number) => {
    let newIds;
    if (isActive) {
      newIds = [...rnsuIds, id];
      setRnsuIds(newIds);
    } else {
      newIds = rnsuIds.filter((rnsuId) => id !== rnsuId);
      setRnsuIds(newIds);
    }

    let preparedQueryParams = {
      ...params,
      rnsu_category_group_ids: newIds.length ? newIds.join(',') : undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);

    if (page === 1) {
      getEntities(page, limit, preparedQueryParams as any);
    } else {
      setPage(1);
    }
  };

  const clearRnsu = () => {
    setRnsuIds([]);
    let preparedQueryParams = {
      ...params,
      rnsu_category_group_ids: undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);

    if (page === 1) {
      getEntities(page, limit, preparedQueryParams as any);
    } else {
      setPage(1);
    }
  };

  return (
    <div>
      <Search
        className={styles.search}
        value={search}
        onChange={handleSearchChange}
        onSearchClick={handleSearchClick}
        placeholder="Поиск по наименованию"
      />
      <RnsuCategories
        values={rnsuIds}
        onChange={handleRnsuChange}
        onClear={clearRnsu}
      />
      <LivingRoomFiltration
        onSearchClick={handleSearchClick}
        onClearClick={handleClearClick}
      />
      <LivingRoomTable
        data={entities.items}
        total={entities.total}
        page={page}
        limit={limit}
        isLoading={isLoading}
        onUpdatePage={handleUpdatePage}
      />
    </div>
  );
};
