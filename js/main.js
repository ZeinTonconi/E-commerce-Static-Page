

const perfumesMarcas = [
    {marca: "Christian Dior", imgUrl: "img/diorPerfume.webp"},
    {marca: "BVLGARI", imgUrl: "img/bvlgariPerfume.avif"},
    {marca: "BURBERRY", imgUrl: "img/burberryPerfume.webp"},
    {marca: "Todos"}
]

const productos = [
    {
        nombre: "Chanel No 5 EAU premiere",
        precio: 100,
        descripcion: "tiene un aroma muy complejo de aldehídos y flores como rosas, jazmín, y lang-ylang, iris y lirio de los valles; todo esto sobre una base cálida y amaderada de sándalo, vainilla, ámbar y pachulí.",
        tags: ["perfume", "Chanel"],
        imgUrl: "img/chanel_No_5.png"
    },
    {
        nombre: "Chanel Coco Mademoiselle",
        precio: 60,
        descripcion: "",
        tags: ["perfume","Chanel"],
        imgUrl: "img/chanelCoco.png"
    }
]

const categories = [
    {item: "Perfumes", subNavbar: perfumesMarcas, imgUrl: "img/categoriaPerfume.webp" },
    {item: "Collares" , imgUrl: "img/categoriaCollar.jpg"},
    {item: "Anillos", imgUrl: "img/categoriaAnillo.jpg" },
    {item: "Aretes", imgUrl: "img/categoriaArete.jpeg"},
    {item: "Vapers", imgUrl: "img/categoriaVaper.webp"}
]

const cauroselItems = [
    {
        header: "",
        title: "Nueva Miss Dior Eau de Parfum",
        imgUrl: "img/gucciCampania.jpg" 
    },
    {
        header: "NUUBEZ Vaper Sin Nicotina",
        title: "Vaper sabor Sandia",
        imgUrl: "img/carousel-2.jpg"
    }
]

const navbar = () => {
    const navbar=document.getElementById('navbar-tienda-div');
    categories.forEach(item => {
        
        if(item.subNavbar){
            const subNavbarDiv = document.createElement('div'); 
            subNavbarDiv.setAttribute('class',"nav-item dropdown");
            subNavbarDiv.innerHTML = `<a href="#" class="nav-link" data-toggle="dropdown">
                                            ${item.item} <i class="fa fa-angle-down float-right mt-1"></i>
                                      </a>`

            const subNavbar = document.createElement('div');
            subNavbar.setAttribute('class', "dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0");
            item.subNavbar.forEach(subItem => {
                const subNavbarItem = document.createElement('a');
                subNavbarItem.setAttribute('class',"nav-item nav-link")
                subNavbarItem.innerText = subItem.marca
                subNavbar.appendChild(subNavbarItem);
            })
            subNavbarDiv.appendChild(subNavbar);
            navbar.appendChild(subNavbarDiv);
        }
        else{
            const navbarItem = document.createElement('a');
            navbarItem.setAttribute('class',"nav-item nav-link");
            navbarItem.innerText = item.item;
            navbar.appendChild(navbarItem);
        }

    });
}

const carousel = () => {
    const carouselDiv = document.getElementById('carouselDiv');
    cauroselItems.forEach((item,index) => {
        const carouselItem = document.createElement('div');
        carouselItem.setAttribute('class',`carousel-item ${(index===0)?"active":""}`);
        carouselItem.setAttribute('style',"height: 410px;")
        carouselItem.innerHTML = `
                                <img class="img-fluid" src="${item.imgUrl}" alt="Image">
                                <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                    <div class="p-3" style="max-width: 700px;">
                                        <h4 class="text-light text-uppercase font-weight-medium mb-3">${item.header}</h4>
                                        <h3 class="display-4 text-white font-weight-semi-bold mb-4">${item.title}</h3>
                                        <a href="" class="btn btn-light py-2 px-3">Compra Ahora!</a>
                                    </div>
                                </div>
                                `
        carouselDiv.appendChild(carouselItem);
    });

}

const showTags = () => {
    const categoryCards = document.getElementById('categoryCards');
    categories.forEach(item => {
        const div = document.createElement('div');
        div.setAttribute('class', "col-lg-4 col-md-6 pb-1");
        div.innerHTML = `
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="${item.imgUrl}" alt="">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">${item.item}</h5>
                        </div>
        `;
        categoryCards.appendChild(div);
    });
}

const showProductos = () => {
    const perfumesCardsDiv = document.getElementById('perfumesCardsDiv');
    productos.forEach(producto => {

        const perfumeCard = document.createElement('div');
        perfumeCard.setAttribute('class',"col-lg-3 col-md-6 col-sm-12 pb-1");
        perfumeCard.innerHTML = `
                                <div class="card product-item border-0 mb-4">
                                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img style="height:30rem;"class="img-fluid w-100" src="${producto.imgUrl}">
                                    </div>
                                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 class="text-truncate mb-3">${producto.nombre}</h6>
                                        <div class="d-flex justify-content-center">
                                            <h6>$${producto.precio}</h6>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                        <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                    </div>
                                </div>`
        perfumesCardsDiv.appendChild(perfumeCard)
    })
}


navbar();
carousel();
showTags();
showProductos();