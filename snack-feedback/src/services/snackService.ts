import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  Timestamp,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firestore';
import type { Snack } from '../types/snack';
import type { Feedback, FeedbackSubmission } from '../types/feedback';

const SNACKS_COLLECTION = 'snacks';
const FEEDBACK_COLLECTION = 'feedback';

// Snack Operations
export const getSnacksByYear = async (year: number): Promise<Snack[]> => {
  const snacksRef = collection(db, SNACKS_COLLECTION);
  const q = query(snacksRef, where('yearsOffered', 'array-contains', year));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Snack[];
};

export const getAllSnacks = async (): Promise<Snack[]> => {
  const snacksRef = collection(db, SNACKS_COLLECTION);
  const querySnapshot = await getDocs(snacksRef);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Snack[];
};

export const addSnack = async (
  snack: Omit<Snack, 'id' | 'createdAt'>
): Promise<string> => {
  const snacksRef = collection(db, SNACKS_COLLECTION);
  const docRef = await addDoc(snacksRef, {
    ...snack,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateSnack = async (
  snackId: string,
  updates: Partial<Omit<Snack, 'id' | 'createdAt'>>
): Promise<void> => {
  const snackRef = doc(db, SNACKS_COLLECTION, snackId);
  await updateDoc(snackRef, updates);
};

export const deleteSnack = async (snackId: string): Promise<void> => {
  const snackRef = doc(db, SNACKS_COLLECTION, snackId);
  await deleteDoc(snackRef);
};

// Feedback Operations
export const submitFeedback = async (
  feedback: FeedbackSubmission
): Promise<string> => {
  const feedbackRef = collection(db, FEEDBACK_COLLECTION);
  const docRef = await addDoc(feedbackRef, {
    ...feedback,
    timestamp: Timestamp.now(),
  });
  return docRef.id;
};

export const getFeedbackByYear = async (year: number): Promise<Feedback[]> => {
  const feedbackRef = collection(db, FEEDBACK_COLLECTION);
  const q = query(feedbackRef, where('year', '==', year));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    timestamp: doc.data().timestamp?.toDate() || new Date(),
  })) as Feedback[];
};