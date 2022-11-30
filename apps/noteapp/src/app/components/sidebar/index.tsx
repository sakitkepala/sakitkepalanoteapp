import * as Avatar from '@radix-ui/react-avatar';
import clsx from 'clsx';

import * as global from '../../app.css';
import * as sidebar from './index.css';

function SideBarLeft() {
  return (
    <div className={sidebar.sidebar}>
      <div className={sidebar.floatingBrand}>
        <h1 className={sidebar.logoSaved}>SAVED</h1>
      </div>
    </div>
  );
}

function SideBarRight() {
  return (
    <div className={sidebar.sidebar}>
      <div className={sidebar.floatingProfile}>
        <div>
          <Avatar.Root className={sidebar.avatar}>
            <Avatar.Image src="" />
            <Avatar.Fallback className={sidebar.fallback}>S</Avatar.Fallback>
          </Avatar.Root>
        </div>

        <ul className={clsx(sidebar.sideMenus, global.flow)}>
          <li>
            <a href="#" className={sidebar.menuLink}>
              @sakitkepala
            </a>
          </li>
          <li>
            <a href="#" className={sidebar.menuLink}>
              Setingan
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { SideBarLeft, SideBarRight };
