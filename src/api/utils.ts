import { ENTITY_API_OPTIONS } from './../constants/values';
import { EProposalStatus } from 'types/enums';

export const listFilter = ([_key, value]: [_key: any, value: any]) =>
  value !== undefined && value !== null;

export const listMapper = ([key, value]: [key: any, value: any]) =>
  key === 'sortBy'
    ? `sort_by=${value}`
    : key === 'sortDirection'
    ? `sort_direction=${value}`
    : key === 'status'
    ? `filter_${key.toLowerCase()}=${EProposalStatus[
        value as keyof typeof EProposalStatus
      ]
        .toString()
        .toLowerCase()}`
    : key === 'variant'
    ? `filter_${key.toLowerCase()}=${ENTITY_API_OPTIONS[value].label
        .toString()
        .toLowerCase()}`
    : `filter_${key.toLowerCase()}=${value}`;
