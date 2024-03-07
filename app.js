const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", async (req, res) => {

  const timeStart = new Date().toLocaleString()

  console.log(timeStart)

  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(), getMinutes(10))
  })

  const timeEnd = new Date().toLocaleString()

  console.log(timeEnd)

  res.json({
    status: 'completed',
    timeStart,
    timeEnd,
  })
});


function getMinutes (minutes) {
  return 1_000 * 60 * minutes
}

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
