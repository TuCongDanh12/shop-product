const allProduct = document.querySelector(".allProduct");
fetch("https://fakestoreapi.com/products?limit=6")
  .then((res) => res.json())
  .then((json) => showProduct(json));

const showProduct = (products) => {
  products.forEach((product) => {
    let item = `
        <div class="card col-lg-3 col-sm-5 col-11 m-3">
        <img class="card-img-top" src="${product.image}" alt="Card image">
        <div class="card-body">
          <h4 class="card-title mt-3">${product.title}</h4>
    
        </div>
       
        <div class="card-footer mb-3">
        <div class="rating">
          ${generateRatingStars(product.rating.rate)}
        </div>
        <h3>$${product.price}<h3>
            
        </div>
      </div>
        
        `;
    allProduct.innerHTML += item;
  });
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
