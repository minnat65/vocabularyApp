const mongoose = require('mongoose');
//require environment variable (npm)
const dotenv = require('dotenv');
//including environment file
dotenv.config({ path: './config.env' });


//REPLACE the password as database_password.
const DB= process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


//connect Mongoose and it returns a Promise
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con=>{
    console.log('DB connection successful');
}).catch((err) => {
    res.status(200).json({
        status: 'Failed',
        message: 'something went wrong.'
    });
});

const app= require('./app');

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static("./client/build"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('App is running at ',port);
});