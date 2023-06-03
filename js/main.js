

const perfumes = [
    {marca: "Christian Dior"},
    {marca: "BVLGARI"},
    {marca: "BURBERRY"},
    {marca: "Todos"}
]

const navbarItems = [
    {item: "Perfumes", subNavbar: perfumes},
    {item: "Collares" },
    {item: "Anillos" },
    {item: "Aretes" },
    {item: "Vapers"}
]

const cauroselItems = [
    {
        header: "",
        title: "Nueva Miss Dior Eau de Parfum",
        imgUrl: "img/carousel-1.jpg" 
    },
    {
        header: "NUUBEZ Vaper Sin Nicotina",
        title: "Vaper sabor Sandia",
        imgUrl: "img/carousel-2.jpg"
    }
]

const navbar = () => {
    const navbar=document.getElementById('navbar-tienda-div');
    navbarItems.forEach(item => {
        
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


navbar();
carousel();