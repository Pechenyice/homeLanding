import { SearchIcon } from 'assets/icons';
import { Button, Input, Text } from 'components/kit';
import { ChangeEvent, HTMLAttributes } from 'react';

import { combineClasses } from 'utils';

import styles from './Search.module.scss';

type Props = {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
} & HTMLAttributes<HTMLDivElement>;

export const Search = ({
  value,
  onChange,
  onSearchClick,
  className,
  placeholder = 'Введите текст',
}: Props) => {
  return (
    <div className={combineClasses(styles.wrapper, className ?? '')}>
      <SearchIcon className={styles.icon} />
      <Input
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder}
      />
      <Button palette="blue" className={styles.button} onClick={onSearchClick}>
        <Text isMedium>Найти</Text>
      </Button>
    </div>
  );
};
