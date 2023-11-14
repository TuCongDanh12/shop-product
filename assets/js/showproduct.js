const allProduct = document.querySelector(".allProduct");
fetch("https://fakestoreapi.com/products?limit=6")
  .then((res) => res.json())
  .then((json) => showProduct(json));

const showProduct = (products) => {
  products.forEach((product) => {
    let item = `
    <a class="col-lg-3 col-sm-5 col-11 m-3" href="detailProduct.html?id=${product.id}">
        <div class="card" data-product-id="${product.id}">
        <img class="card-img-top p-2" src="${product.image}" alt="Card image">
        <div class="card-body">
          <h4 class="card-title mt-3">${product.title}</h4>
          <button class="add-to-card" data-product-id="${product.id}">Add to Cart</button>
        </div>
       
        <div class="card-footer mb-3">
        <div class="rating">
          ${generateRatingStars(product.rating.rate)}
        </div>
        <h3 class="priceValue">${product.price}</h3>
            
        </div>
      </div>
    </a>
        `;
    allProduct.innerHTML += item;
  });
  const event = new Event('productsAdded');
  document.dispatchEvent(event);
};
function generateRatingStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push('<span class="star">&#9733;</span>');
    } else {
      stars.push('<span class="star">&#9734;</span>');
    }
  }
  return stars.join("");
}
