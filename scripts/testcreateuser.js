const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userModel = require('../model/usersdb');
const managerModel = require('../model/managersdb');
// testing out variables for creation
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
        var hireDate = new Date;
        var birthdate = new Date("2019-05-14");
        var password = "lol";
        var confirm = "lol2";
        var firstName = "Andre";
        var lastname = "Garcia";
        var gender = "M";
        var phonenumber = "09178311218";
        var address = "Quezon City";
        var dateFired = new Date("2021-12-12");
        var highestID = await userModel.aggregate([{
            '$sort': {
                'userID': -1
            }
        }, {
            '$limit': 1
        }, {
            '$project': {
                'userID': 1
            }
        }]);
        var userID = highestID[0].userID + 1;
        password = bcrypt.hashSync(userData.password, saltRounds)
        var create = await userModel.create({ userID: userID, password })

        console.log(userID)
        console.log(birthdate);
        console.log(hireDate);
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