import { useMemo, useState } from 'react';
import { usePopper } from 'react-popper';

import styles from './LibraryWordEntry.module.scss';

type Props = {
  word: string;
  meaning: string;
};

export const LibraryWordEntry = ({ word, meaning }: Props) => {
  const offsetModifier = useMemo(
    () => ({
      name: 'offset',
      options: {
        offset: ({ placement, reference, popper }) => {
          if (placement === 'bottom') {
            return [0, -1];
          } else {
            return [0, reference.height - 5];
          }
        },
      },
    }),
    []
  );

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'top',
      modifiers: [offsetModifier],
    }
  );

  const [isHintVisible, setIsHintVisible] = useState(false);

  const bindHintVisibility = (state: boolean) => () => setIsHintVisible(state);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={bindHintVisibility(true)}
      onMouseLeave={bindHintVisibility(false)}
      ref={setReferenceElement}
    >
      {word}
      {isHintVisible && (
        <div
          className={styles.hint}
          ref={setPopperElement}
          style={popperStyles.popper}
          {...attributes.popper}
        >
          {meaning}
        </div>
      )}
    </span>
  );
};
