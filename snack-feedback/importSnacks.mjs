// Firebase Import Script for Snacks
// Run this with: node importSnacks.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

// Load environment variables
dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load snacks from JSON
const snacks = JSON.parse(readFileSync('./snacks_import.json', 'utf8'));

async function importSnacks() {
  console.log(`🚀 Starting import of ${snacks.length} snacks...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const snack of snacks) {
    try {
      const snackData = {
        name: snack.name,
        category: snack.category,
        imageUrl: snack.imageUrl,
        yearsOffered: snack.yearsOffered,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'snacks'), snackData);
      console.log(`✅ Added: ${snack.name} (ID: ${docRef.id})`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error adding ${snack.name}:`, error);
      errorCount++;
    }
  }

  console.log(`\n🎉 Import complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
}

importSnacks()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
