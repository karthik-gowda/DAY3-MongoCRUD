const express = require('express');
const { MongoClient } = require('mongodb');
const serverApp = express();
const bodyParser = require('body-parser');
const connectionString = 'mongodb+srv://karthik_3:karthik_3@cluster0.n9bww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

require('./dotenv');


//Using Process.argv[] to the connectionString
//const connectionString = 'mongodb+srv://' + process.argv[2] + ':' + process.argv[3] + '@cluster0.n9bww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//MIDDLE WARE CONFIGS //can also place in connect function
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.set("view engine", "ejs");
serverApp.use(express.static('public'));
serverApp.set("views", "./views")




//MONGO CONNECT
MongoClient.connect(connectionString, (err, client) => {
    console.log("Connected to DB")
        //ERROR HANDLING
    if (err) {
        return console.error(err)
    }
    //RETRIEVE THE DB
    const employeeDB = client.db('employee-data')
    const employeeCollection = employeeDB.collection('employees')


    //\\-----ROUTES-----//\\

    //Read Operation
    serverApp.get('/', (req, res) => {
        employeeDB.collection('employees').find().toArray()
            .then(employees => {
                res.render('info.ejs', { employees: employees })
            })
            .catch(error => { console.error(error) })
    })

    serverApp.get('/employees', (req, res) => {
        employeeDB.collection('employees').find().toArray()
            .then(employees => {
                res.render('index.ejs', { employees: employees })
            })
            .catch(error => { console.error(error) })
    })


    //Making a route to create a user information
    serverApp.post('/createEmployee', (req, res) => {
        //apply promise on this
        employeeCollection.
        insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))

    });

    //Updating the info
    serverApp.put('/updateEmployee', (req, res) => {
        employeeCollection.findOneAndUpdate({
                name: req.body.name,
            }, {
                $set: {
                    name: 'Revanth',
                    id: '1234567890'
                }
            }, {
                upsert: true,
            })
            .then((result) => {
                res.send("Updated the Info");
            })
            .catch((error) => console.error(error));


    })

    //Deleting the Employee data
    serverApp.delete('/deleteEmployee', (req, res) => {
        employeeCollection.deleteOne({ name: req.body.name })
            .then(result => {
                if (result.deleteCount === 0) {
                    return res.send('delete operation failed')
                } else {
                    return res.send('Deleted')
                }
            })
            .catch(error => console.error(error))
    })
})

serverApp.listen(5000, () => {
    console.log('Listening on Port 5000')
});