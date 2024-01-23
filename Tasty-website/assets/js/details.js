let id = new URLSearchParams(window.location.search).get("id");
const details = document.querySelector(".details");
const BASE_URL = "http://localhost:8080/products";

async function getData() {
  const res = await axios(`${BASE_URL}`);
  console.log(res.data);
  drawMenu(res.data);
}
getData();

function drawMenu(data) {
  data.forEach((element) => {
    if (element.id == id) {
      details.innerHTML = `<div class="menu-card">
            <div class="img">
              <img src="${element.image}" alt="" />
            </div>
            <div class="menu-text">
              <h4>"${element.title}"</h4>
              <p>"${element.desc}"</p>
            </div>
            <p>"${element.price}"</p>
          </div>`;
    }
  });
}
