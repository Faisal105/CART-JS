class CartItem {
	constructor(name, desc, img, price) {
		this.name = name;
		this.desc = desc;
		this.img = img;
		this.price = price;
		this.quantity = 1;
	}
}

class LocalCart {
	static key = 'cartItems';

	static getLocalCartItems() {
		let cartMap = new Map();
		const cart = localStorage.getItem(LocalCart.key);
		if (cart === null || cart.length === 0) return cartMap;
		return new Map(Object.entries(JSON.parse(cart)));
	}

	static addItemToLocalCart(id, item) {
		let cart = LocalCart.getLocalCartItems();
		if (cart.has(id)) {
			let mapItem = cart.get(id);
			mapItem.quantity += 1;
			cart.set(id, mapItem);
		} else cart.set(id, item);
		localStorage.setItem(
			LocalCart.key,
			JSON.stringify(Object.fromEntries(cart)),
		);
		updateCartUI();
	}

	static removeItemFromCart(id) {
		let cart = LocalCart.getLocalCartItems();
		if (cart.has(id)) {
			let mapItem = cart.get(id);
			if (mapItem.quantity > 1) {
				mapItem.quantity -= 1;
				cart.set(id, mapItem);
			} else cart.delete(id);
		}
		if (cart.length === 0) localStorage.clear();
		else
			localStorage.setItem(
				LocalCart.key,
				JSON.stringify(Object.fromEntries(cart)),
			);
		updateCartUI();
	}
}

const cartIcon = document.querySelector('.cart');
const cartWindow = document.querySelector('.cart-window');
cartWindow.inWindow = 0;
const addToCartBtn = document.querySelectorAll('.shop-now');
addToCartBtn.forEach((btn) => {
	btn.addEventListener('click', addItemFunction);
});

function addItemFunction(e) {
	const id =
		e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
	const img = e.target.parentElement.previousElementSibling.src;
	const name =
		e.target.previousElementSibling.previousElementSibling.textContent;
	const desc = e.target.previousElementSibling.textContent;
	const price = e.target.nextElementSibling.textContent;
	//price = price.replace('Price: $', '');
	const item = new CartItem(name, img, desc, price);
	LocalCart.addItemToLocalCart(id, item);
	console.log(price);
}

cartIcon.addEventListener('mouseover', () => {
	if (cartWindow.classList.contains('hide'))
		cartWindow.classList.remove('hide');
});

cartIcon.addEventListener('mouseleave', () => {
	// if(wholeCartWindow.classList.contains('hide'))
	setTimeout(() => {
		if (cartWindow.inWindow === 0) {
			cartWindow.classList.add('hide');
		}
	}, 500);
});

cartWindow.addEventListener('mouseover', () => {
	cartWindow.inWindow = 1;
});

cartWindow.addEventListener('mouseleave', () => {
	cartWindow.inWindow = 0;
	cartWindow.classList.add('hide');
});

function updateCartUI() {
	const cartWrapper = document.querySelector('.cart-wrapper');
	cartWrapper.innerHTML = '';
	const items = LocalCart.getLocalCartItems();
	if (items === null) return;
	let count = 0;
	let total = 0;
	for (const [key, value] of items.entries()) {
		const cartItem = document.createElement('div');
		cartItem.classList.add('cart-item');
		let price = value.price * value.quantity;
		price = Math.round(price * 100) / 100;
		count += 1;
		total += price;
		total = Math.round(total * 100) / 100;
		cartItem.innerHTML = `
        <img src="${value.img}"> 
                       <div class="details">
                           <h3>${value.name}</h3>
                           <p>${value.desc}
                            <span class="quantity">Quantity: ${value.quantity}</span>
                               <span class="price">Price: $ ${price}</span>
                           </p>
                       </div>
                       <div class="delete"><i class="bi bi-trash"></i></div>
        `;
		cartItem.lastElementChild.addEventListener('click', () => {
			LocalCart.removeItemFromCart(key);
		});
		cartWrapper.append(cartItem);
	}

	if (count > 0) {
		cartIcon.classList.add('non-empty');
		let root = document.querySelector(':root');
		root.style.setProperty('--after-content', `"${count}"`);
		const subtotal = document.querySelector('.sub-total');
		subtotal.innerHTML = `SubTotal: $${total}`;
	} else cartIcon.classList.remove('non-empty');
}
document.addEventListener('DOMContentLoaded', () => {
	updateCartUI();
});

// class CartItem {
// 	constructor(name, img, desc, price) {
// 		this.name = name;

