let a = [{'name': 20, 'qty': 10}]

let total = 0;
a.forEach(x => total += x['name'] * x['qty'])

console.log(total)