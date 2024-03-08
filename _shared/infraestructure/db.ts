
import admin from 'firebase-admin'


export function initDb () {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    serviceAccountId: serviceAccount.private_key_id,
    projectId: 'copres-firebase',
    storageBucket: "copres-firebase.appspot.com",
  });
}
