import { TResult } from "../../_result/type"
import { IAccount, IAccountBackupData, IBackupData, JSONBackupData } from "./models"




export interface IBackupController {
  createAccountBackup (accountId: string): Promise<JSONBackupData>
}

export interface IStorageController {
  saveJsonFile(args: {
    JSONBackupData: JSONBackupData
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

