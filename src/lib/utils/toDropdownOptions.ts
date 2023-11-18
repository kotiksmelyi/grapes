import { IDropdownItem } from '../types';

export const toDropdownOptions = <T extends { id: number; name: string }[]>(
  data: T
): IDropdownItem[] => {
  return data.map((i) => ({
    value: i.id,
    label: i.name,
  }));
};
