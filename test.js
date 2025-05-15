import AccountManager from "./models/Manager/account_manager.js";

const am = new AccountManager();


let a = await am.listAll();

Object.values(a).forEach(x => console.log(x));