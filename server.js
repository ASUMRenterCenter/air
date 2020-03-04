const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 3001;

const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'key68OVjXXeLKQuEl'
});
const base = Airtable.base('app6JuPyfzqD3RZiA');




const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client/build")));

// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.post("/login", async function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	var queryDone = false;
	var organization_accounts = [];
	await base('organization_accounts').select({
		fields: ["org_acc_id", "org_name", "username", "password"],
		sort: [{ field: "org_acc_id", direction: "asc" }]
	}).eachPage(function page(records, fetchNextPage) {
		// This function (`page`) will get called for each page of records.
		records.forEach(function(record) {
			//console.log('Retrieved', record.get('username'), record.get('password'));
			organization_accounts.push(record);
			//console.log(organization_accounts);
		});
		
		// To fetch the next page of records, call `fetchNextPage`.
		// If there are more records, `page` will get called again.
		// If there are no more records, `done` will get called.
		fetchNextPage();

	}, function done(err) {
		console.log("I'm in done");
		queryDone = true;
		if (err) { 
			console.error(err); 
		}
		return;
	});

	console.log(username);
	console.log(password);
	console.log(organization_accounts);
	await res.send(organization_accounts);
});

app.listen(PORT, () =>
	console.log(`Express server is running and listening on port ${PORT}`)
);
