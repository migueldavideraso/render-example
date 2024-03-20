import { DBError } from "../../_errors/main";
import type { ICollectionBackup } from "../domine/models";
import type { IStorageController } from "../domine/services";
import admin from 'firebase-admin'


export class StorageController implements IStorageController {

  private bucket = admin.storage().bucket()

  async saveJsonFile(args: { CollectionBackup: ICollectionBackup; dateId: string; accountId: string }) {

    try {

      const { CollectionBackup, dateId, accountId } = args
      const path = `firestore-buckups-json/${accountId}/${dateId}.json`
      const file = this.bucket.file(path)
      // const fileData = JSON.stringify(CollectionBackup)

      console.log(path)

      const response = await fetch('https://firebasestorage.googleapis.com/v0/b/copres-firebase.appspot.com/o/firestore-buckups-json%2Ftm0Sg4KS6gf5nqfAn6r2NQn9LdX2%2F2024-03-08T22%3A13%3A41.714Z.json?alt=media&token=4904bc06-59b1-4488-b4fc-269f983985af')
      const fileData = await response.text()

      await file.save(fileData, {
        contentType: 'aplication/json',
        metadata: {
          customElements: {
            accountId,
            createdAt: dateId,
          }
        }
      })

      console.log('file created')

      const storageRef = await file.getSignedUrl({
        expires: Date.now() + (1000 * 60 * 60 * 24 * 30),
        action: "read",
      })
  
      return storageRef[0]
    }
    catch(e: any) {
			console.error('error at saveJsonFile: ' + e?.toString())
			throw new DBError(DBError.CONNECTION)
    }
  }
}
