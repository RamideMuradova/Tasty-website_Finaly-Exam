const BASE_URL = `http://localhost:8080/products`;
const menuCards = document.querySelector(".menu-cards");
const main = document.querySelector(".main");
const dessert = document.querySelector(".dessert");
const drinks = document.querySelector(".drinks");

const btns = document.querySelectorAll(".btn");
let arr;
async function getAllProducts() {
  const res = await axios(`${BASE_URL}`);
  arr = res.data;
  console.log(res.data);
  drawMenu(res.data);
}
getAllProducts();
function drawMenu(data) {
  menuCards.innerHTML = "";
  data.forEach((element) => {
    menuCards.innerHTML += `<div class="menu-card">
      <div class="img">
        <img src="${element.image}" alt="" />
      </div>
      <div class="menu-text">
        <h4>"${element.title}"</h4>
        <p>"${element.desc}"</p>
      </div>
      <p>"${element.price}"</p>
      <a href="details.html" onclick="deletebtn(${element.id},this)"></a>
      <button class="delete" onclick=deletebtn(${element.id})>DELETE</button>
    </div>
         `;
  });
}
main.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.category == "main");
  drawMenu(filtered);
});
dessert.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.category == "dessert");
  drawMenu(filtered);
});
drinks.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.category == "drinks");
  drawMenu(filtered);
});

btns.forEach((element) => {
  element.addEventListener("click", function () {
    document.querySelector(".buttons .active").classList.remove("active");
    this.classList.add("active");
  });
});

async function deletebtn(id, btn) {
  if (confirm("are you sure delete???")) {
    await axios.delete(`${BASE_URL}/${id}`);
    btn.closest(".card").remove();
  }
}
