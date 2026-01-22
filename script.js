// Firebase конфиг
const firebaseConfig = {
  apiKey: "ТВОЙ_API_KEY",
  authDomain: "ТВОЙ_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://ТВОЙ_PROJECT_ID.firebaseio.com",
  projectId: "ТВОЙ_PROJECT_ID",
  storageBucket: "ТВОЙ_PROJECT_ID.appspot.com",
  messagingSenderId: "ТВОЙ_SENDER_ID",
  appId: "ТВОЙ_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const productsDiv = document.getElementById("products");
const cartUl = document.getElementById("cart");
let cart = [];

// Загружаем товары с Firebase
db.ref('products').on('value', snapshot => {
  const products = snapshot.val();
  productsDiv.innerHTML = "";
  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <strong>${product.name}</strong> - $${product.price}
      <button onclick="addToCart(${index})">Добавить в корзину</button>
    `;
    productsDiv.appendChild(div);
  });
});

// Корзина покупателя
function addToCart(index) {
  cart.push(index);
  renderCart();
}

function renderCart() {
  cartUl.innerHTML = "";
  cart.forEach((i, idx) => {
    const li = document.createElement("li");
    li.textContent = `Товар #${i + 1}`;
    li.innerHTML += `<button onclick="removeFromCart(${idx})">Удалить</button>`;
    cartUl.appendChild(li);
  });
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
}
