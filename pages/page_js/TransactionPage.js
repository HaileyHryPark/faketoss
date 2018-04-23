var Observable = require("FuseJS/Observable");

var accounts = Observable("All Accounts", "Citi Bank", "HangSeng Bank","Hana Bank");
var SelectedAccount = Observable("All Accounts");

var period = Observable("All Transactions", "This Month", "Last Month", "This Year");
var SelectedPeriod = Observable("All Transactions");

module.exports = {
	accounts: accounts,
	SelectedAccount: SelectedAccount,
	period: period,
	SelectedPeriod: SelectedPeriod
};