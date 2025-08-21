// ================= TO-DO LIST LOGIC =================
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleComplete(${index})" style="cursor:pointer; flex:1;">
        ${task.completed ? `<s>${task.text}</s>` : task.text}
      </span>
      <button class="remove-btn" onclick="removeTask(${index})">🗑️</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskInput = document.getElementById("task");
  const text = taskInput.value.trim();

  if (!text) {
    alert("⚠️ Please enter a task!");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  loadTasks();
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

document.addEventListener("DOMContentLoaded", loadTasks);


// ================= PRODUCT FILTER & SORT =================
const products = [
  { name: "Book A", category: "books", price: 150, rating: 4.5, img: "https://via.placeholder.com/150" },
  { name: "Book B", category: "books", price: 120, rating: 4.2, img: "https://via.placeholder.com/150" },
  { name: "Headphones", category: "electronics", price: 999, rating: 4.7, img: "https://via.placeholder.com/150" },
  { name: "Speaker", category: "electronics", price: 1499, rating: 4.6, img: "https://via.placeholder.com/150" },
];

function displayProducts(filtered = products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (!filtered.length) {
    productList.innerHTML = "<p>No products found ❌</p>";
    return;
  }

  filtered.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" class="product-img">
      <h3>${p.name}</h3>
      <p><b>Category:</b> ${p.category}</p>
      <p><b>Price:</b> ₹${p.price}</p>
      <p><b>Rating:</b> ⭐ ${p.rating}</p>
    `;
    productList.appendChild(div);
  });
}

function updateProducts() {
  const category = document.getElementById("categoryFilter").value;
  const sortBy = document.getElementById("sortOption").value;

  let filtered = category === "all" ? [...products] : products.filter(p => p.category === category);

  switch (sortBy) {
    case "price":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  displayProducts(filtered);
}

document.addEventListener("DOMContentLoaded", () => displayProducts());
