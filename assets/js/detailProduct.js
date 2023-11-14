const imageProduct = document.querySelector(".image-product");
const descriptionProduct = document.querySelector(".description");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
let countProduct=0
fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((response) => response.json())
  .then((product) => detailProduct(product));

const detailProduct = (product) => {
  let image = `<img src="${product.image}" alt="Card image">`;
  // console.log(image)
  imageProduct.innerHTML = image;

  let description = `
        <h3>${product.title}</h3>
        <p class="text-info"><i><b>${product.category}</b></i><p>
        <p class="mt-5 des"><strong>Description:</strong> ${product.description} </p>

        <div class="row form-group mt-5">
        <label class="col-3"for="size"><b>Size:</b></label>
        <div class="size-options col-7">
            <div class="row justify-content-center">
                <div class="size-option col-3 selected">S</div>
                <div class="size-option col-3" >M</div>
                <div class="size-option col-3">L</div>
            </div>
        </div>
        
    </div>
    <button class="btn btn-primary mt-5 add-to-card" >Add to Cart</button>
    `;
  descriptionProduct.innerHTML = description;
  const sizeOptions = document.querySelectorAll(".size-option");
  getColorOption(sizeOptions);
  const event = new Event('productsAdded');
  document.dispatchEvent(event);
 
};

const getColorOption = (sizeOptions) => {
  sizeOptions.forEach((sizeOption, index) => {
    sizeOption.addEventListener("click", () => {
      sizeOptions.forEach((option) => {
        option.classList.remove("selected");
      });
      
      sizeOption.classList.add("selected");
    });
  });
};

