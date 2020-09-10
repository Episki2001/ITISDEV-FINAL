const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userModel = require('../model/usersdb');
// Data for population
let userData = [
    [{
            "userID": 10000001,
            "password": "HzNnuoba0",
            "lastName": "Bool",
            "firstName": "Maribel",
            "gender": "F",
            "birthdate": "07/10/1980",
            "address": "Lucena City",
            "phoneNumber": '9176588231',
            "dateHired": "07/27/2000",
            "dateFired": null
        },
        {
            "userID": 10000002,
            "password": "MESLi8zQh7tK",
            "lastName": "Bool",
            "firstName": "John",
            "gender": "M",
            "birthdate": "10/23/1983",
            "address": "Lucena City",
            "phoneNumber": '9179166663',
            "dateHired": "10/17/2000",
            "dateFired": null
        },
        {
            "userID": 10000003,
            "password": "4xhm1S",
            "lastName": "Jackie",
            "firstName": "Romonda",
            "gender": "F",
            "birthdate": "07/08/1995",
            "address": "Lucban City",
            "phoneNumber": '9179751234',
            "dateHired": "09/14/2016",
            "dateFired": null
        },
        {
            "userID": 10000004,
            "password": "9JXKOhre",
            "lastName": "Ballmark",
            "firstName": "Valentin",
            "gender": "M",
            "birthdate": "10/26/1990",
            "address": "Tagbilao City",
            "phoneNumber": '9174613405',
            "dateHired": "04/15/2020",
            "dateFired": null
        },
        {
            "userID": 10000005,
            "password": "HzNnuoba0",
            "lastName": "Hablet",
            "firstName": "Randie",
            "gender": "M",
            "birthdate": "01/27/1991",
            "address": "Lucban City",
            "phoneNumber": '9176588236',
            "dateHired": "07/27/2015",
            "dateFired": null
        },
        {
            "userID": 10000006,
            "password": "MESLi8zQh7tK",
            "lastName": "Houtby",
            "firstName": "Lidia",
            "gender": "F",
            "birthdate": "03/14/1988",
            "address": "Tayabas City",
            "phoneNumber": '9179166666',
            "dateHired": "10/17/2017",
            "dateFired": null
        },
        {
            "userID": 10000007,
            "password": "4xhm1S",
            "lastName": "Mackie",
            "firstName": "Romonda",
            "gender": "F",
            "birthdate": "07/08/1995",
            "address": "Lucban City",
            "phoneNumber": '9179751231',
            "dateHired": "09/19/2016",
            "dateFired": null
        },
        {
            "userID": 10000008,
            "password": "9JXKOhre",
            "lastName": "Allmark",
            "firstName": "Valentin",
            "gender": "M",
            "birthdate": "10/26/1990",
            "address": "Tagbilao City",
            "phoneNumber": '9174613409',
            "dateHired": "04/15/2020",
            "dateFired": null
        },
        {
            "userID": 10000009,
            "password": "rF1W7ty2gwO",
            "lastName": "Storrie",
            "firstName": "Josie",
            "gender": "F",
            "birthdate": "04/27/1989",
            "address": "Lucban City",
            "phoneNumber": '9172746921',
            "dateHired": "07/25/2018",
            "dateFired": null
        },
        {
            "userID": 10000010,
            "password": "1ihCo9zh9W",
            "lastName": "Newlands",
            "firstName": "Addison",
            "gender": "M",
            "birthdate": "02/27/1995",
            "address": "Lucban City",
            "phoneNumber": '9179296788',
            "dateHired": "01/04/2018",
            "dateFired": null
        },
        {
            "userID": 10000011,
            "password": "x0Zbwpz",
            "lastName": "Aloigi",
            "firstName": "Andrea",
            "gender": "F",
            "birthdate": "11/24/1985",
            "address": "Tagbilao City",
            "phoneNumber": '9171947151',
            "dateHired": "02/03/2016",
            "dateFired": null
        },
        {
            "userID": 10000012,
            "password": "rCTO7QDuEa",
            "lastName": "Goodright",
            "firstName": "Annabell",
            "gender": "F",
            "birthdate": "05/28/1993",
            "address": "Lucban City",
            "phoneNumber": '9176945841',
            "dateHired": "05/23/2018",
            "dateFired": null
        },
        {
            "userID": 10000013,
            "password": "Xlnf7Zeo",
            "lastName": "Ferrucci",
            "firstName": "April",
            "gender": "F",
            "birthdate": "02/01/1990",
            "address": "Lucena City",
            "phoneNumber": '9173187003',
            "dateHired": "09/01/2015",
            "dateFired": null
        },
        {
            "userID": 10000014,
            "password": "0ucC3RqPGSA9",
            "lastName": "Trayford",
            "firstName": "Ardenia",
            "gender": "F",
            "birthdate": "09/07/1993",
            "address": "Lucena City",
            "phoneNumber": '9174630076',
            "dateHired": "10/17/2019",
            "dateFired": null
        },
        {
            "userID": 10000015,
            "password": "kUzkEj8",
            "lastName": "Adenet",
            "firstName": "Marjorie",
            "gender": "F",
            "birthdate": "09/06/1986",
            "address": "Tayabas City",
            "phoneNumber": '9179740162',
            "dateHired": "09/20/2019",
            "dateFired": null
        },
        {
            "userID": 10000016,
            "password": "xktNTtg",
            "lastName": "Petrie",
            "firstName": "Sidonia",
            "gender": "F",
            "birthdate": "03/29/1995",
            "address": "Tagbilao City",
            "phoneNumber": '9174905050',
            "dateHired": "10/08/2019",
            "dateFired": null
        },
        {
            "userID": 10000017,
            "password": "fzhvS5VWxG",
            "lastName": "Scadding",
            "firstName": "Cicely",
            "gender": "F",
            "birthdate": "04/15/1989",
            "address": "Lucban City",
            "phoneNumber": '9177498945',
            "dateHired": "12/11/2016",
            "dateFired": null
        },
        {
            "userID": 10000018,
            "password": "Zpqcl3O",
            "lastName": "Arnoult",
            "firstName": "Elvira",
            "gender": "F",
            "birthdate": "03/20/1986",
            "address": "Lucena City",
            "phoneNumber": '9176235686',
            "dateHired": "01/14/2020",
            "dateFired": null
        },
        {
            "userID": 10000019,
            "password": "s7LOBCN",
            "lastName": "Robrose",
            "firstName": "Arlette",
            "gender": "F",
            "birthdate": "06/30/1994",
            "address": "Tayabas City",
            "phoneNumber": '9171849934',
            "dateHired": "05/20/2019",
            "dateFired": null
        },
        {
            "userID": 10000020,
            "password": "ycy1ckw",
            "lastName": "Prevost",
            "firstName": "Inger",
            "gender": "M",
            "birthdate": "02/25/1989",
            "address": "Tagbilao City",
            "phoneNumber": '9176092169',
            "dateHired": "12/03/2015",
            "dateFired": null
        },
        {
            "userID": 10000021,
            "password": "FpKS3ulO5",
            "lastName": "Alexandrescu",
            "firstName": "Lorette",
            "gender": "F",
            "birthdate": "01/15/1995",
            "address": "Tagbilao City",
            "phoneNumber": '9177956864',
            "dateHired": "03/10/2015",
            "dateFired": null
        },
        {
            "userID": 10000022,
            "password": "oAw0fiK0jH",
            "lastName": "Snoxell",
            "firstName": "Olly",
            "gender": "M",
            "birthdate": "02/27/1987",
            "address": "Lucban City",
            "phoneNumber": '9170949968',
            "dateHired": "09/15/2019",
            "dateFired": null
        },
        {
            "userID": 10000023,
            "password": "5740Fs3CI",
            "lastName": "Tuffrey",
            "firstName": "Katrinka",
            "gender": "F",
            "birthdate": "10/22/1990",
            "address": "Tayabas City",
            "phoneNumber": '9179709497',
            "dateHired": "11/06/2015",
            "dateFired": null
        },
        {
            "userID": 10000024,
            "password": "s0GuucuQjyh",
            "lastName": "Mea",
            "firstName": "Brenden",
            "gender": "M",
            "birthdate": "11/09/1993",
            "address": "Tagbilao City",
            "phoneNumber": '9174484593',
            "dateHired": "09/23/2016",
            "dateFired": null
        }
    ]
]
async function populate(userData) {
    // Connect to Database
    const url = 'mongodb+srv://admin:admin@itisdev.uy0ui.mongodb.net/LovelyHomes?retryWrites=true&w=majority'
    const options = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }

    try {
        let db = mongoose.connect(url, options)
        await userModel.deleteMany({})

        // userData.forEach((user) => {
        //     // user.password = bcrypt.hashSync(user.password, 10)
        //     user.phoneNumber = user.phoneNumber.toString()
        // })

        await userModel.insertMany(userData)

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

populate(userData)