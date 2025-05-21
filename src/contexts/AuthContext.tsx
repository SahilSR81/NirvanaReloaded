import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: string | null;
  signOut: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<User>;
  createUserWithEmail: (email: string, password: string, name: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        // Fetch role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          setRole(userDoc.exists() ? userDoc.data().role || 'user' : null);
        } catch {
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            displayName: user.displayName || '',
            email: user.email,
            createdAt: new Date().toISOString(),
            preferences: {},
            role: 'user',
          });
          setRole('user');
        } else {
          setRole(userDoc.data().role || 'user');
        }
      } catch (firestoreError) {
        setRole('user');
        console.error('Firestore error:', firestoreError);
      }
      return user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const createUserWithEmail = async (email: string, password: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        displayName: name,
        email: user.email,
        createdAt: new Date().toISOString(),
        preferences: {},
        role: 'user',
      });
      setRole('user');
      return user;
    } catch (error) {
      console.error('Error in createUserWithEmail:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Create user doc if not exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName || '',
          email: user.email,
          createdAt: new Date().toISOString(),
          preferences: {},
          role: 'user',
        });
        setRole('user');
      } else {
        setRole(userDoc.data().role || 'user');
      }
      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    role,
    signOut,
    signInWithEmail,
    createUserWithEmail,
    signInWithGoogle,
    sendPasswordReset,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 