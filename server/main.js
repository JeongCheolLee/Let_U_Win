const express = require('express') // express 모듈 가져옴
const app = express(); // 새로운 express 앱을 만듬
const port = 5000; // 포트 설정
const { mongoURI } = require('./config/key'); // mongoURI 가져오기

const mongoose = require('mongoose'); // 몽고DB 모듈 가져옴
mongoose.connect(mongoURI, {

}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));
