const { mongoURI } = require('./config/key');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = 3001;
const cors = require('cors');

//routes
var statisticRouter = require('./routes/statistic');
var championsRouter = require('./routes/champions');
var runeRouter = require('./routes/rune');
var commentRouter = require('./routes/comments');

mongoose
    .connect(mongoURI, {
        // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

// cors
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://web.postman.co',
            '172.18.0.3',
            '172.18.0.2',
        ],
    })
);

// application/x-www-form-urlencoded 로 생긴것을 분석가능하게 해주는 코드
app.use(express.urlencoded({ extended: true }));
//application/json 을 분석 가능하게
app.use(express.json());

app.use('/champions', championsRouter);
app.use('/statistic', statisticRouter);
app.use('/rune', runeRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
