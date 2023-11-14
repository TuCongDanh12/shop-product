
// fetch("https://fakestoreapi.com/products?limit=6")
//   .then((res) => res.json())
//   .then((json) => showProduct(json));

document.addEventListener('productsAdded', () => {
		wordToCard()
  });

const wordToCard =() =>{
  let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
  if(!productsInCart){
	  productsInCart = [];
  }
  const parentElement = document.querySelector('#buyItems');
  const cartSumPrice = document.querySelector('#sum-prices');
  const products = document.querySelectorAll('.card');
	  console.log(products);
const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum.toFixed(2);
}

const countTheProduct = () => {
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.count;
	})
	return sum;
}
const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		document.querySelector('.totalPrice').classList.remove('hidden');
		console.log('hi')

		document.querySelector('#quatity').innerHTML = countTheProduct()
		// cartSumPrice.innerHTML = '$' + countTheSumPrice();
		const sum = countTheSumPrice();
		console.log(sum)
		document.querySelector('.totalPrice').innerHTML = 'Total: $' + sum
	}
	else {
		// 
		document.querySelector('.checkout').classList.add('hidden');
		document.querySelector('.totalPrice').classList.add('hidden')
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
		document.querySelector('#quatity').innerHTML = 0
		
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	console.log(item)
	item.addEventListener('click', (e) => {
		console.log(e.target.classList.contains('add-to-card'))
		if (e.target.classList.contains('add-to-card')) {
			e.preventDefault();
			console.log('successfully added')
			const productID = e.target.dataset.productId;
			console.log(productID)
			const productName = item.querySelector('.card-title').innerHTML;
			console.log(productName)
			const productPrice = item.querySelector('.priceValue').innerHTML;
			console.log(productPrice)
			const productImage = item.querySelector('.card-img-top').src;
			console.log(productImage)
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();
}