import { ReturnComponentType } from '../../../../types/ReturnComponentType';

import preloader from 'assets/images/preloader.svg';
import s from 'styles/App.module.css';

export const Loader = (): ReturnComponentType => (
  <div className={s.preloader}>
    <img src={preloader} alt="" />
  </div>
);

// export const Loader = (): ReturnComponentType => {
//   const loader = useSelector<AppRootState, boolean>(state => state.app.isFetching);
//   return (
//     <div>
//       {loader && (
//         <div className={s.preloader}>
//           <img src={preloader} alt="" />
//         </div>
//       )}
//     </div>
//   );
// };
