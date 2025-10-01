'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './config';

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

if (typeof window !== 'undefined') {
    // Conditional check for browser environment
    try {
        getAnalytics(app);
    } catch (error) {
        console.error("Failed to initialize Analytics", error);
    }
}

export { app };
