const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", async (req, res) => {

  const timeStart = new Date().toLocaleString()

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 60_000)
  })

  const timeEnd = new Date().toLocaleString()

  res.json({
    status: 'completed',
    timeStart,
    timeEnd,
  })
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
