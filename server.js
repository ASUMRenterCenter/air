const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/")));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

app.post("/login", function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	console.log(username);
	console.log(password);
	res.send("got it");
});

app.listen(PORT, () =>
	console.log(`Express server is running and listening on port ${PORT}`)
);
