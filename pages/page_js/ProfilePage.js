var UserModule = require("data_types/User");
var user = this.Parameter;
var name = user.map(function(x) { return x.name; });
var picture = user.map(function(x) { return x.picture; });
var accesstoken = user.map(function(x) { return x.accesstoken; });
var isLoggedIn = user.map(function(x) { return x.isLoggedIn; });

var imgConfig = require("config/ImgConfig");
var pageNavigatorModule = require("pages/page_js/PageNavigator");

function logout() {
	pageNavigatorModule.logout(router);
}

function goToProfilePage() {
	var user_copied = UserModule.userCopy(name, picture, accesstoken, isLoggedIn);
	pageNavigatorModule.goToProfilePage(user_copied, router);
}
function goToTransactionsPage() {
	var user_copied = UserModule.userCopy(name, picture, accesstoken, isLoggedIn);
	pageNavigatorModule.goToTransactionsPage(user_copied, router);
}

var example_profile_photo = imgConfig.example_profile_photo;

module.exports = {
	onClicked: function () {
		console.log("Transfer")
	},
	goToProfilePage: goToProfilePage,
	goToTransactionsPage: goToTransactionsPage,
	example_profile_photo: example_profile_photo,
	logout: logout
};