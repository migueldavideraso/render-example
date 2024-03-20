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
