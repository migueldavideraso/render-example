import { DBError } from "../../_errors/main";
import { IAccount, IAccountBackupData, IBackupData } from "../domine/models";
import { IDBController } from "../domine/services";

import { firestore as getDB } from 'firebase-admin'


export class DBController implements IDBController {

	private db = getDB()

  async getAccounts(): Promise<IAccount[]> {

    const collection = await (
			this.db
			.collection(`cuentas`)
			.where('email_propietario', '==', 'migueldavided2001@gmail.com')
			// .where('suspendida', '==', false)
			// .where('plan_tipo', 'not-in', ['freemium', 'prueba' ])
			.get()
		)

    const accounts = collection.docs.map(doc => ({ id: doc.id }))

    console.log(accounts[0].id)

		return accounts
  }

  async createAccountBackupData(data: IAccountBackupData) {

		try {

			const { dateId, accountId, backupUrl, date } = data
			const docRef = this.db.doc(`/consola/backups-by-account/${accountId}/${dateId}`)

			await docRef.set({
        date,
				dateId,
				backupUrl,
			}, { merge: true })
		}
		catch (e) {
			console.log(e?.toString ? e.toString() : e)
			throw new DBError(DBError.UNEXPECTED)
		}
  }

  async createBackupData(data: IBackupData) {

		try {
			const docRef = this.db.doc(`/consola/backups-by-account/backups-info/${data.dateId}`)
			await docRef.set(data, { merge: true })
		}
		catch (e) {
			console.log(e?.toString ? e.toString() : e)
			throw new DBError(DBError.UNEXPECTED)
		}
  }
}