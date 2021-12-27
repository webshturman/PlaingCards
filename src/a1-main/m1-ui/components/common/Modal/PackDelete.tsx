import React from 'react';

import { ReturnComponentType } from '../../../../../types/ReturnComponentType';
import { Button } from '../CustomButton/Button';

type PackDeleteType = {
  showDelete: (modal: boolean) => void;
  deletePack: () => void;
};

export const PackDelete: React.FC<PackDeleteType> = ({
  showDelete,
  deletePack,
}): ReturnComponentType => (
  <div>
    <h1>Delete Pack</h1>
    <Button onClick={deletePack}>delete</Button>
    <Button onClick={() => showDelete(false)}>cancel</Button>
  </div>
);
