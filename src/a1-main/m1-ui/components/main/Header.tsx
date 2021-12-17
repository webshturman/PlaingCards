import React from 'react';

import { NavLink } from 'react-router-dom';

import { PATH } from 'enums/routes';
import style from 'styles/Header.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = (): ReturnComponentType => (
  <div className={style.header}>
    <div className={style.headerContainer}>
      <h1 className={style.title}>Plaing Cards</h1>
      <div>
        <div className={style.itemMenu}>
          <NavLink
            to={PATH.LAYOUT}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Profile
          </NavLink>
        </div>
        <div className={style.itemMenu}>
          <NavLink
            to={PATH.CARDS}
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Packs List
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);

// export const Header = (): ReturnComponentType => {
//   const AuthUserStatus = useSelector<AppRootState, boolean>(state => state.auth.isAuth);
//   return (
//     <div className={style.header}>
//       <div className={style.headerContainer}>
//         <h1 className={style.title}>Plaing Cards</h1>
//         {AuthUserStatus ? (
//           <div>
//             <div className={style.itemMenu}>
//               <NavLink
//                 to={PATH.PROFILE}
//                 className={({ isActive }) => (isActive ? style.active : '')}
//               >
//                 Profile
//               </NavLink>
//             </div>
//             <div className={style.itemMenu}>
//               <NavLink
//                 to={PATH.CARDS}
//                 className={({ isActive }) => (isActive ? style.active : '')}
//               >
//                 Packs List
//               </NavLink>
//             </div>
//           </div>
//         ) : (
//           ''
//         )}
//       </div>
//     </div>
//   );
// };
