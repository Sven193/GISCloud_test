//import chai
var chai = require('chai');
var expect = chai.expect;


//login specs class
class LoginSpecs {
	//need for username, password and click on a button
	get username () { return $('#login-username')};
	get password () { return $('#login-password')};
	get submit () { return $('#signin_bt')};

	login(username, password) {
		this.username.setValue(username);
		this.password.setValue(password);

		this.submit.click();
	}

	//checking redirection to https://manager.giscloud.com/
	isLoggedIn () {
		return browser.getUrl() === 'https://manager.giscloud.com/';
	}
}

module.exports = LoginSpecs;