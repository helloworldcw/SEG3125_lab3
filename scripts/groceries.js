const selectedRestrictions = new Set()

// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products    

var products = [
  {
    name: "Yogurt",
    noGluten: true,
    vegetarian: true,
    isOrganic: false,
	diabetic: true,
	lactose: true,
    price: 1.99,
    src: './assets/yogurt.png'
  },
  {
    name: "White Bread",
    noGluten: false,
    vegetarian: true,
    isOrganic: true,
	diabetic: true,
	lactose: false,
    price: 2.00,
    src: './assets/whiteBread.png'
  },
  {
    name: "Chocolate Milk",
    noGluten: true,
    vegetarian: true,
    isOrganic: false,
	diabetic: false,
	lactose: true,
    price: 10.00,
    src: './assets/chocolateMilk.png'
  },
  {
    name: "Wheat Flour",
    noGluten: false,
    vegetarian: true,
    isOrganic: false,
	diabetic: true,
	lactose: false,
    price: 3.00,
    src: './assets/wheatFlour.png'
  },
  {
    name: "Strawberry",
    noGluten: true,
    vegetarian: true,
    isOrganic: false,
	diabetic: true,
	lactose: false,
    price: 7.00,
    src: './assets/strawberry.png'
  },
  {
    name: "Banana",
    noGluten: true,
    vegetarian: true,
    isOrganic: true,
	diabetic: true,
	lactose: false,
    price: 0.50,
    src: './assets/banana.png'
  },
  {
    name: "Apple",
    noGluten: true,
    vegetarian: true,
    isOrganic: true,
	diabetic: true,
	lactose: false,
    price: 1.15,
    src: './assets/apple.png'
  },
  {
    name: "Granola Bar",
    noGluten: false,
    vegetarian: true,
    isOrganic: false,
	diabetic: false,
	lactose: false,
    price: 3.33,
    src: './assets/granolaBar.png'
  },
  {
    name: "Tuna",
    noGluten: true,
    vegetarian: false,
    isOrganic: true,
	diabetic: true,
	lactose: false,
    price: 13.00,
    src: './assets/tuna.png'
  },
  {
    name: "Rice",
    noGluten: true,
    vegetarian: true,
    isOrganic: false,
	diabetic: true,
	lactose: false,
    price: 20.00,
    src: './assets/rice.png'
  },
];

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods) {
  let filteredProducts = [];
  for (let i = 0; i < prods.length; i += 1) {
    if ((selectedRestrictions.has("GlutenIntolerant")) && (prods[i].noGluten == false)){
      continue;
    }
    if ((selectedRestrictions.has("Vegetarian")) && (prods[i].vegetarian == false)){
      continue;
    }
    if ((selectedRestrictions.has("Organic")) && (prods[i].isOrganic == false)){
      continue;
    }
	if ((selectedRestrictions.has("Nonorganic")) && (prods[i].isOrganic == true)){
      continue;
    }
	if ((selectedRestrictions.has("Diabetic")) && (prods[i].diabetic == false)){
      continue;
    }
	if ((selectedRestrictions.has("LactoseIntolerant")) && (prods[i].lactose == true)){
      continue;
    }
    filteredProducts.push(prods[i]);
  }
  return filteredProducts;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
  totalPrice = 0;
  for (let i = 0; i < products.length; i += 1) {
    if (chosenProducts.indexOf(products[i].name) > -1) {
      totalPrice += products[i].price;
    }
  }
  return totalPrice;
}
