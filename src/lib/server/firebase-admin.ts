import admin from 'firebase-admin';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { FIREBASE_SERVICE_ACCOUNT_CREDENTIALS } from '$env/static/private';

const SERVICE_ACCOUNT: admin.ServiceAccount & { project_id?: string } = JSON.parse(FIREBASE_SERVICE_ACCOUNT_CREDENTIALS); // Firebase Admin typings use camelCase but Google Cloud Service Account credentials use snake_case oddly enough

function initializeFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(SERVICE_ACCOUNT),
      databaseURL: `https://${SERVICE_ACCOUNT.project_id}.firebaseio.com`
    });
  }
}

export async function decodeToken(token: string): Promise<DecodedIdToken> {
  if (!token) throw new Error('Firebase user token missing.');
  try {
    initializeFirebase();
    return await admin.auth().verifyIdToken(token);
  } catch (err) {
    console.error(err)
    throw new Error(`Trouble initializing Firebase and verifying token: ${err}`)
  }
}

// see https://github.com/ManuelDeLeon/sveltekit-firebase-ssr for other possible backend firebase-admin use-cases