import { useState } from 'react';

import styles from './LibraryWordEntry.module.scss';

type Props = {
  word: string;
  meaning: string;
};

export const LibraryWordEntry = ({ word, meaning }: Props) => {
  const [isHintVisible, setIsHintVisible] = useState(false);

  const bindHintVisibility = (state: boolean) => () => setIsHintVisible(state);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={bindHintVisibility(true)}
      onMouseLeave={bindHintVisibility(false)}
    >
      {word}
      {isHintVisible && <div className={styles.hint}>{meaning}</div>}
    </span>
  );
};
