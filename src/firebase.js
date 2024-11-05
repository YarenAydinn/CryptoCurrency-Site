import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_OHuoIrHl7hq0cq7wWQoihXoBSCVD7n4",
  authDomain: "signup-b3ed2.firebaseapp.com",
  projectId: "signup-b3ed2",
  storageBucket: "signup-b3ed2.appspot.com",
  messagingSenderId: "15116123177",
  appId: "1:15116123177:web:979a5317e2404fdf60f038",
  measurementId: "G-7069LVGFBC"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth(app)