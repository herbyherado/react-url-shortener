import firebase from '@firebase/app';
import firebaseConfig from '../config/firebase';
import '@firebase/firestore';

// types
import { QuerySnapshot } from '@firebase/firestore-types';
import { LinkAttribute } from '../types';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore!();

export const createShortLink = (hashID: string, data: LinkAttribute) => {
  return db
    .collection('link')
    .doc(hashID)
    .set(data);
};

/**
 * Verify string such that it is unique in 'firestore'
 * @param {String} id unique id to be verified in firestore
 */
export const checkExistingDoc = async (ref: string, id: string) => {
  const doc = await db
    .collection(ref)
    .doc(id)
    .get();

  if (doc.exists) {
    return false;
  }

  return true;
};

export const streamShortLinkList = (observer: {
  next?: (snapshot: QuerySnapshot) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}) => {
  return db
    .collection('link')
    .orderBy('createdAt', 'desc')
    .onSnapshot(observer);
};
