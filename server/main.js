const {mongoURI} = require('./config/key');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const {Test} = require('./models/Test');
const {Champion} = require('./models/Champion');
const port = 3001;
const cors = require('cors');

mongoose.connect(mongoURI,{
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.use(cors({ origin: ["http://localhost:3000", "https://web.postman.co"]}));
app.get('/', (req, res) => {
    var test1 = new Test({name:"lee", age:10});
    test1.save((err, doc) => {
        if(err) return res.json({success:false, err});
        return res.status(200).json({
            success:true,
            test:'good',
        })
    })
})

app.get('/champions/all', (req, res) => {
    // qeury로 조회, 찾을 field, 연산자 모두 문자열 형식으로 입력해야됨
    Champion.find((err, docs) => {
        if(err) return res.json({success:false, err})
        console.log(docs.length);
        res.status(200).json({
            success:true,
            list:docs,
        });
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });