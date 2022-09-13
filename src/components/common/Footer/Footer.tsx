import styles from './Footer.module.scss';

import { Wrapper } from '../Wrapper/Wrapper';
import {
  SocialOkIcon,
  SocialTgIcon,
  SocialVkIcon,
  SocialYoutubeIcon,
} from 'assets/icons';
import { H3, H4 } from 'components/kit';
import { Logos } from '../Logos/Logos';

export const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <Wrapper>
        <div className={styles.footer}>
          <div className={styles.content}>
            <Logos />
            <div className={styles.data}>
              <H3>ул. Садовая, дом 55-57, литера А</H3>
              <H3 isMedium>+7 812 417-31-51</H3>
              <H3 isMedium>info@semya.gugov.spb.ru</H3>
            </div>
            <div className={styles.social}>
              <a target="_blank" href="https://vk.com/gimc_family">
                <SocialVkIcon />
              </a>
              <a target="_blank" href="https://t.me/gimc_family">
                <SocialTgIcon />
              </a>
            </div>
          </div>
          <div className={styles.metadata}>
            <H4>Санкт-Петербург, {new Date().getFullYear()}</H4>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
