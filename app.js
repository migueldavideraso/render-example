const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/create-backup", async (req, res) => {

  const timeStart = new Date().toLocaleString()

  console.log('timeStart', timeStart)

  const minutes = [ 0, 1/* , 2, 3, 4, 5, 6, 7, 8, 9, 10  */]

  await Promise.all(minutes.map(async (min) => {
    const time = getMinutes(min)
    await timeOut(time)

    console.log('time: ' + time)
    console.log('date: ' + new Date().toLocaleString())
  }))

  const timeEnd = new Date().toLocaleString()

  console.log('timeEnd', timeEnd)

  res.json({
    status: 'completed',
    timeStart,
    timeEnd,
  })
});


function getMinutes (minutes) {
  return 1_000 * 60 * minutes
}


function timeOut (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time)
  })
}



const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
