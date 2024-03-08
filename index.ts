import { config as configEnvVars } from "dotenv";
import { initDb } from "./_shared/infraestructure/db";
import { startServer } from "./_shared/infraestructure/server";

configEnvVars();

initDb()
startServer()
