import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useEntities, useQueryParams } from 'hooks';

import styles from './MainFiltrationTable.module.scss';
import { Search } from '../Search/Search';
import { RnsuCategories } from '../RnsuCategories/RnsuCategories';
import { LivingRoomFiltration } from '../LivingRoomFiltration/LivingRoomFiltration';

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
    setSearch((params.search as any) || '');
    setRnsuIds((params.rnsu as any)?.split(',').map((id: string) => +id) || []);
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
        search: params.search || undefined,
        rnsu: params.rnsu || undefined,
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
      search: e.target.value ? e.target.value : undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);
  };

  const handleRnsuChange = (isActive: boolean, ids: number[]) => {
    console.log(rnsuIds);

    let newIds;
    if (isActive) {
      newIds = [...rnsuIds, ...ids];
      setRnsuIds(newIds);
    } else {
      newIds = rnsuIds.filter((id) => !ids.includes(id));
      setRnsuIds(newIds);
    }

    let preparedQueryParams = {
      ...params,
      rnsu: newIds.length ? newIds.join(',') : undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);
  };

  const clearRnsu = () => {
    setRnsuIds([]);
    let preparedQueryParams = {
      ...params,
      rnsu: undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);
  };

  return (
    <div>
      <Search
        className={styles.search}
        value={search}
        onChange={handleSearchChange}
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
      {/* <MainTable /> */}
    </div>
  );
};
