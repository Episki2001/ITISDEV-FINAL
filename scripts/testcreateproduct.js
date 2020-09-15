const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const productModel = require('../model/productdb');
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
        var confirm = "lol";
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
        if (confirm == password) {
            password = bcrypt.hashSync(password, 10)
            var create = await userModel.create({
                userID: userID,
                password: password,
                lastName: lastname,
                firstName: firstName,
                gender: gender,
                phonenumber: phonenumber,
                address: address,
                dateFired: dateFired,
                dateHired: hireDate,
                birthdate: birthdate
            });
        } else console.log('passwords do not match');

        console.log(create);
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