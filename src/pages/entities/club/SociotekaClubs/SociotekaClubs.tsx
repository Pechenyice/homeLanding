import { useParams, useSearchParams } from 'react-router-dom';

import { EntitiesNavigation, EntitiesTable, Search, Wrapper } from 'components';
import { BackButton, H1, H4 } from 'components/kit';
import styles from './SociotekaClubs.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { useQueryParams } from 'hooks';
import { useClubs } from 'hooks/queries/entities/useClubs';
import { ClubsFiltration } from '../ClubsFiltration/ClubsFiltration';

export const SociotekaClubs = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  const params = useQueryParams();
  const [, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');

  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState('');

  const { clubs, isLoading, getClubs } = useClubs();

  useEffect(() => {
    getClubs(page, limit);
  }, [page, limit]);

  useEffect(() => {
    setSearch((params.name as any) || '');
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    let preparedQueryParams = {
      ...params,
      name: e.target.value ? e.target.value : undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);
  };

  const handleSearchClick = () => {
    if (page === 1) {
      getClubs(page, limit);
    } else {
      setPage(1);
    }
  };

  const handleClearClick = () => {
    if (page === 1) {
      getClubs(page, limit, {
        sortBy: params.sortBy || undefined,
        sortDirection: params.sortDirection || undefined,
        name: params.name || undefined,
      } as any);
    } else {
      setPage(1);
    }
  };

  const handleUpdatePage = (newPage: number) => {
    setPage(newPage);
  };

  // sort rule: desc -> asc -> null
  const handleColumnHeaderClick = (columnHeader: string) => {
    let newSortDirection =
      sortDirection === 'asc' ? '' : sortDirection === 'desc' ? 'asc' : 'desc';
    newSortDirection = sortBy === columnHeader ? newSortDirection : 'desc';

    const newSortBy = newSortDirection === '' ? '' : columnHeader;

    let preparedQueryParams = {
      ...params,
      sortBy: newSortBy ? newSortBy : undefined,
      sortDirection: newSortDirection ? newSortDirection : undefined,
      name: params.name || undefined,
    };
    preparedQueryParams = JSON.parse(JSON.stringify(preparedQueryParams));
    setSearchParams(preparedQueryParams as any);

    setSortBy(newSortBy);
    setSortDirection(newSortDirection);

    if (page === 1) {
      getClubs(page, limit, preparedQueryParams as any);
    } else {
      setPage(1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <div className={styles.content}>
          <BackButton text="К виртуальной гостиной" />
          <H1 className={styles.heading}>
            Профессиональная социотека Санкт-Петербурга
          </H1>
          <EntitiesNavigation className={styles.navigation} active={3} />
          <Search
            className={styles.search}
            value={search}
            onChange={handleSearchChange}
            onSearchClick={handleSearchClick}
            placeholder="Поиск по наименованию"
          />
          <ClubsFiltration
            className={styles.filtration}
            onSearchClick={handleSearchClick}
            onClearClick={handleClearClick}
          />
          <EntitiesTable
            className={styles.table}
            data={clubs.items}
            total={clubs.total}
            page={page}
            limit={limit}
            isLoading={isLoading}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onColumnHeaderClick={handleColumnHeaderClick}
            onUpdatePage={handleUpdatePage}
            entityPath="clubs"
          />
        </div>
      </Wrapper>
    </div>
  );
};
