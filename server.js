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
	await base("organization_accounts")
		.select({
			fields: ["org_acc_id", "org_name", "username", "password"],
			sort: [{ field: "org_acc_id", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			accounts = [...accounts, ...partialRecords];
			fetchNextPage();
		});
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

app.post("*", function(req, res) {
	const open = req.body.open;
	console.log("open var: " + open);
	res.send("got it");
});

app.listen(PORT, () =>
	console.log(`Express server is running and listening on port ${PORT}`)
);
