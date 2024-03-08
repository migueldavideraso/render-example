import type { ICollectionBackup, IDocBackup } from "../domine/models";
import type { IBackupController } from "../domine/services";
import { awaitAllSettled } from "../../_helpers/main";
import { DBError } from "../../_errors/main";
import { firestore } from 'firebase-admin'

type TDoc = firestore.DocumentSnapshot<firestore.DocumentData, firestore.DocumentData> | firestore.QueryDocumentSnapshot<firestore.DocumentData, firestore.DocumentData>

export class BackupController implements IBackupController {

	private db = firestore()

  async createAccountBackup (accountId: string) {

    try {

      const docRef = this.db.doc('cuentas/' + accountId)
      const doc = await docRef.get();

      const result: ICollectionBackup = {
        collections: {
          'cuentas': {
            [accountId]: await this.getDocData(doc)
          }
        },
      }

      return result
    }
    catch(e: any) {
			console.error('Error at createAccountBackup: ' + e?.toString())
			throw new DBError(DBError.UNEXPECTED)
    }
  }

  private async getDocData (doc: TDoc) {

    const docData: IDocBackup = {
      id: doc.id,
      data: doc.data() || {},
      collections: await this.getCollectionsData(doc.ref),
    }

    return docData
  }

  private async getCollectionsData (docRef: firestore.DocumentReference<firestore.DocumentData, firestore.DocumentData>) {

    const firebaseCollections = await docRef.listCollections()
    const collections: ICollectionBackup['collections'] = {}

    console.log(docRef.path)
    console.log(firebaseCollections.length)
    console.log('')

    await awaitAllSettled(firebaseCollections, async (collectionRef) => {

      const collectionName = collectionRef.id;
      const collectionSnapshot = await collectionRef.get();

      collections[collectionName] = {}

      await awaitAllSettled(collectionSnapshot.docs, async (doc) => {
        collections[collectionName][doc.id] = await this.getDocData(doc)
      })
      .catch(e => console.error(e))
    })
    .catch(e => console.error(e))

    return collections
  }



}

/* 


*/


/* 
const backup = {
  collections: {
    'cuentas': {
      'id_cuenta': {
        collections: {
          proyectos: {
            id_proyecto: {
              id: 'id_proyecto',
              data: {},
              collections: {}
            }
          }
        },
        data: {},
        id: 'id_cuenta'
      }
    }
  }
} satisfies ICollection


backup.collections.cuentas.id_cuenta.collections


'cuentas/id_cuenta/proyectos/id_proyecto/metricas'

function getCollection (backup: ICollection, path: string) {

  const keys = path.split('/').filter(key => key)

  if (keys.length % 2 === 0) {
    throw new Error('invalid path: ' + path)
  }

  if (keys.length === 1) {

    const collection = backup.collections[keys[0]] || {}
    const docs = Object.values(collection).map(doc => ({
      data: doc.data,
      id: doc.id
    }))

    return docs
  }

  const newPath = keys.slice(2)
  const currentPath = keys.slice(0, 2)
  const newbackup = backup.collections[currentPath[0]]?.[currentPath[1]]

  if (newbackup == null) {
    return []
  }

  return getCollection(newbackup, newPath.join('/'))
}
 */


/* 


const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.firebaseio.com'
});

const firestore = admin.firestore();

async function getDocumentAndSubcollections(docPath) {
  const docRef = firestore.doc(docPath);
  const docSnapshot = await docRef.get();
  const docData = docSnapshot.data();

  const result = {
    id: docSnapshot.id,
    data: docData,
    collections: {}
  };

  const collections = await docRef.listCollections();
  for (const collectionRef of collections) {
    const collectionName = collectionRef.id;
    const collectionSnapshot = await collectionRef.get();
    result.collections[collectionName] = [];
    collectionSnapshot.forEach((doc) => {
      result.collections[collectionName].push({
        id: doc.id,
        data: doc.data()
      });
    });
  }

  for (const collectionName in result.collections) {
    for (const subDoc of result.collections[collectionName]) {
      const subCollections = await getDocumentAndSubcollections(`${docPath}/${collectionName}/${subDoc.id}`);
      subDoc.collections = subCollections.collections;
    }
  }

  return result;
}

(async () => {
  try {
    const docPath = 'your-collection/your-document-id';
    const result = await getDocumentAndSubcollections(docPath);
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error getting document and subcollections:', error);
  }
})();
 */