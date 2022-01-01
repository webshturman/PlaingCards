import React, { ChangeEvent } from 'react';

import { useDispatch } from 'react-redux';

import { Button } from '../CustomButton/Button';

import { saveUserDataTC } from 'a1-main/m2-bll/thunks/profile-thunk';
import { FIRST_ELEMENT } from 'constants/common';
import s from 'styles/Modal.module.css';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PackUpdateType = {
  showEdit: (modal: boolean) => void;
};

export const ProfileEdit: React.FC<PackUpdateType> = ({
  showEdit,
}): ReturnComponentType => {
  // const [newEmail, setNewEmail] = useState(EMPTY_STRING);
  // const emailUser = useSelector<AppRootState, Nullable<string>>(
  //   state => state.profile.email,
  // );
  // const updatePackName = (): void => {
  //   console.log(newEmail);
  // };
  const dispatch = useDispatch();
  const onAvatarPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('2');
    if (e.target.files?.length) {
      dispatch(saveUserDataTC('anjele@bk.ru', e.target.files[FIRST_ELEMENT]));
    }
  };
  return (
    <div className={s.containerModal}>
      <h1 className={s.titleModal}>Personal information</h1>
      {/* <Input */}
      {/*  title="" */}
      {/*  placeholder="" */}
      {/*  onChangeText={setNewEmail} */}
      {/*  value={emailUser!} */}
      {/*  type="text" */}
      {/* /> */}
      {/* <Input title="" placeholder="" onChangeText={setNewEmail} value="" type="file" /> */}
      <input type="file" onChange={onAvatarPhoto} />
      <Button onClick={() => showEdit(false)} className={s.buttonLRMargin}>
        update
      </Button>
      <Button onClick={() => showEdit(false)} className={s.buttonLRMargin}>
        cancel
      </Button>
    </div>
  );
};
