require('dotenv').config({ "path": ".env" });
const express = require('express');
const path = require('path');

const cors = require('cors');

// mongoose db connection
require('./api/data/db');

const routes = require('./api/routes');

const app = express();

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors({
//     origin: ['http://localhost:4200/']
// }));
// app.use(cors());

app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use('/api', routes);

const server = app.listen(process.env.PORT, function () {
    console.log("Server is running at port", server.address().port);
});