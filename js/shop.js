import { navbar } from "./basicLayout.js";
import { filtroFragancia, filtroPrecio, perfumesMarcas, productos } from "./data.js";

const filtros = () => {
    const precioDiv = document.getElementById('filtroPrecio');
    filtroPrecio.forEach((filtro,index) => {
        const filtroOpcion = document.createElement('div');
        filtroOpcion.setAttribute('class',"custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3");
        filtroOpcion.innerHTML = `
                                <input type="checkbox" class="custom-control-input" id="precio-${index}">
                                <label class="custom-control-label" for="precio-${index}">$${filtro.limIzq} - $${filtro.limDer}</label>`;
        precioDiv.appendChild(filtroOpcion);
    });

    const fraganciaDiv = document.getElementById('filtroFragancia');
    filtroFragancia.forEach((filtro,index) => {
        const filtroFragancia = document.createElement('div');
        filtroFragancia.setAttribute('class',"custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3");
        filtroFragancia.innerHTML = `
                                <input type="checkbox" class="custom-control-input" id="fragancia-${index}">
                                <label class="custom-control-label" for="fragancia-${index}">${filtro}</label>`;
        fraganciaDiv.appendChild(filtroFragancia);
    });

    const marcasDiv = document.getElementById('filtroMarca');
    perfumesMarcas.forEach(({marca},index) => {
        const filtroMarca = document.createElement('div');
        filtroMarca.setAttribute('class',"custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3");
        filtroMarca.innerHTML = `
                                <input type="checkbox" class="custom-control-input" id="marca-${index}">
                                <label class="custom-control-label" for="marca-${index}">${marca}</label>`;
        marcasDiv.appendChild(filtroMarca);
    });
    
}

const mostrarProductos = () => {
    const contenedor = document.getElementById('contenedorProductos');
    productos.forEach((producto) => {
        const productoCard = document.createElement('div');
        productoCard.setAttribute('class',"col-lg-4 col-md-6 col-sm-12 pb-1");
        productoCard.innerHTML = ` 
                                <div class="card product-item border-0 mb-4">
                                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img class="img-fluid w-100" src="${producto.imgUrl}">
                                    </div>
                                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 class="text-truncate mb-3">${producto.nombre}</h6>
                                        <div class="d-flex justify-content-center">
                                            <h6>$${producto.precio}</h6>
                                        </div>
                                    </div>
                                    <div class="card-footer d-flex justify-content-between bg-light border">
                                        <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Lo quiero!</a>
                                    </div>
                                </div>`
        contenedor.appendChild(productoCard);
    })
}

navbar();
filtros();
mostrarProductos();