const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const userModel = require('../model/usersdb');
// Data for population

async function populate() {
    // Connect to Database
    const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }

    try {
        let db = mongoose.connect(url, options)

        for (var i = 10000001; i < 10000025; i++) {
            var userData = await userModel.findOne({ userID: i })
            console.log(JSON.stringify(userData));
            userData.password = bcrypt.hashSync(userData.password, saltRounds)
            console.log(userData.password)
            await userModel.findOneAndUpdate({ userID: i }, { password: userData.password })
        }

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

populate()