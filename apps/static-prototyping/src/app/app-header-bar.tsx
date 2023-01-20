import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineRectangleGroup } from 'react-icons/hi2';
import { clsx } from 'clsx';

import * as styles from './app-header-bar.css';
import * as globalStyles from './global-styles.css';

function AppHeaderBar() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.navBar}>
        <div title="Hai! :)" style={{ color: globalStyles.primaryBlue3 }}>
          <HiOutlineRectangleGroup size="18" />
        </div>
        <nav className={styles.navMenus}>
          <Link
            className={clsx(
              styles.navMenuLink,
              pathname === '/captures' ? styles.navMenuLinkActive : undefined
            )}
            to="/captures"
          >
            Tangkapan
          </Link>
          <Link
            className={clsx(
              styles.navMenuLink,
              pathname === '/repository' ? styles.navMenuLinkActive : undefined
            )}
            to="/repository"
          >
            Repositori
          </Link>
        </nav>
      </div>
    </header>
  );
}

export { AppHeaderBar };
