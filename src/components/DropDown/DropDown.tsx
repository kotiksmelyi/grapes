import { Select } from 'antd';
import { FC } from 'react';
import { SelectProps } from 'antd/es/select';

export const DropDown: FC<SelectProps> = (props) => {
  return <Select {...props} />;
};
