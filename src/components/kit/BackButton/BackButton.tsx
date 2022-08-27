import { ChevronLeftIcon } from 'assets/icons';
import { FC, HTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '../Text/Text';
import styles from './BackButton.module.scss';

export const BackButton: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div onClick={handleBack} className={styles.wrapper}>
      <ChevronLeftIcon fill="#414FEB" />
      <Text isMedium>Назад</Text>
    </div>
  );
};
