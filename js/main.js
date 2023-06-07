import {perfumesMarcas, listaProductos, categories, cauroselItems} from "./data.js"
import { navbar } from "./basicLayout.js";


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
    listaProductos.forEach(producto => {

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