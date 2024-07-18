import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCkoE9O9W8YO0D25yMYgcqofQKap-i5Y10",
  authDomain: "get-me-therapy-b706a.firebaseapp.com",
  projectId: "get-me-therapy-b706a",
  storageBucket: "get-me-therapy-b706a.appspot.com",
  messagingSenderId: "824674671554",
  appId: "1:824674671554:web:3a01f9ec35d3c8459e145b",
  measurementId: "G-3MSQD3M08P",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
