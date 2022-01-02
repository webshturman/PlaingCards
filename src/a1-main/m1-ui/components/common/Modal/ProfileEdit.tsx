import React, { ChangeEvent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../CustomButton/Button';
import { Input } from '../CustomInput/Input';

import { AppRootState } from 'a1-main/m2-bll/store';
import { saveUserDataTC } from 'a1-main/m2-bll/thunks/profile-thunk';
import { FIRST_ELEMENT } from 'constants/common';
import s from 'styles/Modal.module.css';
import { Nullable } from 'types/Nullable';
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

  const avatar = useSelector<AppRootState, Nullable<string> | undefined>(
    state => state.profile.avatar,
  );
  const name = useSelector<AppRootState, Nullable<string>>(state => state.profile.name);
  const [userName, setUserName] = useState<Nullable<string>>(name);
  const [fileUrl, setFileUrl] = useState<Nullable<string> | undefined>(avatar);
  const dispatch = useDispatch();
  const onAvatarPhoto = (e: ChangeEvent<HTMLInputElement>): void => {
    const newFile = e.target.files && e.target.files[FIRST_ELEMENT];

    if (newFile) {
      setFileUrl(window.URL.createObjectURL(newFile));
    }
  };
  const updateUserData = (): void => {
    if (fileUrl || userName) {
      dispatch(saveUserDataTC(userName, fileUrl));
      showEdit(false);
    }
  };
  return (
    <div className={s.containerModal}>
      <h1 className={s.titleModal}>Personal information</h1>
      <Input
        title=""
        placeholder="write your name"
        onChangeText={setUserName}
        value={userName!}
        type="text"
      />
      <input type="file" onChange={onAvatarPhoto} />
      <Button onClick={updateUserData} className={s.buttonLRMargin}>
        update
      </Button>
      <Button onClick={() => showEdit(false)} className={s.buttonLRMargin}>
        cancel
      </Button>
    </div>
  );
};
