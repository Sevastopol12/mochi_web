import AccountManager from "./models/Manager/account_manager.js";

let am = new AccountManager();

let a = {};

let b = a.length > 0? a : null;

console.log(b);