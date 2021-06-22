// Modules
import * as GitHub from './GitHubApis.js';

// Functions
/// Fills the '.repo' class using GitHub's API
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

/// Toggles the '.repositories' class when the 'navbar:github' button is clicked
function OnGithubNavbarClick() {
	$(".repositories").toggle()
}
/// Activates if the mouse clicks outside the '.repositories' element
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

/// Adds a '<span'> tag to all '.smedia' classes
function AddMediaTags() {
	var _class = $(".smedia")

	_class.each((_, _elem) => {
		// Covert DOM Element to JQuery Element
		_elem = $(_elem)

		// Create add-on HTML; add it
		var _html = $('<span>' + _elem.attr("content") + '</span>')
		_elem.append(_html)
	})
}

function ApplyCopyEvent(_, _elem) {
	// Convert
	_elem = $(_elem)

	// Variables
	var _html = $(`<span class="copy-button" title="Copy To Clipboard"></span>`)

	_elem.append(_html)
	/// This actually Copies to the Clipboard
	_html.click(() => {
		var text = _elem.text(); // Get the Text
		navigator.clipboard.writeText(text) // Prevously an unnecessary large block of code: shortened to a single line
	})
}

/// Activates once the document loads
function OnDocumentLoad() {

	// Variables
	/// Elements
	var githubNavbar = $('#github-button')
	var codeBlocks = $('.code-block')

	// Set Visibility
	/// Hide
	$(".repositories").hide()

	// Add Data
	FillRepositories()
	AddMediaTags()

	// Connections
	$(document).mouseup(OnOutsideGithubClick)
	githubNavbar.click(OnGithubNavbarClick)
	/// Apply the event for each '.code-block'
	codeBlocks.each(ApplyCopyEvent)

}

// Connections
$(document).ready(OnDocumentLoad)
