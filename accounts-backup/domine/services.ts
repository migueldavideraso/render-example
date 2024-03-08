import { TResult } from "../../_result/type"
import { IAccount, IAccountBackupData, IBackupData, ICollectionBackup } from "./models"




export interface IBackupController {
  createAccountBackup (accountId: string): Promise<ICollectionBackup>
}

export interface IStorageController {
  saveJsonFile(args: {
    CollectionBackup: ICollectionBackup
    dateId: string
    accountId: string
  }): Promise<string|null>
}

export interface IDBController {
  getAccounts(): Promise<IAccount[]>
  createBackupData(data: IBackupData): Promise<void>
  createAccountBackupData(data: IAccountBackupData): Promise<void>
}

export interface IAuthController {

}

export interface ICreateAccountsBackup {
  createBackups(): Promise<TResult<IBackupData>>
}

