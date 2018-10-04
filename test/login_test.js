//import chai
var chai = require('chai');
var expect = chai.expect;

//import login specs
var LoginSpecs = require('./login_specs');

//create new login
const login = new LoginSpecs;

//test GISCloud sign-in page
describe('GISCloud sign-in page', () => {
	//create valid credentials
	const validUsername = 'SvenM';
	const validPassword = 'svencloud';

	//before each 'it' go to https://www.giscloud.com/sign-in
	beforeEach(() => {
		browser.url('https://www.giscloud.com/sign-in');
	});

	//first check is for some elements on sign-in page
	it('check for log in elements', () => {

		//check for existence of sign up subtitle
		const signUpSubtitle = browser.isExisting('.sign-up-subtitle-1-column');
		expect(signUpSubtitle, 'class sign-up-subtitle-1-column is not existing').to.be.true;

		//check for text and existence of class sign-up-title
		const signUpTitle = browser.isExisting('.sign-up-title');
		expect(signUpTitle, 'class sign-up-title is not existing').to.be.true;
		expect(browser.getText('.sign-up-title')).to.be.equal('LOG IN');

		//check for text and existence of class sign up subtitle 1
		const signUpSubtitle1 = browser.isExisting('.sign-up-subtitle-1');
		expect(signUpSubtitle1, 'class sign-up-subtitle-1 is not existing').to.be.true;
		expect(browser.getText('.sign-up-subtitle-1')).to.be.equal('Enter your GIS Cloud credentials :');

		//check for existence of login form
		const formSignUp = browser.isExisting('.form---sign-up');
		expect(formSignUp, 'class form---sign-up is not existing').to.be.true;

		//check for existence of username label element and username label text
		const labelUsername = browser.isExisting('[for=login-username]');
		expect(labelUsername, 'label for username is not existing').to.be.true;
		expect(browser.getText('[for=login-username]')).to.be.equal('Username');

		//check for existence of username or password login field
		const loginUsername = browser.isExisting('#login-username');
		expect(loginUsername, 'id login-username is not existing').to.be.true;

		//check for existence of password label element and password label text
		const labelPassword = browser.isExisting('[for=login-password]');
		expect(labelPassword, 'label for password is not existing').to.be.true;
		expect(browser.getText('[for=login-password]')).to.be.equal('Password');

		//check for existence of password login field
		const loginPassword = browser.isExisting('#login-password');
		expect(loginPassword, 'id login-password is not existing').to.be.true;

		//check for existence of login button
		const loginButton = browser.isExisting('.login-button');
		expect(loginButton, 'class login-button is not existing').to.be.true;

		//check for text and existence of class login-links
		const loginLinks = browser.isExisting('.login-links');
		expect(loginLinks, 'class login-links is not existing').to.be.true;
		expect(browser.getText('.login-links'), 'text is not matching Lost your Password? Click here to recover.').to.be.equal('Lost your Password? Click here to recover.');

		//check for existence of class forgot-pass (link for redirecting)
		const lostPasswordRedirect = browser.isExisting('.forgot-pass');
		expect(lostPasswordRedirect, 'class forgot-pass is not existing').to.be.true;
		//check for redirection
		describe('Redirection to /forgotten-password from sign-in page', () => {
			//check for existence of class forgot-pass
			it('class forgot-pass is existing', () => {
				const redirectLink = browser.isExisting('.forgot-pass');
				expect(redirectLink, 'class forgot-pass is not existing').to.be.true;
			});

			//check for successful redirection to /forgotten-password page, confirmation with url
			it('check for forgotten password redirection', () => {
				browser.click('.forgot-pass');
				forgottenPasswordUrl = browser.getUrl();
				expect(forgottenPasswordUrl, 'url is not matching forgotten-password url').to.equal('https://www.giscloud.com/forgotten-password');
			});
		});
	})

	//check for login cases - six different scenarios:
	//valid credentials, invalid username, invalid password, 
	//empty username field, empty password field and empty both, username and password fields

	//check for valid credentials, confirmation of login > redirection to https://manager.giscloud.com/ and logout button existance
	it('login with valid credentials', done => {
		login.login(validUsername, validPassword);

		expect(login.isLoggedIn(), 'login not confirmed').to.be.true;

		const logoutButton = browser.isExisting('#dashboard_close_bt');

		expect(logoutButton, 'logout button not confirmed').to.be.true;

		$('#dashboard_close_bt').click();
	});

	//check for empty username field, confirmation of successful test > user stays on a sign-in page
	it('error on a missing username or email', done => {
		login.login('', validPassword);

		expect(login.isLoggedIn(), 'not logged in').to.be.false;

		const browserUrl = browser.getUrl();
		expect(browserUrl, 'browser url is not sign-in page').to.be.equal('https://www.giscloud.com/sign-in');
	});

	//check for invalid username, confirmation of successful test > redirection to https://manager.giscloud.com/?badlogin=yes > check for message error and url for bad login
	it('error on a invalid username or email', () => {
		login.login('error', validPassword);

		expect(login.isLoggedIn(), 'not logged in').to.be.false;
		expect(browser.getText('.message.error')).to.be.equal('Username or password is incorrect.');

		const browserUrl = browser.getUrl();
		expect(browserUrl, 'browser url is not badlogin url').to.be.equal('https://manager.giscloud.com/?badlogin=yes');
	});

	//check for missing password, confirmation of successful test > user stays on a sign-in page
	it('error on a missing password', () => {
		login.login(validUsername, '');

		expect(login.isLoggedIn(), 'not logged in').to.be.false;

		const browserUrl = browser.getUrl();
		expect(browserUrl, 'browser url is not sign-in page').to.be.equal('https://www.giscloud.com/sign-in');
	});

	//check for invalid password, confirmation of successful test > redirection to https://manager.giscloud.com/?badlogin=yes > check for message error and url for bad login
	it('error on a invalid password', () => {
		login.login(validUsername, 'error');

		expect(login.isLoggedIn(), 'not logged in').to.be.false;
		expect(browser.getText('.message.error')).to.be.equal('Username or password is incorrect.');

		const browserUrl = browser.getUrl();
		expect(browserUrl, 'browser url is not badlogin url').to.be.equal('https://manager.giscloud.com/?badlogin=yes');
	});

	//check for missing username or email and password, confirmation of successful test > user stays on a sign-in page
	it('error on a missing username or email and password', () => {
		login.login('', '');

		expect(login.isLoggedIn(), 'not logged in').to.be.false;

		const browserUrl = browser.getUrl();
		expect(browserUrl, 'browser url is not sign-in page').to.be.equal('https://www.giscloud.com/sign-in');
	});

	//simple check does sign-up page contain field for social media authentication
	it('check for existance of social media auth', () => {
		const socialMediaAuth = browser.isExisting('.sign-up-subtitle-2-column');
		expect(socialMediaAuth, 'class for social media auth is not existing').to.be.true;
	})
})