import { FieldValue } from '@firebase/firestore-types';

export type LinkAttribute = {
  origin: string;
  count: number;
  createdAt: FieldValue;
};

export type LinkItem = {
  id: string;
} & LinkAttribute;
