
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

export interface JSONBackupData {
  accountInfo: any
  usersInfo: any[]
}


/* import { ElementController } from "../../../_helpers/main";


export interface IThird {
  id: string
  name: string
  contact_email: string
  contact_phone: string
  contact_name: string
  id_num: string
  id_type: string
  person_type: 'Person'|'Company'
  type: 'Customer'|'Supplier'|'Other'
}

export interface IAccountingVouchersTypes {
  id: string|number,
  code: string,
  name: string,
  description: string,
  type: string,
  active: boolean,
  cost_center: boolean,
  cost_center_mandatory: boolean,
  automatic_number: boolean,
  consecutive: number
}

export interface IWarehouse {
  id: string|number,
  name: string,
  active: boolean,
  has_movements: boolean,
}

export interface ICostCenter {
  id: string|number,
  code: string,
  name: string,
  active: boolean,
}

export interface IAccount {
  code: string
  name: string
}

export class Third extends ElementController<IThird> {}

export class AccountingVouchersTypes extends ElementController<IAccountingVouchersTypes> {}

export class Warehouse extends ElementController<IWarehouse> {}

export class CostCenter extends ElementController<ICostCenter> {}

export class Account extends ElementController<IAccount> {}

export type TModels = IThird | IAccountingVouchersTypes | IWarehouse | ICostCenter | IAccount
export type TModelsSquare = IThird[] | IAccountingVouchersTypes[] | IWarehouse[] | ICostCenter[] | IAccount[]
 */