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
    noLactose: false,
    price: 1.99,
    src: './assets/yogurt.png',
    category: 'Dairy'
  },
  {
    name: "White Bread",
    noGluten: false,
    vegetarian: true,
    isOrganic: true,
    diabetic: true,
    noLactose: false,
    price: 2.00,
    src: './assets/whiteBread.png',
    category: 'Snacks'
  },
  {
    name: "Chocolate Milk",
    noGluten: true,
    vegetarian: true,
    isOrganic: false,
    diabetic: false,
    noLactose: false,
    price: 10.00,
    src: './assets/chocolateMilk.png',
    category: 'Dairy'
  },
  {
    name: "Wheat Flour",
    noGluten: false,
    vegetarian: true,
    isOrganic: false,
    diabetic: true,
    noLactose: true,
    price: 3.00,
    src: './assets/wheatFlour.png',
    category: 'Grain'
  },
  {
    name: "Strawberry",
    noGluten: true,
    vegetarian: true,
    isOrganic: false,
    diabetic: true,
    noLactose: true,
    price: 7.00,
    src: './assets/strawberry.png',
    category: 'Fruit'
  },
  {
    name: "Banana",
    noGluten: true,
    vegetarian: true,
    isOrganic: true,
    diabetic: true,
    noLactose: true,
    price: 0.50,
    src: './assets/banana.png',
    category: 'Fruit'
  },
  {
    name: "Apple",
    noGluten: true,
    vegetarian: true,
    isOrganic: true,
    diabetic: true,
    noLactose: true,
    price: 1.15,
    src: './assets/apple.png',
    category: 'Fruit'
  },
  {
    name: "Granola Bar",
    noGluten: false,
    vegetarian: true,
    isOrganic: false,
    diabetic: false,
    noLactose: true,
    price: 3.33,
    src: './assets/granolaBar.png',
    category: 'Snacks'
  },
  {
    name: "Tuna",
    noGluten: true,
    vegetarian: false,
    isOrganic: true,
    diabetic: true,
    noLactose: true,
    price: 13.00,
    src: './assets/tuna.png',
    category: 'Fish'
  },
  {
    name: "Rice",
    noGluten: true,
    vegetarian: true,
    isOrganic: false,
    diabetic: true,
    noLactose: true,
    price: 20.00,
    src: './assets/rice.png',
    category: 'Grain'
  },
];

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods) {
  let filteredProducts = [];
  for (let i = 0; i < prods.length; i += 1) {
    if ((selectedRestrictions.has("LactoseIntolerant")) && (prods[i].noLactose == false)){
      continue;
    }
    if ((selectedRestrictions.has("GlutenIntolerant")) && (prods[i].noGluten == false)){
      continue;
    }
    if ((selectedRestrictions.has("Vegetarian")) && (prods[i].vegetarian == false)){
      continue;
    }    
    if ((selectedRestrictions.has("Diabetic")) && (prods[i].diabetic == false)){
      continue;
    }
    if ((selectedRestrictions.has("Organic")) && (prods[i].isOrganic == false)){
      continue;
    }
    filteredProducts.push(prods[i]);
  }
  return filteredProducts;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
  totalPrice = 0;
  for (let i = 0; i < chosenProducts.length; i += 1) {
    totalPrice += chosenProducts[i]
  }
  const formattedPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);
  return formattedPrice;
}