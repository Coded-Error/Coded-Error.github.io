// Modules
import * as github from './modules/GitHubApi.js';

$(function () {

	// Variables
	// / Information
	var repositoiresShown = true;
	var repositories = {};

	// / Elements
	var bannerBlocks = $(".block")
	var carousel = $(".carousel")
	var pseudoBttn = $("* #_pseudo_bttn")

	// / / Buttons
	var RepositoryButton = $("#repos-button");
	var brandElem = $("#brand-redirect");

	// / / Repositories
	var reposBack = $(".repos-backdrop");
	var reposList = $(".repos-list");
	var reposeCont = $(".container-box")
	var reposSearchInput = $("#search-input");
	var reposSearchButton = $(".search");

	// / / Any element with an anchor
	var toApplyAnchors = $(`*[data-header-type='section_anchor']`);

	// Functions

	function DoRepositorySearch() {
		var searchTerm = reposSearchInput.val();
		var html = '';

		searchTerm = searchTerm.toLowerCase();

		// Enable Search Mode
		reposList.html('');
		reposSearchInput.blur();

		// Loop trough array
		$.each(repositories, (_, rep) => {
			var name = rep.name;
			var desc = rep.description;

			// Check Variables
			if (name.toLowerCase().includes(searchTerm)) {
				html += FormatRepositoryAsHtml(rep);
				return true
			}

			if (desc) {
				if (desc.toLowerCase().includes(searchTerm)) {
					html += FormatRepositoryAsHtml(rep);
					return true
				}
			}
		})

		reposList.html(html)
	}

	function FormatRepositoryAsHtml(RepositoryData) {
		var html = '';

		var repId = RepositoryData.id;
		var repUrl = RepositoryData.html_url;
		var repName = RepositoryData.name;
		var repDesc = RepositoryData.description;

		html += `<div class="repository" id="repos:${repId}">`;
		html += `<a href="${repUrl}" class="repos-name">${repName}</a>`;

		if (repDesc)
			html += `<p class="repos-description">${repDesc}</a>`;

		html += `</div>`;

		// Return HTML
		return html
	}

	function CarouselInteraction() {
		// Add to table
		var prevBttn = carousel.find(".prev");
		var nextBttn = carousel.find(".next");
		var thumbs = [];
		var curIndex = 0;

		carousel.children(".thumbnail").each((_, elem) => {
			thumbs.push($(elem));
		})

		if (thumbs.length > 1) {
			nextBttn.click(() => {
				thumbs[curIndex].attr('data-thumb-active', () => null)

				curIndex++; // Add index

				if (curIndex >= thumbs.length)
					curIndex -= thumbs.length;

				thumbs[curIndex].attr('data-thumb-active', () => 1)
			})

			prevBttn.click(() => {
				thumbs[curIndex].attr('data-thumb-active', () => null)

				curIndex--; // Subtract Index

				if (curIndex < 0)
					curIndex = (thumbs.length - 1);

				thumbs[curIndex].attr('data-thumb-active', () => 1)
			})
		} else {
			if (prevBttn) prevBttn.remove();
			if (nextBttn) nextBttn.remove();

			thumbs = null;
		}
	}

	// Fill repositories list
	function FillRepositories() {
		github.GetRepositories()
			.then((data) => {
				repositories = data;

				var html = '';

				$.each(data, (_, repository) => { html += FormatRepositoryAsHtml(repository) });
				reposList.html(html);
			})
	}

	// Apply all anchors
	function ApplyAnchorElements() {
		$.each(toApplyAnchors, (_, element) => {
			element = $(element)
			element.append(`<a href="#${element.attr('id')}" class="anchor">¶</a>`);
		})
	}

	// Initiate

	FillRepositories();
	ApplyAnchorElements();
	CarouselInteraction();

	// Connect
	// / Redirect
	brandElem.click(DoRepositorySearch);

	// / Repository Searching
	reposSearchButton.click()

	reposSearchInput.on('keyup', (e) => {
		if (e.key === 'enter' || e.keyCode === 13)
			DoRepositorySearch()
	})

	// / Toggle Repository View
	RepositoryButton.click(() => {
		// Invert boolean
		repositoiresShown = !repositoiresShown;

		// Get the position
		var leftPosition = repositoiresShown ? '200vw' : '0px';

		// Set the position
		reposBack.css({
			left: leftPosition
		});
	});

	$(document).mouseup((e) => {
		if (!repositoiresShown) {
			if (!reposeCont.is($(e.target)) && reposeCont.has($(e.target)).length === 0) {
				repositoiresShown = !repositoiresShown;

				reposBack.css({
					left: '200vw',
				});
			}
		}
	})

	// / Apply Dropdwon Banners' Functionality
	$.each(bannerBlocks, (_, elem) => {
		const _elem = $(elem);
		const bttn = _elem.find('.banner');
		const cont = _elem.find('.block-content');

		bttn.click(() => {
			bttn.toggleClass("active");

			if (bttn.hasClass("active"))
				cont.css("max-height", cont.prop("scrollHeight") + "px");
			else
				cont.css("max-height", 0)
		})
	})

	pseudoBttn.each((_, elem) => {
		elem = $(elem);
		elem.click(() => {
			var location = elem.attr('href');
			var target = elem.attr('target');

			window.open(location || document.location.href, target || "_self")
		})
	})

})