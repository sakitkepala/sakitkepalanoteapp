import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbCapture } from 'react-icons/tb';
import { HiOutlineRectangleGroup, HiOutlineInboxStack } from 'react-icons/hi2';
import { clsx } from 'clsx';

import * as styles from './app-header-bar.css';
import * as globalStyles from './global-styles.css';

function AppHeaderBar() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.navBar}>
        <div className={styles.branding} title="Hai! :)">
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
            <PushedDownIcon>
              <TbCapture size="14" />
            </PushedDownIcon>
            <MenuLabel>Tangkapan</MenuLabel>
          </Link>
          <Link
            className={clsx(
              styles.navMenuLink,
              pathname === '/repository' ? styles.navMenuLinkActive : undefined
            )}
            to="/repository"
          >
            <PushedDownIcon>
              <HiOutlineInboxStack size="14" />
            </PushedDownIcon>
            <MenuLabel>Repositori</MenuLabel>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function PushedDownIcon({ children }: React.PropsWithChildren) {
  return children ? (
    <span
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateY(2px)',
        marginRight: 5,
      }}
    >
      {children}
    </span>
  ) : null;
}

function MenuLabel({ children }: React.PropsWithChildren) {
  return children ? (
    <span style={{ display: 'inline-block' }}>{children}</span>
  ) : null;
}

export { AppHeaderBar };
