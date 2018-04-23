var Observable = require("FuseJS/Observable");
var Auth = require("config/Auth");
var Storage = require("FuseJS/Storage");

var showWebView = Observable(false);
var accessToken = Observable("");
var client_id = Auth.client_id;
var url = Observable("about:blank");
var myName = Observable("");
var myPicture = Observable();
var isLoggedIn = Observable(false);

var UserModule = require("data_types/User");
var UtilModule = require("util/Util");
var PageNavigatorModule = require("pages/page_js/PageNavigator");

accessToken.value += Storage.readSync("token.txt");

var loginPanelVisibility = Observable("Visible");

if (accessToken.value !== "") {
	console.log("accessToken has a value");
	isLoggedIn.value = true;
	loginPanelVisibility.value = "Hidden";
}

if (isLoggedIn.value === true) {
	console.log("isLoggedIn set to true");
	getMe();
}

function login(){
	url.value = "https://www.facebook.com/dialog/oauth?client_id=" + client_id + "&response_type=token&redirect_uri=https://www.facebook.com/connect/login_success.html";
	console.log("logging in");
	showWebView.value = true;
}

var logout = function(){
    Storage.deleteSync("token.txt");
    isLoggedIn.value = false;
    loginPanelVisibility = "Visible";
    console.log("logout");
    accessToken.value = "";
    console.log("isLoggedIn: " + isLoggedIn.value);
    console.log("accessToken: " + accessToken.value);
    console.log("showWebView: " + showWebView.value);
}

function pageLoaded(res){
	console.log("isLoggedIn: " + isLoggedIn.value);
    console.log("accessToken: " + accessToken.value);
    console.log("showWebView: " + showWebView.value);
    
	var uri = JSON.parse(res.json).url;
	console.log("Final URI: " + uri);
	if (UtilModule.stringContainsString(uri, "access_token=")){
		var tmp = uri.split("access_token=")[1];
		var at = tmp.split("&")[0];
		accessToken.value = at;
		showWebView.value = false;
		console.log("accessToken: " + accessToken.value);
		getMe();
	}
}

function getMe(){
	var url = "https://graph.facebook.com/v2.5/me?fields=name&";
	url += "access_token=" + accessToken.value;

	fetch(url, {
		method:"GET"
	}).then(function(result){
		return result.json();
	}).then(function(resultJson){
		myName.value = resultJson.name;
	}).catch(function(error){
		console.log("Error: " + error);
	});

	console.log("Trying to get picture");
	var pictureUrl = "https://graph.facebook.com/v2.5/me/picture?type=large&redirect=false&access_token=" + accessToken.value;
	fetch(pictureUrl, {
		method:"GET"
	}).then(function(result){
		return result.json();
	}).then(function(resultJson){
		myPicture.value = resultJson.data.url;
		isLoggedIn.value = true;
		loginPanelVisibility = "Hidden";
		var user = UserModule.userCopy(myName, myPicture, accessToken, isLoggedIn);
		Storage.writeSync("token.txt", accessToken.value);
		PageNavigatorModule.goToProfilePage(user, router);
	}).catch(function(error){
		console.log("Error: " + error);
	});
}

var imgConfig = require("config/ImgConfig");
var logo = imgConfig.logo;
var facebook_logo = imgConfig.facebook_logo;

module.exports = {
	login:login,
	logout: logout,
	pageLoaded: pageLoaded,
	url: url,
	myName: myName,
	myPicture: myPicture,
	showWebView: showWebView,
	isLoggedIn: isLoggedIn,
	loginPanelVisibility: loginPanelVisibility,
	logo: logo,
	facebook_logo: facebook_logo
};