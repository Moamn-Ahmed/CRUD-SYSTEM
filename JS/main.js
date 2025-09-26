var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var currentIndex = 0;
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");


var nameRegex = /^[A-Za-z 0-9 ]{3,}$/;
var priceRegex = /^[1-9][0-9]*$/;    
var categoryRegex = /^(TV|Mobile|Laptop)$/i;  
var descRegex = /^.{4,}$/;           




productNameInput.oninput = function () {
  let msg = document.getElementById("nameError");
  if (!nameRegex.test(productNameInput.value)) {
    msg.textContent = "❌ Name must be at least 3 characters";
    msg.classList.remove("text-success");
    msg.classList.add("text-danger");
  } else {
    msg.textContent = "✅ Looks good!";
    msg.classList.remove("text-danger");
    msg.classList.add("text-success");
  }
  
};


productPriceInput.oninput = function () {
  let msg = document.getElementById("priceError");
  if (!priceRegex.test(productPriceInput.value)) {
    msg.textContent = "❌ Price must be a positive number";
    msg.classList.remove("text-success");
    msg.classList.add("text-danger");
  } else {
    msg.textContent = "✅ Valid price";
    msg.classList.remove("text-danger");
    msg.classList.add("text-success");
  }
};

productCategoryInput.oninput = function () {
  let msg = document.getElementById("categoryError");
  if (!categoryRegex.test(productCategoryInput.value)) {
    msg.textContent = "❌ Must be TV / Mobile / Laptop";
    msg.classList.remove("text-success");
    msg.classList.add("text-danger");
  } else {
    msg.textContent = "✅ Category ok";
    msg.classList.remove("text-danger");
    msg.classList.add("text-success");
  }
};

productDescriptionInput.oninput = function () {
  let msg = document.getElementById("descError");
  if (!descRegex.test(productDescriptionInput.value)) {
    msg.textContent = "❌ Description must be at least 4 characters";
    msg.classList.remove("text-success");
    msg.classList.add("text-danger");
  } else {
    msg.textContent = "✅ Description ok";
    msg.classList.remove("text-danger");
    msg.classList.add("text-success");
  }
};




var productList = [];

if (localStorage.getItem("productContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayData();
}

function addProduct() {

   if (
    !nameRegex.test(productNameInput.value) ||
    !priceRegex.test(productPriceInput.value) ||
    !categoryRegex.test(productCategoryInput.value) ||
    !descRegex.test(productDescriptionInput.value)
  ) {
    return; // مش هيضيف لو في غلط
  }
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0]?.name}`
      : "images/Default.jpg",
  };

  productList.push(product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
  console.log(productList);

  clearForm();
}

function clearForm() {
  (productNameInput.value = null),
    (productPriceInput.value = null),
    (productCategoryInput.value = null),
    (productDescriptionInput.value = null),
    (productImageInput.value = null);
  
  
  document.getElementById("nameError").textContent = "";
  document.getElementById("priceError").textContent = "";
  document.getElementById("categoryError").textContent = "";
  document.getElementById("descError").textContent = "";
  

  document.getElementById("nameError").classList.remove("text-success", "text-danger");
  document.getElementById("priceError").classList.remove("text-success", "text-danger");
  document.getElementById("categoryError").classList.remove("text-success", "text-danger");
  document.getElementById("descError").classList.remove("text-success", "text-danger");
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `
          <div class="col-sm-12 col-md-6 col-lg-3 ">
            <div class="card mx-auto" style="width: 18rem">
              <img src="${
                productList[i].image
              }" class="card-img-top object-fit-fill" height="300px" alt="${
      productList[i].name
    }" />
              <div class="card-body">
                <span class="badge bg-info">Index:${i + 1}</span>
                <h3 class="text-center fw-bold fs-4">Product Name:
                ${productList[i].name}</h3>
                <h6 class="mb-3">Product Price:${productList[i].price}</h6>
                <h6 class="mb-3">Product Category:${
                  productList[i].category
                }</h6>
                <h6 class="mb-3">Product Description:${
                  productList[i].description
                }</h6>
              </div>
              <div class="card-footer text-center my-1 p-3">
                <button onclick="deleteItem(${i})" type="button" class="btn btn-outline-danger">Delete</button>
                <button onclick="setUpdateItem(${i})" type="button"  class="btn btn-outline-warning">Update</button>
              </div>
            </div>
          </div>
        `;
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function deleteItem(index) {
  productList.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}

function searchData() {
  var term = searchInput.value;
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `
          <div class="col-sm-12 col-md-6 col-lg-3 ">
            <div class="card mx-auto" style="width: 18rem">
              <img src="${
                productList[i].image
              }" class="card-img-top object-fit-fill" height="300px" alt="${
        productList[i].name
      }" />
              <div class="card-body">
                <span class="badge bg-info">Index:${i + 1}</span>
                <h3 class="text-center fw-bold fs-4">Product Name:
                ${productList[i].name}</h3>
                <h6 class="mb-3">Product Price:${productList[i].price}</h6>
                <h6 class="mb-3">Product Category:${
                  productList[i].category
                }</h6>
                <h6 class="mb-3">Product Description:${
                  productList[i].description
                }</h6>
              </div>
              <div class="card-footer text-center my-1 p-3">
                <button onclick="deleteItem(${i})"  type="button" class="btn btn-outline-danger">Delete</button>
                <button type="button" class="btn btn-outline-warning">Update</button>
              </div>
            </div>
          </div>
        `;
    }
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function setUpdateItem(index) {
  currentIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;
  productImageInput.value = ""; 
  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

 
 function updateData(){
    var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `images/${productImageInput.files[0]?.name}`
      : "images/Default.jpg",
  };

  productList.splice(currentIndex , 1 , product)
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
    btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");

  

  clearForm();

}
