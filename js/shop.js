import { navbar } from "./basicLayout.js";
import { filtroFragancia, filtroPrecio, perfumesMarcas, listaProductos } from "./data.js";

let productos=listaProductos;

const anadirProducto = async (event) => {
    const productoId = event.target.id;
    if(localStorage.getItem(productoId)){
        const cantidad = localStorage.getItem(productoId);
        localStorage.setItem(productoId, parseInt(cantidad)+1)
    }
    else{
        await localStorage.setItem(productoId,1);
    }
    const cantidadProd = localStorage.getItem(productoId)
}


const mostrarFiltros = () => {
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
    productos.forEach((producto,index) => {
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
                                        <button class="btn btn-sm text-dark p-8" id="producto-${index}">
                                            <i class="fas fa-shopping-cart text-primary mr-1"></i>    
                                            Lo Quiero!!
                                        </button>
                                    </div>
                                </div>`
        contenedor.appendChild(productoCard);
        document.getElementById(`producto-${index}`).addEventListener('click', anadirProducto)
    })
}

const filtrarProductos = () => {
    const paramsURL = window.location.search;
    const params = new URLSearchParams(paramsURL)
    const limIzq = params.get('limIzq');
    const limDer = params.get('limDer');
    const marca = params.get('marca');
    const fragancia = params.get('fragancia'); 
    if(limIzq && limDer){
        productos = productos.filter( producto => producto.precio>=limIzq && producto.precio<=limDer)    
    }
    if(marca){
        productos = productos.filter( producto => producto.marca === marca)
    }
    if(fragancia){
        productos = productos.filter( producto => producto.fragancia) 
    }
    

    // precio
    // marca
    // fragancia
}


filtrarProductos();
navbar();
mostrarFiltros();
mostrarProductos();