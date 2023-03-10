const express = require('express');
const cors = require('cors');
const fs = require('fs');
const errorHandler = require('./middlewares/errorHandller');
const app = express();
require("dotenv").config();
const userRoute = require("./routes/v1/user.routes")

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use('/api/v1/user',userRoute)

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.all("*",(req, res) => {
    res.send('This routes is not found!');
})

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

