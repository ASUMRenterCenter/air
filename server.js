const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const path = require("path");
const asyncHandler = require("express-async-handler");
const PORT = process.env.PORT || 3001;

const Airtable = require("airtable");
Airtable.configure({
	endpointUrl: "https://api.airtable.com",
	apiKey: "key68OVjXXeLKQuEl"
});
const base = Airtable.base("app6JuPyfzqD3RZiA");

const getAccounts = async body => {
	let accounts = [];
	console.log("before query");
	await base("organization_accounts")
		.select({
			fields: ["org_acc_id", "org_name", "username", "password"],
			sort: [{ field: "org_acc_id", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			accounts = [...accounts, ...partialRecords];
			fetchNextPage();
		});
	console.log("after", accounts);
	return accounts;
};

const validateUser = (username, password, org_acc_array) => {
	let url = "";
	for (let i = 0; i <= org_acc_array.length; i++) {
		if (i >= org_acc_array.length) {
			url += "/";
			break;
		} else if (
			org_acc_array[i].fields["username"] === username &&
			org_acc_array[i].fields["password"] === password
		) {
			url +=
				"/Organization_Home/" +
				org_acc_array[i].fields["org_name"] +
				"/" +
				org_acc_array[i].fields["org_acc_id"];
			break;
		}
	}
	return url;
};

const locQuery = async string => {
	let locations = [];
	//console.log("before query", string);
	await base("locations")
		.select({
			fields: ["organization", "address", "bulletin_board"],
			sort: [{ field: "organization", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			locations = [...locations, ...partialRecords];
			fetchNextPage();
		});
	//console.log("after query", locations);
	return locations;
};

const findLoc = async (recs, rec_id) => {
	console.log(recs[0].id, rec_id);
	let record = [];
	for (let i = 0; i < recs.length; i++) {
		if (typeof recs[i].fields["organization"] === "undefined") {
			continue;
		}
		if (recs[i].id === rec_id) {
			record = recs[i];
		}
		console.log(recs[i].fields["organization"][0]);
	}
	//console.log("I am here", record);
	//const reco = Promise.all(record);
	//console.log(recoord);
	return record;
};

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

app.post(
	"/login",
	asyncHandler(async (req, res, next) => {
		const { username, password } = req.body;
		const organization_accounts = await getAccounts(req.body);
		const url = validateUser(username, password, organization_accounts);
		res.send(url);
	})
);

app.post(
	"/Events",
	asyncHandler(async (req, res, next) => {
		const rec = Object.keys(req.body);
		console.log("server rec", rec[0]);
		const locations = await locQuery(rec[0]);
		//console.log("after await", locations);
		const location = await findLoc(locations, rec[0]);
		console.log("i am before response", location);
		res.send(location);
	})
);

/* app.post("*", function(req, res) {
	const open = req.body.open;
	console.log("open var: " + open);
	res.send("got it");
}); */

app.listen(PORT, () =>
	console.log(`Express server is running and listening on port ${PORT}`)
);
