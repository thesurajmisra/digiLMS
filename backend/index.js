const express = require('express');
const app = express();

const port = require('./config').port;

const userRouter = require('./routers/userManager');
const utilRouter = require('./routers/util');
const courseRouter = require('./routers/courseManager');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/util', utilRouter);
app.use('/course', courseRouter);

app.use(express.static('./uploads/'))

app.get('/home', (req, res) => {
    res.send("Welcome Home");
})

app.listen(port, () => {
    console.log('server started at port 5000')
})