// 		this.img = img;
// 		this.desc = desc;
// 		this.price = price;
// 		this.quantity = 1;
// 	}
// }

// class LocalCart {
// 	static key = 'cartItems';

// 	static getLocalCartItems() {
// 		let cartMap = new Map();
// 		const cart = localStorage.getItem(LocalCart.key);
// 		if (cart == null || cart.length === 0) return cartMap;
// 		return new Map(Object.entries(JSON.parse(cart)));
// 	}
// 	static addItemToLocalCart(id, item) {
// 		let cart = LocalCart.getLocalCartItems();
// 		if (cart.has(id)) {
// 			let item = cart.get(id);
// 			mapItem.quantity += 1;
// 			cart.set(id, mapItem);
// 		} else {
// 			cart.set(id, item);
// 			localStorage.setItem(
// 				LocalCart.key,
// 				JSON.stringify(Object.fromEntries(cart)),
// 			);
// 			updateCartUI();
// 		}
// 	}
// 	static removeItemFromCart(id) {
// 		let cart = LocalCart.getLocalCartItems();
// 		if (cart.has(id)) {
// 			let mapItem = cart.get(id);
// 			if (mapItem.quantity > 0) {
// 				mapItem.quantity -= 1;
// 				cart.set(id, mapItem);
// 			} else {
// 				cart.delete(id);
// 			}
// 		}
// 		if (cart.length === 0) {
// 			localStorage.clear();
// 		} else {
// 			localStorage.setItem(
// 				LocalCart.key,
// 				JSON.stringify(Object.fromEntries(cart)),
// 			);
// 			updateCartUI();
// 		}
// 	}
// }

// const cartIcon = document.querySelector('.cart');
// const cartWindow = document.querySelector('.cart-window');
// cartWindow.inWindow = 0;
// const addToCartBtn = document.querySelectorAll('.shop-now');
// addToCartBtn.forEach((btn) => {
// 	btn.addEventListener('click', addItemFunction);
// });
// function addItemFunction(e) {
// 	const id =
// 		e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
// 	const img = e.target.parentElement.previousElementSibling.src;
// 	const name =
// 		e.target.previousElementSibling.previousElementSibling.textContent;
// 	const desc = e.target.previousElementSibling.textContent;
// 	const price = e.target.nextElementSibling.textContent;
// 	//price = price.replace('Price: $', '');
// 	const item = new CartItem(name, img, desc, price);
// 	LocalCart.addItemToLocalCart(id, item);
// 	console.log(price);
// }

// cartIcon.addEventListener('mouseover', () => {
// 	if (cartWindow.classList.contains('hide'))
// 		cartWindow.classList.remove('hide');
// });
// cartIcon.addEventListener('mouseleave', () => {
// 	//if (cartWindow.classList.contains('hide'))
// 	setTimeout(() => {
// 		if (cartWindow.inWindow === 0) {
// 			cartWindow.classList.add('hide');
// 		}
// 	}, 250);
// });
// cartWindow.addEventListener('mouseover', () => {
// 	cartWindow.inWindow = 1;
// });
// cartWindow.addEventListener('mouseleave', () => {
// 	cartWindow.inWindow = 0;
// 	cartWindow.classList.add('hide');
// });
// function updateCartUI() {
// 	const cartWrapper = document.querySelector('.cart-wrapper');
// 	cartWrapper.innerHTML = '';
// 	const items = LocalCart.getLocalCartItems('cartItems');
// 	if (items === null) return;
// 	let count = 0;
// 	let total = 0;
// 	for (const [key, value] of items.entries()) {
// 		const cartItem = document.createElement('div');
// 		cartItem.classList.add('cart-item');
// 		let price = value.price * value.quantity;
// 		count += 1;
// 		total += price;
// 		cartItem.innerHTML = `
//         <div class="cart-item">
//         <img src="./products/bbq.jpg" alt="">
//         <div class="content">
//             <h3>${value.name}</h3>
//             <p>${value.desc}
//                 <span class="quantity">Quantity: ${value.quantity}</span>
//                 <span class="price">Price: ${price}</span>
//             </p>
//         </div>
//         <div class="delete"><i class="bi bi-trash"></i></div>
//     </div>
//         `;
// 		cartItem.lastElementChild.addEventListener('click', () => {
// 			LocalCart.removeItemFromCart(key);
// 		});
// 		cartWrapper.append(cartItem);
// 	}
// 	if (count > 0) {
// 		cartIcon.classList.add('non-empty');
// 	} else {
// 		cartIcon.classList.remove('non-empty');
// 	}
// }
