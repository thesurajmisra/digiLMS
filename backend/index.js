const express = require('express');
const app = express();

const port = require('./config').port;
const stripe_sk = require('./config').stripe_sk;
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

const stripe = require("stripe")(stripe_sk);

app.post("/create-payment-intent", async (req, res) => {
    const data = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: data.amount,
        currency: 'inr'
    });
    res.status(200).json(paymentIntent);
});

app.get('/home', (req, res) => {
    res.send("Welcome Home");
})

app.listen(port, () => {
    console.log('server started at port 5000')
})