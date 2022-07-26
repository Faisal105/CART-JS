// function addToCartClicked(e) {
// 	var button = e.target;
// 	var shopItem = button.parentElement;
// 	var title = shopItem.getElementsByClassName('card-title')[0].innerText;
// 	const price = e.target.nextElementSibling.textContent;
// 	const img = e.target.parentElement.previousElementSibling.src;
// 	addItemToCart(title, price, img);
// 	// updateCartTotal();
// }

// const products = [
// 	{
// 		id: 1,
// 		name: 'Prod 1',
// 		price: '5$',
// 	},
// 	{
// 		id: 2,
// 		name: 'Prod 2',
// 		price: '15$',
// 	},
// 	{
// 		id: 3,
// 		name: 'Prod 3',
// 		price: '25$',
// 	},
// 	{
// 		id: 4,
// 		name: 'Prod 4',
// 		price: '35$',
// 	},
// ];

// let cart = {};
// const container = document.getElementById('container');
// const cartContainer = document.getElementById('cart');

// function updateInfo() {
// 	const cartItemDom = Object.keys(cart)
// 		.map((key) => {
// 			const itemObj = cart[key];
// 			return `
//         <li>
//           <span>Total items added: ${itemObj.count}</span> |
//           <span>Prod name: ${itemObj.prod.name}</span> |
//           <span>Cost: ${itemObj.count * parseInt(itemObj.prod.price)}</span>
//         </li>
//       `;
// 		})
// 		.join('');
// 	cartContainer.innerHTML = cartItemDom;
// }

// const localStorageCart = localStorage.getItem('cart');
// const cartObj = JSON.parse(localStorageCart);
// cart = cartObj;
// updateInfo();

// const prods = products
// 	.map((prod) => {
// 		const template = `<li>
//       <p>${prod.price}</p>
//       <h1>${prod.name}</h1>
//       <button data-prodid="${prod.id}">Add to cart</button>
//     </li>`;
// 		return template;
// 	})
// 	.join('');

// container.innerHTML = prods;
// container.querySelectorAll('button').forEach((btn) => {
// 	btn.addEventListener('click', () => {
// 		const prodid = parseInt(btn.getAttribute('data-prodid'));
// 		const prod = products.find((prod) => prod.id === prodid);
// 		if (cart[prodid] === undefined) {
// 			cart[prodid] = {
// 				count: 1,
// 				prod: prod,
// 			};
// 		} else {
// 			cart[prodid] = {
// 				count: cart[prodid].count + 1,
// 				prod: prod,
// 			};
// 		}
// 		localStorage.setItem('cart', JSON.stringify(cart));

// 		updateInfo();
// 		console.log(cart);
// 	});
// });

// // JSON.parse();
// // JSON.stringify();
// // const input = document.querySelector('#input');
// // const span = document.querySelector('#last-message');

// // if (localStorage.getItem('typed') !== null) {
// //   span.textContent = localStorage.getItem('typed');
// // }

// // input.addEventListener('keyup', (e) => {
// //   localStorage.setItem('typed', input.value);
// // })

//

//Remove Button
var removeCartItemButton = document.getElementsByClassName('btn-danger');
// In Order to access all the button we loop through it
for (var i = 0; i < removeCartItemButton.length; i++) {
	var button = removeCartItemButton[i];
	button.addEventListener('click', (e) => {
		var buttonClicked = e.target;
		buttonClicked.parentElement.parentElement.remove();
		updateCartTotal();
	});
}

//update Total FUnction
function updateCartTotal() {
	var itemContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = itemContainer.getElementsByClassName('cart-row');
	var total = 0;
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var quantityElement = cartRow.getElementsByClassName(
			'cart-quantity-input',
		)[0];
		var price = priceElement.innerText.replace('$', '');

		var quantity = quantityElement.value;

		// console.log(quantity);
		total = total + price * quantity;
	}
	//rounding off total
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName('cart-total-price')[0].innerHTML =
		'$' + total;
}

//Quantity Update
var quantityInput = document.getElementsByClassName('cart-quantity-input');
for (var i = 0; i < quantityInput.length; i++) {
	var input = quantityInput[i];
	input.addEventListener('change', quantityChange);
}
function quantityChange(event) {
	var input = event.target;
	// console.log(input.value);
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}
// Add TO Cart
var addToCartButton = document.getElementsByClassName('shop-now');
for (var i = 0; i < addToCartButton.length; i++) {
	var button = addToCartButton[i];
	button.addEventListener('click', addToClicked);
}
function addToClicked(e) {
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

	console.log();
	updateCartTotal();
}
function addItemToCart(product) {
	console.log(product);
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
		.addEventListener('click', removeCartItemButton);
	cartRow
		.getElementsByClassName('cart-quantity-input')[0]
		.addEventListener('change', quantityChange);
}

// PurchaseButton
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
