const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const path = require("path");

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

/* // Serve our api route /cow that returns a custom talking text cow
app.get("/api/cow/:say", cors(), async (req, res, next) => {
	try {
		const text = req.params.say;
		const moo = cowsay.say({ text });
		res.json({ moo });
	} catch (err) {
		next(err);
	}
});
// Serve our base route that returns a Hello World cow
app.get("/api/cow/", cors(), async (req, res, next) => {
	try {
		const moo = cowsay.say({ text: "Hello World!" });
		res.json({ moo });
	} catch (err) {
		next(err);
	}
});
 */
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(3001, () =>
	console.log("Express server is running and listening on localhost:3001")
);
