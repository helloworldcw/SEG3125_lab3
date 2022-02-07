// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp
const allItems = restrictListProducts(products)
const activeCategory = new Set()
let restrictedItems = []

function openInfo(evt, tabName) {
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function zoomIn() {


  body = document.getElementById("body");
  fontSizePx = window.getComputedStyle(body, null).getPropertyValue('font-size');
  fontSize = parseFloat(fontSizePx) + 1;
  body.style.fontSize = fontSize + "px";

  btnZoomOut = document.getElementById("zoomOut");
  btnZoomOut.disabled = false;

  if (fontSize == 35) {
    btnZoomIn = document.getElementById("zoomIn");
    btnZoomIn.disabled = true;
  }
}

function zoomOut() {

  body = document.getElementById("body");
  fontSizePx = window.getComputedStyle(body, null).getPropertyValue('font-size');
  fontSize = parseFloat(fontSizePx) - 1;
  body.style.fontSize = fontSize + "px";

  btnZoomIn = document.getElementById("zoomIn");
  btnZoomIn.disabled = false;

  if (fontSize == 16) {
    btnZoomOut = document.getElementById("zoomOut");
    btnZoomOut.disabled = true;
  }
}

function toggleCategory(evt, category) {
  if (activeCategory.has(category)) {
    activeCategory.delete(category)
    evt.currentTarget.className += "tablinks";
  } else {
    activeCategory.add(category)
    evt.currentTarget.className += " active";
  }
  const newItems = []
  const items = restrictedItems.length === 0 ? products : restrictedItems 
  for (let i = 0 ; i < items.length; i+=1) {
    if (activeCategory.has(items[i].category)) {
      newItems.push(items[i])
    }
  }
  renderProductList(newItems)
}


// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1) {
  var s1 = document.getElementById(slct1);
  var s2 = document.getElementById('displayProduct');

  // s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
  s2.innerHTML = "";

  if (selectedRestrictions.has(s1.value)) {
    selectedRestrictions.delete(s1.value)
  } else {
    selectedRestrictions.add(s1.value)
  }

  // obtain a reduced list of products based on restrictions
  var optionArray = restrictListProducts(products, s1.value);

  // for each item in the array, create a checkbox element, each containing information such as:
  // <input type="checkbox" name="product" value="Bread">
  // <label for="Bread">Bread/label><br>
  restrictedItems = optionArray
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {

  var ele = document.getElementsByName("product");
  var chosenProducts = [];

  var c = document.getElementById('displayCart');
  c.innerHTML = "";

  // build list of selected item
  var para = document.createElement("P");
  para.innerHTML = "You selected : ";
  para.appendChild(document.createElement("br"));
  for (i = 0; i < ele.length; i++) {
    if (ele[i].value > 0) {
      const total = ele[i].price * parseInt(ele[i].value)
      const formattedPrice = (Math.round(total * 100) / 100).toFixed(2);
      para.appendChild(document.createTextNode(`${ele[i].id} (x${ele[i].value}) - $${formattedPrice}`));
      para.appendChild(document.createElement("br"));
      chosenProducts.push(total);
    }
  }

  // add paragraph and total price
  c.appendChild(para);
  c.appendChild(document.createTextNode("Total Price is $" + getTotalPrice(chosenProducts)));
}

function priceComparator(a, b) {
  return a.price > b.price ? 1 : -1
}

function categoryComparator(a, b) {
  return a.category > b.category ? 1 : -1
}

function renderProductList(optionArray) {
  var s2 = document.getElementById('displayProduct');
  s2.innerHTML = "";
  const priceSortedOptionArray = optionArray.sort(priceComparator);
  const sortedOptionArray = priceSortedOptionArray.sort(categoryComparator);

  prevCategory = ""

  for (i = 0; i < sortedOptionArray.length; i++) {

    var productName = sortedOptionArray[i].name;
    var productPrice = sortedOptionArray[i].price;
    var productImage = sortedOptionArray[i].src;
    var productCategory = sortedOptionArray[i].category;

    // create the quantifier and add in HTML DOM

    if (productCategory !== prevCategory) {
      var heading = document.createElement("h2");
      heading.innerHTML = productCategory
      s2.appendChild(heading)
      prevCategory = productCategory
    }

    var quantity = document.createElement("input");
    quantity.type = "number";
    quantity.name = "product";
    quantity.value = "0";
    quantity.id = productName;
    quantity.price = productPrice;
    quantity.min = 0;
    quantity.max = 10;
    s2.appendChild(quantity);

    // create image and add in HTML DOM
    var image = document.createElement('img');
    image.src = productImage;
    s2.appendChild(image);

    formattedPrice = (Math.round(productPrice * 100) / 100).toFixed(2);

    // create a label for the checkbox, and also add in HTML DOM
    var label = document.createElement('label')
    label.htmlFor = productName;
    label.appendChild(document.createTextNode(`${productName} - $${formattedPrice}/each`));
    s2.appendChild(label);

    // create a breakline node and add in HTML DOM
    s2.appendChild(document.createElement("br"));
  }
}

/* code from w3schools */
// Get the modal
var customer_modal = document.getElementById("myCustomerModal");

// Get the button that opens the modal
var customer_btn = document.getElementById("myCustomerBtn");

// Get the <span> element that closes the modal
var customer_span = document.getElementsByClassName("close")[0];

// Get the modal
var cart_modal = document.getElementById("myCartModal");

// Get the button that opens the modal
var cart_btn = document.getElementById("myCartBtn");

// Get the <span> element that closes the modal
var cart_span = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
customer_btn.onclick = function() {
  customer_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
customer_span.onclick = function() {
  customer_modal.style.display = "none";
}

// When the user clicks the button, open the modal 
cart_btn.onclick = function() {
  cart_modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
cart_span.onclick = function() {
  cart_modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == customer_modal) {
    customer_modal.style.display = "none";
  }
  if (event.target == cart_modal) {
    cart_modal.style.display = "none";
  }
}