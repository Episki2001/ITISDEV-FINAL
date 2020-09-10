const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userModel = require('../model/usersdb');
// Data for population

async function populate(username, password) {
    // Connect to Database
    // const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    // const options = {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true,
    //     useCreateIndex: true
    // }

    try {
        var user = await userModel.find({ userID: 10000001 })
        console.log(JSON.parse(JSON.stringify(user)));
        console.log(user.password == 'hello')
        console.log('Database populated \\o/')
    } catch (err) {
        throw err
    } finally {
        mongoose.connection.close(() => {
            console.log('Disconnected from MongoDB, bye o/')
            process.exit(0)
        })
    }
}

populate(10, 'hello')