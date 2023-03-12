const mongoose = require('mongoose')

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 30000,
    })
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log('MongoDB connection error: ', err)
    })
