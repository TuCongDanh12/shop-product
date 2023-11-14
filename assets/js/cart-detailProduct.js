const allProduct = JSON.parse(localStorage.getItem("shoppingCart"));
// console.log(allProduct)

const countTheProduct = () => {
  let sum = 0;
  allProduct.forEach((item) => {
    sum += item.count;
    console.log(sum);
  });
  document.querySelector("#quatity").innerHTML = sum;
};
countTheProduct();


