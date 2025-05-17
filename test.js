import AccountManager from "./models/Manager/account_manager.js";

let am = new AccountManager();

let a = await am.listAll();

a.forEach(x => console.log(x.role));