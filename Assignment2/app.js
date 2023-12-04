
let ct_id = "1000";
const loadCategories = (all) => {
    fetch(` https://openapi.programming-hero.com/api/videos/${all}`)
        .then((res) => res.json())
        .then((categories) => displayCategory(categories.data));
};


 
const displayCategory = (categories) => {
    const menu_container = document.getElementById("menu_container");
    categories.forEach((data) => {
        // const menus = document.createElement("div");
        // menus.classList.add("category");
 
        // menus.innerHTML = `
        //     <div onclick="loadData('${data.category_id}')" id="menu" class="btn">${data.category}</div>
        // `;

        // menu_container.appendChild(menus);
       
        // menus.addEventListener("click", ()=>{
        //     handleButton(menus,data.category_id);
        // })

        let category = data.category;
        let id = data.category_id;

        const button = document.createElement("button");
        button.textContent = category;
        button.className = "rounded categoryBtn";
        button.addEventListener("click", ()=>{
            handleButton(button,id);
        });

        menu_container.appendChild(button);
    });

    
};

const handleButton=(button, id)=>{
    //  menus.style.backgroudColor="red";
    // menus.classList.add("btn-warning");
    document.querySelectorAll(".categoryBtn").forEach((btn)=>{
        btn.classList.remove("bg-danger");

    });

    button.classList.add("bg-danger");
    ct_id = id;
    loadData(id);
}
 
const loadData = (id, defaul = "") => {
    const card_container = document.getElementById("card_container");
    
    // const btnActive = 
    

    if (id == "1005") {
        
        card_container.innerHTML = "";
        const error_container = document.createElement("div");
        error_container.classList.add("error")
        error_container.innerHTML = `
     <img  src="./assets/Icon.png" alt="">
     <h4 class="text-center">Oops!! Sorry, There is no<br> content here</h4>
     `;
        card_container.appendChild(error_container);
    } else {
        fetch(`https://openapi.programming-hero.com/api/videos/category/${id ? id : defaul}`)
            .then((res) => res.json())
            .then((data) => displayData(data.data));
    }
}
 
const displayData = (item) => {
    const card_container = document.getElementById("card_container");
 
 
    card_container.innerHTML = "";
 
    item.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("box");
 
        const hour = Math.floor(item.others.posted_date / 3600);
        const min = Math.floor((item.others.posted_date % 3600) / 60);
 
        card.innerHTML = `
    <img class="card-img rounded" src=${item.thumbnail} alt="">
    ${item.others.posted_date ? `<div class="publish">${hour} hours ${min} min</div>` : ""}
    <div class="card_heading">
        <img class="profile-img" src=${item.authors[0].profile_picture} alt="">
        <div class="title">${item.title}</div>
    </div>
    <div class="card-body ms-5">
        <div class="profile-name d-flex align-items-center">
          <h5 class="">${item.authors[0].profile_name}</h5>
          ${item.authors[0].verified? `<i class="fa fa-check-circle p-2" style="color:#377df6;"></i>`:""}
        </div>
        <div class="views">${item.others.views} views</div>
    </div>
 
        `;
        card_container.appendChild(card);
    });
};
 
const loadForSort = () => {
    
        fetch(`https://openapi.programming-hero.com/api/videos/category/${ct_id}`)
            .then((res) => res.json())
            .then((data) => sortData(data.data));
    
}
 
const sortData = (item) => {
     
    item.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views))

    displayData(item);
}
 
loadCategories("categories");
 
loadData("", "1000");

