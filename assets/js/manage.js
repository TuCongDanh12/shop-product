const tbody = document.querySelector("tbody");
fetch("https://fakestoreapi.com/products?limit=6")
  .then((res) => res.json())
  .then((json) => manage(json));

const manage = (products) => {
  
  products.forEach((product) => {
    let trTable = `
        <tr>
          <th scope="row">${product.id}</th>
          <td>${product.title}</td>
          <td>${product.price}</td>
          <td>${product.description}</td>
          <td>${product.image}</td>
          <td>${product.category}</td>
          <td>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${product.id}">
          Edit
        </button>
        <button id="delete${product.id}" type="button" class="btn btn-danger" > Delete</button>
        
        <!-- Modal -->
        <div class="modal fade" id="exampleModal${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa sản phấm ${product.id}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <form id="editForm">
              
              <div class="form-group">
                <label for="editTitle${product.id}">Title</label>
                <input type="text" class="form-control" id="editTitle${product.id}" name="title" value="${product.title}" required>
              </div>
              <div class="form-group">
                <label for="editPrice${product.id}">Price</label>
                <input type="text" class="form-control" id="editPrice${product.id}" value="${product.price}" required>
              </div>
              <div class="form-group">
                <label for="editDescription${product.id}">Description</label>
                <input type="text" class="form-control" id="editDescription${product.id}" name="description" value="${product.description}" required>
              </div>
              <div class="form-group">
                <label for="editImage${product.id}">Image</label>
                <input type="text" class="form-control" id="editImage${product.id}" name="image" value="${product.image}" required>
              </div>
              <div class="form-group">
                <label for="editCategory${product.id}">Category</label>
                <input type="text" class="form-control" id="editCategory${product.id}" name="category" value="${product.category}" required>
              </div>
            </form>
              </div>
              <div class="modal-footer">
                <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="saveChanges${product.id}" type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
              
          </td>
        
        </tr>
        

      `;
    tbody.innerHTML += trTable;
    // update(product.id)
    // console.log(saveButtons);
  });
  products.forEach((product) => {
    update(product.id);
    deleteProduct(product.id)
    console.log(saveButtons);
    console.log(deleteButtons);
  });
  
};

let saveButtons = []
const update = (id) => {
  let saveButton = document.getElementById(`saveChanges${id}`);
  saveButtons[id-1] = saveButton;
  saveButtons[id-1].addEventListener('click',function() {
    
    const title = document.getElementById(`editTitle${id}`).value;
    console.log(title);
    const price = document.getElementById(`editPrice${id}`).value;
    const description = document.getElementById(`editDescription${id}`).value;
    const image = document.getElementById(`editImage${id}`).value;
    const category = document.getElementById(`editCategory${id}`).value;

    // Gửi yêu cầu PUT đến API
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json"
      // },
      body: JSON.stringify({
        title: title,
        price: parseFloat(price),
        description: description,
        image: image,
        category: category
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(error => console.error('Error:', error));
  });
}



let deleteButtons = []
const deleteProduct = (id) => {
  let  deleteButton= document.getElementById(`delete${id}`);
  deleteButtons[id-1] = deleteButton;
  deleteButtons[id-1].addEventListener('click',function() {
    
    confirm('Are you sure you want to delete')
    fetch(`https://fakestoreapi.com/products/${id}`,{
      method:"DELETE"
  })
      .then(res=>res.json())
      .then(json=>console.log(json))

  });
}


const saveAdd = document.getElementById("saveAdd")

saveAdd.addEventListener("click",()=>{
  const title = document.getElementById('addTitle').value;
  console.log(title);
  const price = document.getElementById('addPrice').value;
  const description = document.getElementById('addDescription').value;
  const image = document.getElementById('addImage').value;
  const category = document.getElementById('addCategory').value;

  fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: title,
                    price: price,
                    description: description,
                    image: image,
                    category: category
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
})