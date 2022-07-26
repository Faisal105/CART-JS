let cartProducts = [];

var removeCartItemButton = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButton.length; i++) {
	var button = removeCartItemButton[i];
	button.addEventListener('click', removeCartItem);
}
var quantityInputs = document.getElementsByClassName('cart-quantity-input');
for (var i = 0; i < quantityInputs.length; i++) {
	var input = quantityInputs[i];
	input.addEventListener('change', quantityChange);
}
function quantityChange(e) {
	var input = e.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}

var addToCartButtons = document.getElementsByClassName('shop-now');
for (var i = 0; i < addToCartButtons.length; i++) {
	var button = addToCartButtons[i];
	button.addEventListener('click', addToCartClicked);
}
function addToCartClicked(e) {
	var button = e.target;
	var shopItem = button.parentElement;
	var title = shopItem.getElementsByClassName('card-title')[0].innerText;
	const price = e.target.nextElementSibling.textContent;
	const img = e.target.parentElement.previousElementSibling.src;
	let product = {
		title: title,
		price: price,
		img: img,
	};

	addItemToCart(product);
	updateCartTotal();
}
function addItemToCart(product) {
	cartProducts.push(product);
	localStorage.setItem('cart', JSON.stringify(cartProducts));
	const localStorageCart = localStorage.getItem('cart');
	const cartObj = JSON.parse(localStorageCart);
	console.log(cartObj);
	// console.log(cartProducts);
	var cartRow = document.createElement('div');
	cartRow.classList.add('cart-row');
	var cartItems = document.getElementsByClassName('cart-items')[0];
	var cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
	for (var i = 0; i < cartItemsNames.length; i++) {
		if (cartItemsNames[i].innerText == product.title) {
			alert('this already added');
			return;
		}
	}
	var carRowContent = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${product.img}">
    <span class="cart-item-title">${product.title}</span>
</div>
<span class="cart-price cart-column">$${product.price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
</div>

    
    `;
	cartRow.innerHTML = carRowContent;
	cartItems.append(cartRow);
	cartRow
		.getElementsByClassName('btn-danger')[0]
		.addEventListener('click', removeCartItem);
	cartRow
		.getElementsByClassName('cart-quantity-input')[0]
		.addEventListener('change', quantityChange);
}
function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartItemContainer.getElementsByClassName('cart-row');
	var total = 0;
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var quantityElement = cartRow.getElementsByClassName(
			'cart-quantity-input ',
		)[0];
		var price = parseFloat(priceElement.innerText.replace('$', ''));
		var quantity = quantityElement.value;
		total = total + price * quantity;
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName('cart-total-price')[0].innerText =
		'$' + total;
}
function removeCartItem(e) {
	var buttonClicked = e.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}
document
	.getElementsByClassName('btn-purchase')[0]
	.addEventListener('click', () => {
		alert('thanks for purchase');
		var cartItems = document.getElementsByClassName('cart-items')[0];
		while (cartItems.hasChildNodes()) {
			cartItems.removeChild(cartItems.firstChild);
		}
		updateCartTotal();
	});
