// Variables
/// Info
const username = "Coded-Error";
/// Links
const mainDomain = "https://api.github.com";
const repositories = `/users/${username}/repos`;

// Functions
export default function () {
	console.log({
		"domain": mainDomain,
		"username": username,
		"__apis": [
			repositories
		]
	})
}

// Get Repositories
export async function GetRepositories() {
	let v = new Promise(function (reslove) {
		let endPoint = mainDomain + repositories;
		let req = new XMLHttpRequest();

		req.open('GET', endPoint, true) // Open a new Connection, where the first parameter is the method to use and the second paramter is the website to call
		req.onload = function () {
			var data = JSON.parse(this.response);
			reslove(data)
		}
		req.send()
	})
	return v
}
