const { mongoURI } = require('./config/key');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

//routes
var statisticRouter = require('./routes/statistic');
var championsRouter = require('./routes/champions');

mongoose
  .connect(mongoURI, {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use(cors({ origin: ['http://localhost:3000', 'https://web.postman.co'] }));

app.use('/champions', championsRouter);

app.use('/statistic', statisticRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
