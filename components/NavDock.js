var PageNavigatorModule = require("pages/page_js/PageNavigator");

function goToProfilePage() {
	// TODO: make a proper user
	var user = Object();
	PageNavigatorModule.goToProfilePage(user, router);
}

function goToTransactionsPage() {
	var user = Object();
	PageNavigatorModule.goToTransactionsPage(user, router);
}

module.exports = {
	goToProfilePage: goToProfilePage,
	goToTransactionsPage: goToTransactionsPage
};