import type { JSONBackupData } from "../domine/models";
import type { IBackupController } from "../domine/services";
import { DBError } from "../../_errors/main";
import { backup, backupFromDoc, initializeFirebaseApp } from "firestore-export-import";

import { firestore as getDB } from 'firebase-admin'


export class BackupController implements IBackupController {

	private db = getDB()

  async createAccountBackup (accountId: string) {

		try {
			initializeFirebaseApp(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}'), '[DEFAULT]')
		}
		catch (e: any) {
			console.error('Error at initializeFirebaseApp in createAccountBackup: ' + e?.toString())
			throw new DBError(DBError.CONNECTION)
		}

    try {

      const accountResult: any = await backupFromDoc(this.db, 'cuentas', accountId)
      const accountInfo = accountResult.cuentas[accountId]
      const usersResult: any = await backup(this.db, 'usuarios', {
        queryCollection: (collectionRef) => collectionRef.where('id_cuenta', '==', accountId).get()
      })
  
      const usersData = usersResult.usuarios
      const jsonData: JSONBackupData = {
        accountInfo,
        usersInfo: Object.values(usersData).map((user: any) => {
          delete user.subCollection
          return user
        })
      }
  
      return jsonData
    }
    catch(e: any) {
			console.error('Error at createAccountBackup: ' + e?.toString())
			throw new DBError(DBError.UNEXPECTED)
    }
  }

}

