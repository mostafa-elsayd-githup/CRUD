let first = document.querySelector(".first");
let price = document.querySelector(".price-felad");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.getElementById("total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create = document.querySelector(".create");
let search = document.querySelector(".search-felad");
let searchTitle = document.querySelector(".search-title");
let searchCategory = document.querySelector(".search-category");
let deleteAll = document.querySelector(".delete-all");
let table = document.querySelector(".footer");
let tbody = document.getElementById("tbody");



function getTotal() {
    // console.log(price.value)
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = "#040";

    } else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }
}
let dataPro = [];
if (localStorage.product != null) {
     dataPro =JSON.parse(localStorage.product);
} else {
    dataPro = [];
}



create.onclick = function () {
    readData() 

    let newDataPro = {
        id: ++id  ,
        title: first.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    dataPro.push(newDataPro);
    localStorage.setItem("info", JSON.stringify(dataPro));
    clearData() 

}
function clearData() { 
    first.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
let id = 0;
function readData() {
    for (let i = 0; i < +count.value; i++) {
        tbody.innerHTML += `
        <tr>
            <td>${++id}</td>
            <td>${first.value}</td>
            <td>${price.value}</td>
            <td>${taxes.value}</td>
            <td>${ads.value}</td>
            <td>${discount.value}</td>
            <td>${total.innerHTML}</td>
            <td>${category.value}</td>
            <td><button class="update" onclick="">Update</button></td>
            <td><button class="delete"onclick="deleteItem()">Delete</button></td>
        </tr>
`
        let deleteItem = document.querySelectorAll(".delete");

        deleteItem.forEach((btn) => {
            btn.onclick = function () {
                btn.parentElement.parentElement.remove();
                localStorage.removeItem("info", JSON.stringify(dataPro));
            };
        });

        // updata
        let update = document.querySelectorAll(".update");
        update.forEach((btn) => {
            btn.addEventListener("click", () => {
                let storedData = JSON.parse(localStorage.getItem("info"));
                storedData.forEach((e) => {
                    first.value = e.title
                    price.value = e.price
                    taxes.value = e.taxes
                    ads.value = e.ads
                    discount.value = e.discount
                    total.innerHTML = e.total
                    count.value = e.count
                    category.value = e.category
                })
                localStorage.setItem("info", JSON.stringify(dataPro));
        
            })
        })

        };

    if (tbody.innerHTML != "") {
        deleteAll.style.display = "block";
        deleteAll.onclick = function () {
            if (tbody.innerHTML != "") {
                localStorage.clear();
                tbody.innerHTML = "";
                deleteAll.style.display = "none";
            };
        };
    } else {
        deleteAll.style.display = "none";
    };
};


