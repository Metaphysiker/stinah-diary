const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/stinah-diary/index.html');
})

app.use(express.static(__dirname + '/dist/stinah-diary'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
