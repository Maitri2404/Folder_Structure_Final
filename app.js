const express = require('express');
const bodyparser=require('body-parser');
require('dotenv').config();
const {routerV1}=require('./routes/handleRoutesV1');
const {routerV2}=require('./routes/handleRoutesV2');

const app = express();
app.use(bodyparser.json());
app.use(routerV1);
app.use(routerV2);


app.all("*", (req, res) => {
  return res.json({Error:"Route not found"})
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
