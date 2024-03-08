import { DBError } from "../../_errors/main";
import type { JSONBackupData } from "../domine/models";
import type { IStorageController } from "../domine/services";
import admin from 'firebase-admin'


export class StorageController implements IStorageController {

  private bucket = admin.storage().bucket()

  async saveJsonFile(args: { JSONBackupData: JSONBackupData; dateId: string; accountId: string }) {

    try {

      const { JSONBackupData, dateId, accountId } = args
      const path = `firestore-buckups-json/${accountId}/${dateId}.json`
      const file = this.bucket.file(path)

      console.log(path)

      await file.save(JSON.stringify(JSONBackupData), {
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
