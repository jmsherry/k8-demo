const express = require('express');
const app = express();

const {
  PORT=3000,
} = process.env;

app.use(express.static('public'));

app.get('/load-test', (req, res)=>{
  console.log(req.ip);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});