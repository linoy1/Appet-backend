const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
require('./db_connection');

const { userRouter } = require('./routers/userRouter');
const { orgRouter } = require('./routers/orgRouter');
//const { dogsRouter } = require('./routers/dogsRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type', 'application/json');
    next();
});

app.use('/api/users', userRouter);
app.use('/api/orgs', orgRouter);
//app.use('/api/dogs', dogsRouter);

// app.use((req, res) => {
//     res.status(400).send('Something is broken!');
// });



app.listen(port, () =>
    console.log(`Express server is running on port ${port}`)
);