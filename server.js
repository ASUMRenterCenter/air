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

const orgQuery = async string => {
	let organizations = [];
	//console.log("before query", string);
	await base("organizations")
		.select({
			fields: ["name", "email", "url", "locations", "phones", "isNotListed", "bulletin_board"],
			sort: [{ field: "name", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			organizations = [...organizations, ...partialRecords];
			fetchNextPage();
		});
	//console.log("after query", locations);
	return organizations;
};

const servQuery = async () => {
	let services = [];
	//console.log("before query", string);
	await base("services")
		.select({
			fields: ["Organization"],
			sort: [{ field: "Organization", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			services = [...services, ...partialRecords];
			fetchNextPage();
		});
	//console.log("after query", locations);
	return services;
}

const findRec= async (recs, rec_id, fieldName) => {
	let record = [];
	for (let i = 0; i < recs.length; i++) {
		if (typeof recs[i].fields[fieldName] === "undefined") {
			continue;
		}
		if (recs[i].id === rec_id) {
			record = recs[i];
		}
		//console.log(recs[i].fields[fieldName][0]);
	}
	//console.log("I am here", record);
	//const reco = Promise.all(record);
	//console.log(recoord);
	return record;
};

const taxQuery = async () => {
	let taxonomies = [];
	//console.log("before query", string);
	await base("taxonomy")
		.select({
			fields: ["name", "services 2"],
			sort: [{ field: "name", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			taxonomies = [...taxonomies, ...partialRecords];
			fetchNextPage();
		});
	//console.log("after query", locations);
	return taxonomies;
};


const locQuery = async string => {
	let locations = [];
	//console.log("before query", string);
	await base("locations")
		.select({
			fields: ["address"],
			sort: [{ field: "organization", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			locations = [...locations, ...partialRecords];
			fetchNextPage();
		});
	//console.log("after query", locations);
	return locations;
};
const phoneQuery = async string => {
	let phones = [];
	//console.log("before query", string);
	await base("phones")
		.select({
			fields: ["number"],
			sort: [{ field: "number", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			phones = [...phones, ...partialRecords];
			fetchNextPage();
		});
	//console.log("after query", locations);
	console.log("Got to Phones");
	return phones;
};

const addrQuery = async string => {
	let addresses = [];
	//console.log("before query", string);
	await base("address")
		.select({
			fields: ["address_1", "city", "State", "Zip Code"],
			sort: [{ field: "address_1", direction: "asc" }]
		})
		.eachPage((partialRecords, fetchNextPage) => {
			addresses = [...addresses, ...partialRecords];
			fetchNextPage();
		});
	//console.log("after query", locations);
	return addresses;
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
		// console.log(req);
		const rec = Object.keys(req.body);
		// console.log("server rec", rec[0]);
		const organizations = await orgQuery(rec[0]);
		// console.log(organizations[0]);
		// const locations = await locQuery(rec[0]);
		//console.log("after await", locations);
		const organization = await findRec(organizations, rec[0], "name");
		// const location = await findLoc(locations, rec[0]);
		Promise.all(organizations, organization);
		// console.log("i am before response", organization);
		// res.send(location);
		res.send(organization)
	})
);

app.post(
	"/SurveyResults/*",
	asyncHandler(async (req, res, next) => {
		const tax_ids = req.body;
		let taxons = [];
		let servs_ids = [];
		const taxonomies = await taxQuery();
		const services = await servQuery();
		const organizations = await orgQuery();
		const phones = await phoneQuery();
		const locations = await locQuery();
		const addresses = await addrQuery();
		const promise = await tax_ids.map(async (id, index) => {
			let taxonomy = await findRec(taxonomies, id, "name");
			servs_ids = [...servs_ids, taxonomy.fields['services 2']];
			taxons= [...taxons, taxonomy.fields['name']];
			return taxons;
		});

		Promise.all(promise);
		console.log("got past taxons");
		let orgs_ids = [];
		for(let i = 0; i < servs_ids.length; i++){
			let orgsinner = [];
			if(servs_ids[i] === undefined){
				orgs_ids =[...orgs_ids, null];
			}
			else{
				let promise2 = await servs_ids[i].map(async (serv_id, index)=>{
					let service = await findRec(services, serv_id, "Organization");
					orgsinner = [...orgsinner, service.fields['Organization'][0]];
				});
				orgs_ids = [...orgs_ids, orgsinner];
				Promise.all(promise2);
			}
			
		}
		console.log("got past orgs");

		let orgs = [];
		let loc_ids = [];
		let phone_ids = [];
		for(let i = 0; i < orgs_ids.length; i++){
			let orgsinner = [];
			let locinner = [];
			let phoneinner = [];
			if(orgs_ids[i] === null){
				orgs =[...orgs, null];
				loc_ids = [...loc_ids, null];
				phone_ids = [...phone_ids, null];
			}
			else{
				let promise2 = await orgs_ids[i].map(async (org_id, index)=>{
					
					let organization = await findRec(organizations, org_id, "name");
					if(organization.fields['isNotListed'] === 0){
						orgsinner = [...orgsinner, organization];
						locinner= [...locinner, organization.fields['locations'][0]];
						phoneinner = [...phoneinner, organization.fields['phones'][0]];
					}
					
				});
				orgs = [...orgs, orgsinner];
				loc_ids = [...loc_ids, locinner];
				phone_ids= [...phone_ids, phoneinner];
				Promise.all(promise2);
			}
			
		}
		console.log("got past loc and org");

		let phone_nums = [];
		let addr_ids = [];
		for(let i = 0; i < phone_ids.length; i++){
			let locinner = [];
			let phoneinner = [];
			if(phone_ids[i] === null){
				phone_nums =[...phone_nums, null];
			}
			else{
				let promise2 = await phone_ids[i].map(async (phone_id, index)=>{
					let phone = await findRec(phones, phone_id, "number");
					phoneinner = [...phoneinner, phone.fields['number']];
				});
				phone_nums= [...phone_nums, phoneinner];
				Promise.all(promise2);
			}
			if(loc_ids[i] === null){
				addr_ids =[...addr_ids, null];
			}
			else{
				let promise3 = await loc_ids[i].map(async (loc_id, index)=>{
					let location = await findRec(locations, loc_id, 'address');
					locinner= [...locinner, location.fields['address'][0]];
				})
				addr_ids = [...addr_ids, locinner];
				
				Promise.all(promise3);
			}
			
			
		}
		console.log("got past phone and addrs");

		let addrs = [];
		for(let i = 0; i < addr_ids.length; i++){
			let addrinner = [];
			if(addr_ids[i] === null){
				addrs =[...addrs, null];
			}
			else{
				let promise2 = await addr_ids[i].map(async (addr_id, index)=>{
					let address = await findRec(addresses, addr_id, "address_1");
					addrinner = [...addrinner, address];
				});
				addrs = [...addrs, addrinner];
				Promise.all(promise2);
			}
			
		}
		console.log("got past addr");


		const all_info = [taxons, orgs, phone_nums, addrs];

		res.send(all_info);

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
