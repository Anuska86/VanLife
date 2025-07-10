// A function whose only purpose is to delay execution
// for the specified # of milliseconds when used w/ `await`
// e.g. inside an async function:
// await sleep(2000)  => pauses the function for 2 seconds before moving on
function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

//FIREBASE

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  documentId,
} from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC7Bh-maeoHlZtNF9DaqR2UvxRBp2nP-k0",
  authDomain: "vanlife-6c51a.firebaseapp.com",
  projectId: "vanlife-6c51a",
  storageBucket: "vanlife-6c51a.firebasestorage.app",
  messagingSenderId: "662907236865",
  appId: "1:662907236865:web:30cb7103809f0f7793c600",
  measurementId: "G-Z3CVBCN8WT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

//FUNCTIONS

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

  return { ...snapshot.data(), id: snapshot.id };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);

  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return vans;
}

//INCOME
const incomeCollectionRef = collection(db, "income");
export async function getIncomeTransactions() {
  const snapshot = await getDocs(incomeCollectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function loginUser(creds) {
  const response = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await response.json();

  return data;
}
