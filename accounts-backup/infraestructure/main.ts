import { Router } from "express";
import { CreateAccountsBackup } from "../application/main";
import { BackupController } from "./backup";
import { DBController } from "./db_controller";
import { StorageController } from "./storage";

const router = Router();


router.get("/create", async (req, res) => {

  const backupController = new BackupController()
  const dBController = new DBController()
  const storageController = new StorageController()
  const createAccountsBackup = new CreateAccountsBackup(backupController, storageController, dBController)

  const response = await createAccountsBackup.createBackups()

  res.json(response)
});


export default router