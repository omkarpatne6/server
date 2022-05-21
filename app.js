const compression = require('compression');
const express = require('express');
require('./conn.js');
const app = express();
app.use(compression());
const port = process.env.PORT || 8000;
const cors = require("cors");
const Mydatabase = require('./model.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/timepass", (req, res) => {

    try {

        const { name, email, description } = req.body;

        if (!name || !email) {

            res.status(400).send("Error: Please enter all fields");

        } else {
            const omkar = new Mydatabase({
                name,
                email,
                slug: name.split(' ').join('-').replace(/[,*+~.()'"!:@]/g, '').toLowerCase(),
                description,
                date : Date(),
                datestring :  new Date().toDateString() + " " + new Date().toLocaleTimeString()
            });

            Mydatabase.findOne({ email: email })
                .then((response) => {
                    if (response) {
                        res.status(400).send("Error: Data already exists in the database");

                        return;
                    } else {
                        omkar.save().then(() => {
                            res.status(201).send("Data submitted successfully");

                        }).catch((error) => {
                            res.status(400).send(`${error.name} : ${error.message}`);
                        });

                        return;

                    }
                }).catch((error) => {
                    res.status(400).json({ error: error });
                })
        }

    } catch (error) {
        res.status(400).json({ error: error });
    }
})

app.get('/fetchdata', async (req, res) => { 

    try {
        const showdata = await Mydatabase.find();
        res.send(showdata)
    } catch (error) {
        res.send(error)
    }
})

app.get('/recentposts', async (req, res) => { 

    try {
        const showdata = await Mydatabase.find().limit(3).sort({date : -1});
        res.send(showdata)
    } catch (error) {
        res.send(error)
    }
})

app.get('/getinfo/:slug', async (req, res) => {

    try {
        const showdata = await Mydatabase.findOne({ slug: req.params.slug });
        res.send(showdata)
    } catch (error) {
        res.send(error)
    }
})

app.get('/', (req, res) => {
    res.send("Hello, this is a home page")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})