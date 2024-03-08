import { Result } from "../../_result/main";
import { type TResult } from "../../_result/type";
import { type IAccount, type IAccountBackupData, type IBackupData } from "../domine/models"
import { type IAuthController, type IBackupController, type ICreateAccountsBackup, type IDBController, type IStorageController } from "../domine/services"


export class CreateAccountsBackup implements ICreateAccountsBackup {

  private accounts: IAccount[] = []
  private dateId: string = ''
  private date: Date = new Date()

  constructor(
    private backupController: IBackupController,
    private storageController: IStorageController,
    private dBController: IDBController,
    // private AuthController: IAuthController
  ){}

  async createBackups () {

    try {

      this.date = new Date()
      this.dateId = this.date.toISOString();
      this.accounts = await this.dBController.getAccounts()
      
      const backupData: IBackupData = {
        date: this.date,
        dateId: this.dateId,
        failedOperations: 0,
        successOperations: 0,
        totalAccounts: this.accounts.length,
      }

      await Promise.all(this.accounts.map(async account => {
        const result = await this.createAccountBackup(account.id)

        if (result.status === 'success') {
          backupData.successOperations++
        }
        else {
          backupData.failedOperations++
        }
      }))

      await this.createBackupData(backupData)
      return Result.success(backupData)
    }
    catch(e) {
      console.error(e)
      throw new Error('')
    }
  }

  private async createAccountBackup (accountId: string): Promise<TResult<IAccountBackupData>> {

    try {

      const CollectionBackup = await this.backupController.createAccountBackup(accountId)

      console.log('CollectionBackup')

      const backupUrl = await this.storageController.saveJsonFile({
        accountId,
        CollectionBackup,
        dateId: this.dateId,
      })

      console.log(backupUrl)

      if (backupUrl === null) {
        return Result.error('Error at create backup with account: ' + accountId)
      }
  
      return Result.success<IAccountBackupData>({
        dateId: this.dateId,
        backupUrl,
        accountId,
        date: this.date,
      })
    }
    catch(e) {
      return Result.error('Error at create backup with account: ' + accountId)
    }
  }

  private async createBackupData (data: IBackupData) {
    await this.dBController.createBackupData(data)
  }

}


