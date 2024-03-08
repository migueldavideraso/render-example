
export interface IBackupData {
  date: Date;
  dateId: string;
  totalAccounts: number;
  failedOperations: number;
  successOperations: number;
}

export interface IAccountBackupData {
  date: Date;
  dateId: string;
  backupUrl: string
  accountId: IAccount['id']
}

export interface IAccount {
  id: string
}

export interface IDocBackup {
  id: string
  data: {
    [key: string]: any
  }
  collections: ICollectionBackup['collections']
}

export interface ICollectionBackup {
  collections: {
    [collectionId: string]: {
      [docId: string]: IDocBackup
    }
  }
}
