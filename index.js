const express = require('express');
const cors = require('cors');
const Connection = require('./database/db');
const routes = require('./routes/route');
const path = require('path')

const app = express();

app.setMaxListeners(15);  
app.use(cors());
app.use(express.urlencoded());
app.use(express.json({ extended: true }));

app.use('/', routes);
app.use(express.static(path.join(__dirname, "./client/build")))

app.use('*', function(_, res) {
    res.sendFile(path.join(__dirname, "/client/build/index.html"), function(err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});


const PORT = 8000;

Connection();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
