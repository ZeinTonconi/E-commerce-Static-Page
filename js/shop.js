import { basicLayout, productosCarrito } from "./basicLayout.js";
import { filtroFragancia, filtroPrecio, perfumesMarcas, listaProductos } from "./data.js";

let productos=listaProductos;
let mensajeCompra = false, mensajeLogin=false;

const anadirProducto = (event) => {
    if(!window.localStorage.getItem('usuario')){
        if(!mensajeLogin){
            mensajeLogin = true;
            document.getElementById('mensajeLogin').style.display = "block";
            setTimeout(() => {
                mensajeLogin = false;
                document.getElementById('mensajeLogin').style.display = "none";
            }, 3000)
        }
        return;
    }
    const productoId = event.target.id;
    const cantidad = parseInt(localStorage.getItem(productoId));
    if(cantidad){
        localStorage.setItem(productoId, cantidad+1)
    }
    else{
        localStorage.setItem(productoId,1);
    }

    let productos = JSON.parse(window.localStorage.getItem('productosCart'));
    if(!productos || !productos.includes(productoId)){
        if(!productos) 
            productos = []
        productos.push(productoId);
    }
    localStorage.setItem("productosCart",JSON.stringify(productos))

    if(!mensajeCompra){
        mensajeCompra = true;
        document.getElementById('mensajeCompra').style.display = "block";
        setTimeout(() => {
            mensajeCompra = false;
            document.getElementById('mensajeCompra').style.display = "none";
        }, 3000)
    }
    productosCarrito();
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
                                        <p>${producto.descripcion}</p>
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

    // hacer que los checkbox se mantengan marcados
const marcar = (parametro, filtro, tipo) => {
    parametro.forEach(param => {
        const id = filtro.findIndex((filtro) => JSON.stringify(filtro) === JSON.stringify(param));  
        if(id !== -1)
            document.getElementById(`${tipo}-${id}`).checked=true;
    })
}

const filtrarProductos = () => {
    const paramsURL = window.location.search;
    const params = new URLSearchParams(paramsURL)
    const limites = JSON.parse(params.get('limites'));
    const marcas = JSON.parse(params.get('marcas'));
    const fragancias = JSON.parse(params.get('fragancias')); 
    const buscar = params.get('buscar');
    if(buscar){
        productos = productos.filter( (producto) => producto.nombre.includes(buscar))

    }
    if(limites && limites.length !== 0){

        marcar(limites, filtroPrecio, "precio")
        
        productos = productos.filter( (producto) => {
            let estaDentro = false;
            limites.forEach(limite => {
                if(limite.limIzq <= producto.precio && producto.precio <= limite.limDer){
                    estaDentro = true;
                }
            });
            return estaDentro;
        })    
    }
    if(marcas && marcas.length !== 0){

        marcas.forEach(marca => {
            const id = perfumesMarcas.findIndex((filtro) => filtro.marca === marca);  
            if(id !== -1)
                document.getElementById(`marca-${id}`).checked=true;
        })

        productos = productos.filter( producto => marcas.includes(producto.marca));
    }
    if(fragancias && fragancias.length !== 0){

        marcar(fragancias, filtroFragancia, "fragancia")

        productos = productos.filter( producto => {
            return producto.tags.find((tag) => {
                return fragancias.includes(tag);
            })
        }) 
    }

}


mostrarFiltros();
filtrarProductos();
basicLayout();
mostrarProductos();

const filtrar = (tipo, arregloFiltros) => {
    let arreglo = [];
    arregloFiltros.forEach((filtro,index) => {
        if(document.getElementById(`${tipo}-${index}`).checked){
            arreglo.push(filtro);
        }
    })
    return arreglo;
}

const aplicarFiltro = () => {
    let limites = filtrar('precio',filtroPrecio);
    let marcas = filtrar('marca',perfumesMarcas);
    marcas = marcas.map((marca) => marca.marca )
    let fragancias = filtrar('fragancia',filtroFragancia);
    const newUrl = `./shop.html?limites=${JSON.stringify(limites)}&marcas=${JSON.stringify(marcas)}&fragancias=${JSON.stringify(fragancias)}`
     window.location.replace(newUrl)
}

document.getElementById('botonFiltrar').addEventListener('click',aplicarFiltro);