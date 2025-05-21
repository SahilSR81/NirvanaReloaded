import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export const updateUserDetails = async (userId: string, details: any) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...details,
      personalDetailsFilled: true,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export const getUserDetails = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.data();
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
}; 