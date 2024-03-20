import { DBError } from "../../_errors/main";
import type { ICollectionBackup } from "../domine/models";
import type { IStorageController } from "../domine/services";
import admin from 'firebase-admin'
import fs from 'fs';


export class StorageController implements IStorageController {

  private bucket = admin.storage().bucket()

  async saveJsonFile(args: { CollectionBackup: ICollectionBackup; dateId: string; accountId: string }) {

    try {

      const { CollectionBackup, dateId, accountId } = args
      const path = `firestore-buckups-json/${accountId}/${dateId}.json`
      const file = this.bucket.file(path)
      // const fileData = JSON.stringify(CollectionBackup)

      console.log(path)

      const fileData = fs.readFileSync('../backup.json', 'utf8');

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
