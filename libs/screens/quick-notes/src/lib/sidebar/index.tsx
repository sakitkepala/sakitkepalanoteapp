import * as Avatar from '@radix-ui/react-avatar';
import clsx from 'clsx';

import * as globalStyles from '@noteapp/global-styles';
import * as styles from './index.css';

function SideBarLeft() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.floatingBrand}>
        <h1 className={styles.logoSaved}>SAVED</h1>
      </div>
    </div>
  );
}

function SideBarRight() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.floatingProfile}>
        <div>
          <Avatar.Root className={styles.avatar}>
            <Avatar.Image src="" />
            <Avatar.Fallback className={styles.fallback}>S</Avatar.Fallback>
          </Avatar.Root>
        </div>

        <ul className={clsx(styles.sideMenus, globalStyles.flow)}>
          <li>
            <a href="#" className={styles.menuLink}>
              @sakitkepala
            </a>
          </li>
          <li>
            <a href="#" className={styles.menuLink}>
              Setingan
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { SideBarLeft, SideBarRight };
