import { ChevronLeftIcon } from 'assets/icons';
import { FC, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '../Text/Text';
import styles from './BackButton.module.scss';

type Props = {
  text?: string;
  path?: string;
} & HTMLAttributes<HTMLDivElement>;

export const BackButton: FC<Props> = ({ text, path }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(path || '/');
  };

  return (
    <div onClick={handleBack} className={styles.wrapper}>
      <ChevronLeftIcon fill="#414FEB" />
      <Text isMedium>{text || 'Назад'}</Text>
    </div>
  );
};
