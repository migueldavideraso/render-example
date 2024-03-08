
import express from 'express';
import accountsBackupRouter from '../../accounts-backup/infraestructure/main';

export function startServer () {

  const app = express();
  const port = process.env.PORT || 3001;
  const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  
  app.use('/accounts-backup', accountsBackupRouter);

  // server.keepAliveTimeout = 1000 * 60 * 60 * 24
  // server.headersTimeout = 1000 * 60 * 60 * 24
}

