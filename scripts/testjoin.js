const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userModel = require('../model/usersdb');
const managerModel = require('../model/managersdb');
// Data for population

async function join() {
    // Connect to Database
    // const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    // const options = {
    //     useUnifiedTopology: true,
    //     useNewUrlParser: true,
    //     useCreateIndex: true
    // }

    try {
        var match = await managerModel.aggregate([{
            '$lookup': {
                'from': 'users',
                'localField': 'userID',
                'foreignField': 'userID',
                'as': 'string'
            }
        }, {
            '$unwind': {
                'path': '$string'
            }
        }, {
            '$project': {
                'userID': 1,
                'isSysAd': 1,
                'firstName': '$string.firstName',
                'lastName': '$string.lastName',
                'phoneNumber': '$string.phoneNumber'
            }
        }])
        console.log(JSON.stringify(match))
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

join()