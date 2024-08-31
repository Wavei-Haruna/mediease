// src/setCustomClaims.js
import admin from './admin.js'; // Import the admin module

async function setCustomClaims(uid, claims) {
  try {
    await admin.auth().setCustomUserClaims(uid, claims);
    console.log('Custom claims set successfully');
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
}

// Example usage
setCustomClaims('user-uid', { admin: true });
