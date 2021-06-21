// Modules
import * as GitHub from './GitHubApis.js';

// Functions
function FillRepositories() {
	GitHub.GetRepositories()
		.then(data => {
			var html = "";

			// Each Repository selection is formatted as follows:
			// <div class="repo">
			//     <a class="name">Repository Name</a>
			//     <p>Repository Description</p>
			// </div>
			$.each(data, function (i, v) {
				var _id = v.id;
				var _url = v.html_url;
				var _name = v.name;
				var _desc = v.description;

				html += `<div class="repo" id="repos:${_id}"> <a href="${_url}" class="name"> ${_name} </a>`

				// Don't add a description if it doesn't have one
				if (_desc)
					html += `<p>${_desc}</p>`

				html += "</div>"
			})

			$("#reposList").html(html)
		})
}

function isHidden(element) {
	return element.is(":visible")
}

/// Toggles the 'repositories' class when the 'navbar:github' button is clicked
function OnGithubNavbarClick() {
	$(".repositories").toggle()
}
/// Activates if the mouse clicks outside the .repositories element
function OnOutsideGithubClick(e) {
	// Element
	var element = $(".repositories")

	// Check if the Element is Visisble
	if (isHidden(element)) {
		// if the target of the click isn't the container nor a descendant of the container
		if (!element.is(e.target) && element.has(e.target).length === 0)
			OnGithubNavbarClick()
	}
}

function OnDocumentLoad() {

	// Variables
	/// Elements
	var _githubNavbar = document.getElementById("navbar:github")

	// Set Visibility
	/// Hide
	$(".repositories").hide()
	// Connections
	_githubNavbar.onclick = OnGithubNavbarClick;
	$(document).mouseup(OnOutsideGithubClick)

	// Add Data
	FillRepositories()

}

// Connections
$(document).ready(OnDocumentLoad)
