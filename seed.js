import ProductModel from "./models/productModel.js";

let pm = new ProductModel();

const sampleProducts = [
  {
    "id": "1",
    "name": "Traditional Mochi",
    "price": 0.577,
    "quantity": 60,
    "description": "The classic and timeless mochi with a soft, chewy texture and a subtly sweet flavor."
  },
  {
    "id": "2",
    "name": "Strawberry Mochi",
    "price": 0.769,
    "quantity": 45,
    "description": "Delicate mochi filled with a sweet and slightly tart strawberry center."
  },
  {
    "id": "3",
    "name": "Green Tea Mochi",
    "price": 0.769,
    "quantity": 30,
    "description": "Earthy and aromatic mochi infused with the distinct flavor of Japanese green tea."
  },
  {
    "id": "4",
    "name": "Chocolate Mochi",
    "price": 0.846,
    "quantity": 24,
    "description": "Rich and decadent mochi with a smooth, chocolatey filling."
  },
  {
    "id": "5",
    "name": "Mango Mochi",
    "price": 0.808,
    "quantity": 36,
    "description": "Tropical and sweet mochi bursting with the flavor of ripe mango."
  },
  {
    "id": "6",
    "name": "Cheese Mochi",
    "price": 0.692,
    "quantity": 75,
    "description": "A unique and savory mochi with a creamy cheese filling."
  },
  {
    "id": "7",
    "name": "Vanilla Mochi",
    "price": 0.654,
    "quantity": 54,
    "description": "Sweet and fragrant mochi with a classic vanilla-flavored center."
  },
  {
    "id": "8",
    "name": "Blueberry Mochi",
    "price": 0.846,
    "quantity": 30,
    "description": "Mochi with a delightful sweet and tangy blueberry filling."
  },
  {
    "id": "9",
    "name": "Milk Cream Mochi",
    "price": 0.615,
    "quantity": 42,
    "description": "Smooth and creamy milk-flavored mochi, a simple yet satisfying treat."
  },
  {
    "id": "10",
    "name": "Red Bean Mochi",
    "price": 0.577,
    "quantity": 60,
    "description": "A traditional mochi filled with sweet and slightly textured red bean paste."
  },
  {
    "id": "11",
    "name": "Matcha Chocolate Mochi",
    "price": 0.885,
    "quantity": 27,
    "description": "A delightful fusion of earthy matcha and rich chocolate in a soft mochi."
  },
  {
    "id": "12",
    "name": "Banana Mochi",
    "price": 0.731,
    "quantity": 33,
    "description": "Sweet and subtly flavored mochi with a creamy banana filling."
  },
  {
    "id": "13",
    "name": "Coconut Cream Mochi",
    "price": 0.808,
    "quantity": 39,
    "description": "Tropical-inspired mochi with a sweet and refreshing coconut cream center."
  },
  {
    "id": "14",
    "name": "Caramel Mochi",
    "price": 0.769,
    "quantity": 48,
    "description": "Sweet and buttery caramel-filled mochi, a delightful indulgence."
  },
  {
    "id": "15",
    "name": "Kiwi Mochi",
    "price": 0.827,
    "quantity": 21,
    "description": "A vibrant and slightly tart mochi with a refreshing kiwi filling."
  },
  {
    "id": "16",
    "name": "Green Apple Mochi",
    "price": 0.788,
    "quantity": 30,
    "description": "Crisp and slightly sour green apple flavored mochi, a unique twist."
  },
  {
    "id": "17",
    "name": "White Chocolate Mochi",
    "price": 0.865,
    "quantity": 15,
    "description": "Sweet and creamy white chocolate filled mochi, a delicate treat."
  },
  {
    "id": "18",
    "name": "Raspberry Mochi",
    "price": 0.885,
    "quantity": 18,
    "description": "Mochi with a sweet and slightly tart raspberry filling, bursting with fruity flavor."
  },
  {
    "id": "19",
    "name": "Taro Mochi",
    "price": 0.75,
    "quantity": 36,
    "description": "A subtly sweet and nutty taro flavored mochi, a popular Asian delicacy."
  },
  {
    "id": "20",
    "name": "Peanut Mochi",
    "price": 0.692,
    "quantity": 42,
    "description": "Mochi filled with a sweet and slightly savory peanut paste, a satisfying snack."
  },
  {
    "id": "21",
    "name": "Sesame Mochi",
    "price": 0.712,
    "quantity": 50,
    "description": "Nutty and slightly roasted sesame flavored mochi."
  },
  {
    "id": "22",
    "name": "Passion Fruit Mochi",
    "price": 0.855,
    "quantity": 28,
    "description": "Tangy and aromatic passion fruit filled mochi."
  },
  {
    "id": "23",
    "name": "Lychee Mochi",
    "price": 0.799,
    "quantity": 35,
    "description": "Sweet and floral lychee flavored mochi."
  },
  {
    "id": "24",
    "name": "Coffee Mochi",
    "price": 0.815,
    "quantity": 22,
    "description": "Rich and aromatic coffee infused mochi."
  },
  {
    "id": "25",
    "name": "Lemon Mochi",
    "price": 0.745,
    "quantity": 40,
    "description": "Bright and zesty lemon flavored mochi."
  },
  {
    "id": "26",
    "name": "Grape Mochi",
    "price": 0.835,
    "quantity": 31,
    "description": "Sweet and juicy grape filled mochi."
  },
  {
    "id": "27",
    "name": "Pistachio Mochi",
    "price": 0.910,
    "quantity": 19,
    "description": "Nutty and slightly sweet pistachio flavored mochi."
  },
  {
    "id": "28",
    "name": "Salted Caramel Mochi",
    "price": 0.875,
    "quantity": 25,
    "description": "Sweet and savory salted caramel filled mochi."
  },
  {
    "id": "29",
    "name": "Black Sesame Mochi",
    "price": 0.725,
    "quantity": 45,
    "description": "Intense and earthy black sesame flavored mochi."
  },
  {
    "id": "30",
    "name": "Sakura Mochi",
    "price": 0.900,
    "quantity": 20,
    "description": "Delicate and floral cherry blossom flavored mochi."
  }
];

async function seed() {
  for (let i = 0; i < sampleProducts.length; i++) {
    const product = sampleProducts[i];
    await pm.add(product.id,product.name,product.price,product.quantity,product.description
    );
    console.log(`Inserted: ${product.name}`);
  }
  console.log('✅ All products inserted.');
}

seed();