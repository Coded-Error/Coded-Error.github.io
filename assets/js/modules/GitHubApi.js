
// Variables
// / Info
const Username = "Coded-Error";
const ApiDomain = "https://api.github.com";

// / API URLs
const repositoryApi = `/users/${Username}/repos`;

// Functions
export default function () {
	console.log({
		"apiDomain": ApiDomain,
		"username": Username,
		"_apis": [
			repositoryApi
		]
	})
}

export async function GetRepositories() {
	let vPromise = new Promise(function (resolve, reject) {
		let end_point = ApiDomain + repositoryApi;
		let HttpRequest = new XMLHttpRequest();

		HttpRequest.open('GET', end_point, true);
		HttpRequest.onload = function () {
			var data = JSON.parse(this.response);
			resolve(data)
		}
		HttpRequest.send()
	});

	return vPromise
}
