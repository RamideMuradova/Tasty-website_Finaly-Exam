let allInputs = document.querySelectorAll("input");
let form = document.querySelector("form");
let tbody = document.querySelector("tbody");
let select = document.querySelector("select");
let searchInp = document.querySelector(".search");
let sortBtn = document.querySelector(".sortBtn");

let menuArr;
let copyMenuArr;
const BASE_URL = `http://localhost:8080/products`;

// get

async function getAllProducts() {
    const res = await axios(`${BASE_URL}`);
    console.log(res.data);
    menuArr=res.data
    copyMenuArr=[...res.data]
    drawTable(res.data)
  }
  getAllProducts();




// draw table

function drawTable(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    tbody.innerHTML += `
        <tr>
        <td>${element.id}</td>
        <td>
        <img src="${element.image}" />
        </td>
        <td>${element.title}</td>
        <td>${element.desc}</td>
        <td>${element.price}</td>
        <td>
        <button class="delete" onclick=deletemenu(${element.id},this)>Delete</button>
        </td>

        </tr>
        `;
  });
}

// add- post

form.addEventListener("submit", async function () {
  try {
    let obj = {
      image: allInputs[0].value,
      title: allInputs[1].value,
      desc: allInputs[2].value,
      price: allInputs[3].value,
      category: select.value,
    };
    if (allInputs[1].value && allInputs[2].value && allInputs[3].value) {
      await axios.post(`${BASE_URL}`, obj);
      getAllProducts();
    } else {
      alert("Input bosdur");
    }
  } catch (error) {
    console.log(error);
  }
});

// delete

async function deletemenu(id, btn) {
  try {
    if (confirm("are you sure ")) {
      await axios.delete(`${BASE_URL}/${id}`);
      btn.closest("tr").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

// search

searchInp.addEventListener("input", function (e) {
  let filtered = menuArr.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value)
  );
  drawTable(filtered);
});

// sort

sortBtn.addEventListener("click", function () {
  let sorted;
  if (sortBtn.innerText === "Asc") {
    this.innerText = "Desc";
    sorted = menuArr.sort((a, b) =>
      a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())
    );
  } else if (sortBtn.innerText === "Desc") {
    this.innerText = "Def";
    sorted = menuArr.sort((a, b) =>
      b.title.toLocaleLowerCase().localeCompare(a.title.toLocaleLowerCase())
    );
  } else if (sortBtn.innerText === "Def") {
    sorted = copyMenuArr;
  }
  drawTable(sorted);
});


