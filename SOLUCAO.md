# 💡 Gabarito de Solução — Minicurso Firebase

Este arquivo contém o código **100% finalizado** dos arquivos de integração do Firebase. Use-o para consultar durante a aula ou disponibilizar como gabarito aos alunos.

---

## 1. `src/services/firebase.ts`

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY.trim() !== ""
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoPlaceholderKeyForLocalPreview00",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:demoappplaceholder001",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 2. `src/services/auth.ts`

```typescript
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

// Criar conta com Email e Senha
export const registerWithEmail = async (email: string, pass: string) => {
  return await createUserWithEmailAndPassword(auth, email, pass);
};

// Login com Email e Senha
export const loginWithEmail = async (email: string, pass: string) => {
  return await signInWithEmailAndPassword(auth, email, pass);
};

// Login com o Google (Popup)
export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// Logout
export const logoutUser = async () => {
  return await signOut(auth);
};
```

---

## 3. `src/services/firestore.ts`

```typescript
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import type { Task } from "../@types";

const tasksCollection = collection(db, "tasks");

// Criar uma nova tarefa
export const addTask = async (title: string, userId: string) => {
  return await addDoc(tasksCollection, {
    title,
    completed: false,
    userId,
    createdAt: serverTimestamp(),
  });
};

// Alternar status (concluído / pendente)
export const toggleTask = async (id: string, completed: boolean) => {
  const taskDoc = doc(db, "tasks", id);
  return await updateDoc(taskDoc, { completed });
};

// Deletar tarefa
export const deleteTask = async (id: string) => {
  const taskDoc = doc(db, "tasks", id);
  return await deleteDoc(taskDoc);
};

// Escutar tarefas em tempo real (Realtime)
export const subscribeToTasks = (
  userId: string,
  callback: (tasks: Task[]) => void
) => {
  const q = query(
    tasksCollection,
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Task, "id">),
    }));
    callback(tasks);
  });
};
```

---

## 4. `src/context/AuthContext.tsx` (Hook de Autenticação)

```typescript
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, isFirebaseConfigured } from "../services/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isFirebaseConfigured: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isFirebaseConfigured: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isFirebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## 5. Regras de Segurança do Firestore (`firestore.rules`)

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```
