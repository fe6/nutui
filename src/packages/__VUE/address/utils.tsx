import { IAddressFieldNames } from './types';

export const defaultFields = {
  disabled: 'disabled',
  key: 'code',
  items: 'items',
  label: 'name',
  value: 'code' // 提交后端的数据
};

export function fillAddressFieldNames(fieldNames?: IAddressFieldNames) {
  const { key, disabled, value, items, label } = fieldNames || {};

  return {
    disabled: disabled || 'disabled',
    key: key || 'key',
    value: value || 'value',
    label: label || 'name',
    items: items || 'items'
  };
}
