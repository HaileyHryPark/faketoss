function userCopy(name, picture, accessToken, isLoggedIn) {
	var user = {
		name: new Object,
		picture: new Object,
		accessToken: new Object,
		isLoggedIn: new Object
	};
	user.name.value = name.value;
	user.picture.value = picture.value;
	user.accessToken.value = accessToken.value;
	user.isLoggedIn.value = isLoggedIn.value;

	console.log("userCopy");

	return user;
}

module.exports = {
	userCopy: userCopy
};