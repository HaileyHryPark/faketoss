var LoginModule = require("pages/page_js/LoginPage");

function logout(router) {
	LoginModule.logout();
	router.push("loginPage");
}

function goToProfilePage(user, router) {
	// TODO: Have to complete the login functionality
	// TODO: push some authentication info
	router.push("profilePage", user);
}

function goToTransactionsPage(user, router) {
	router.push("transactionsPage", user);
}

module.exports = {
	logout: logout,
	goToProfilePage: goToProfilePage,
	goToTransactionsPage: goToTransactionsPage
};