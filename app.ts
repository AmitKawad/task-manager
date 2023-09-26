import express from 'express';
import config from 'config';
const app = express();
const port = config.get('port')as number;

import connect from './db/connect'
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connect();
})