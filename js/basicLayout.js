import { categories } from "./data.js";


const navbar = () => {
    const navbar=document.getElementById('navbar-tienda-div');
    console.log(categories);
    categories.forEach(item => {
            const navbarItem = document.createElement('a');
            navbarItem.setAttribute('class',"nav-item nav-link");
            navbarItem.setAttribute('href',`shop.html?marcas=${JSON.stringify([item.item])}`)
            navbarItem.innerText = item.item;
            navbar.appendChild(navbarItem);
    });
}

const logout = () => {
     window.localStorage.clear();
     window.location.href='index.html';
}

const checkLogin = () => {
    const usuario = JSON.parse(window.localStorage.getItem('usuario'))
    if(usuario){
        document.getElementById('login').style.display="none";
        document.getElementById('register').style.display="none";
        const nombreUsuario = document.getElementById('nombreUsuario');
        nombreUsuario.style.display="block";
        nombreUsuario.innerText = usuario.nombre;
        console.log(usuario);
        const logoutBoton = document.getElementById('logout');
        logoutBoton.style.display="block";
        logoutBoton.addEventListener('click',logout);
        document.getElementById('carrito').style.display='block'
        document.getElementById('botonCarrito').style.display='block'
    }
}

const buscarProducto = () => {
    const producto = document.getElementById('producto').value;
    if(producto){
        window.location.href = `shop.html?buscar=${producto}`
    }
}

const iniciarBuscador = () => {
    const buscador = document.getElementById('buscarProducto');
    const botonBuscar = document.getElementById('botonBuscar');
    botonBuscar.addEventListener('click',buscarProducto());
    buscador.addEventListener('keydown', (event) => {
        if(event.code === "Enter"){
            buscarProducto();
        }
    })
}

export const productosCarrito = () => {
    const numeroProductos = document.getElementById('numeroProductos');
    const productos = JSON.parse(window.localStorage.getItem('productosCart'));
    numeroProductos.innerText = 0;
    if(productos){
        productos.forEach(producto => {
            const numero = parseInt(window.localStorage.getItem(producto))
            numeroProductos.innerText = parseInt(numeroProductos.innerText)+parseInt(numero);
            console.log(numero);
        });
    }
}

export const basicLayout = () => {
    navbar();
    checkLogin();
    iniciarBuscador();
    productosCarrito();
}