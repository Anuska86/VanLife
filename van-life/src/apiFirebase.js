import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  documentId,
  setDoc,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyC7Bh-maeoHlZtNF9DaqR2UvxRBp2nP-k0",
  authDomain: "vanlife-6c51a.firebaseapp.com",
  projectId: "vanlife-6c51a",
  storageBucket: "vanlife-6c51a.appspot.com",
  //storageBucket: "vanlife-6c51a.firebasestorage.app",
  messagingSenderId: "662907236865",
  appId: "1:662907236865:web:30cb7103809f0f7793c600",
  measurementId: "G-Z3CVBCN8WT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

//FIREBASE FUNCTIONS

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function getHostsData() {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "==", "host"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
}

export async function getUserProfile(uid) {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function getHostVans(hostId) {
  if (!hostId) {
    throw new Error("getHostVans: hostId is undefined");
  }
  const q = query(vansCollectionRef, where("hostId", "==", hostId));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

export async function getVansByHostId(hostId) {
  const vansRef = collection(db, "vans");
  const q = query(vansRef, where("hostId", "==", hostId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

//USERS

export async function getUserRoleByEmail(email) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const userDoc = snapshot.docs[0];
    const data = userDoc.data();
    return data.role || null;
  } else {
    return null;
  }
}

export async function registerUser(email, password, alias, role = "host") {
  console.log("Attemping to register:", email);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create Firestore profile
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role,
      alias: user.alias, // CUSTOM ID, the id of the firebase is user.uid
      status: "active",
    });

    return user;
  } catch (error) {
    throw error;
  }
}

//INCOME

const transactionsRef = collection(db, "transactionData");

export async function getTransactions() {
  const snapshot = await getDocs(transactionsRef);
  const transactions = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return transactions;
}

//REVIEWS

const reviewsRef = collection(db, "reviewsData");

export async function getReviews() {
  const snapshot = await getDocs(reviewsRef);
  const reviews = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return reviews;
}
