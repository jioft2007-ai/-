firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const productList = document.getElementById("productList");

function loadProducts() {
  db.ref('products').once('value', snapshot => {
    const products = snapshot.val();
    productList.innerHTML = "";
    products.forEach((product, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - $${product.price} 
        <button onclick="removeProduct(${index})">Удалить</button>
        <button onclick="editProduct(${index})">Редактировать</button>`;
      productList.appendChild(li);
    });
  });
}
loadProducts();

function addProduct() {
  const name = document.getElementById("newName").value;
  const price = Number(document.getElementById("newPrice").value);
  db.ref('products').once('value', snapshot => {
    const products = snapshot.val() || [];
    products.push({name, price});
    db.ref('products').set(products);
    loadProducts();
  });
}

function removeProduct(index) {
  db.ref('products').once('value', snapshot => {
    const products = snapshot.val();
    products.splice(index, 1);
    db.ref('products').set(products);
    loadProducts();
  });
}

function editProduct(index) {
  const newName = prompt("Новое название:");
  const newPrice = prompt("Новая цена:");
  db.ref('products').once('value', snapshot => {
    const products = snapshot.val();
    if (newName) products[index].name = newName;
    if (newPrice) products[index].price = Number(newPrice);
    db.ref('products').set(products);
    loadProducts();
  });
}
