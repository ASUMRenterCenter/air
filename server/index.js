const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

app.post("/login", function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	console.log(username);
	console.log(password);
	res.send("got it");
});

app.listen(3001, () =>
	console.log("Express server is running and listening on localhost:3001")
);
