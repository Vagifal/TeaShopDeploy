require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(fileUpload({
    useTempFiles: true
}));

app.use('/user', require('./routes/userRoute'));
app.use('/category', require('./routes/categoryRoute'));
app.use('/asset', require('./routes/assetRoute'));
app.use('/product', require('./routes/productRoute'));
app.use('/order', require('./routes/orderRoute'));

const url = process.env.MONGODB_URL;
const port = process.env.PORT;
const mongooseParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.set('strictQuery', true);
mongoose.connect(url, mongooseParams, (error) => {
    if (error)
        throw error;
    else
        console.log('Connected to the database')
});

app.listen(port, () => console.log('Server is running on port', port));