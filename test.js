let list = [{'name': 'a', 'price': 100}, {'name': 'a', 'price': 100}]

let total = 0;
list.forEach(x => {total += x.price;})

console.log(total);