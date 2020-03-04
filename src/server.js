/* const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(cors());

app.get("/login", (req, res) => {
	const name = req.query.name || "World";
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3000, () =>
	console.log("Express server is running on localhost:3001")
);
 */
