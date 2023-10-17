import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBS-aR_XUwuLy88EXU4ej2sea20lzUoLAM',
  authDomain: 'twitter-clone-b189f.firebaseapp.com',
  projectId: 'twitter-clone-b189f',
  storageBucket: 'twitter-clone-b189f.appspot.com',
  messagingSenderId: '802692152812',
  appId: '1:802692152812:web:b1fb5a585b05d82fb8d4c9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
