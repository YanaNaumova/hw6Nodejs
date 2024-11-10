const btnAddUser = document.querySelector(".user");
const btnAddProduct = document.querySelector(".product");
const URL = "http://127.0.0.1:3333";

btnAddUser.addEventListener("click", async () => {
  const response = await fetch(URL + "/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "yana",
      email: "yana@gmail.com",
    }),
  });
  const data = await response.json();
  console.log(data);
});

btnAddProduct.addEventListener("click", async () => {
  const response = await fetch(URL + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "handy",
      price: 200,
    }),
  });

  const data = await response.json();
  console.log(data);
});
