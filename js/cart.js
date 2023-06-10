import { navbar } from "./basicLayout.js";
import { listaProductos } from "./data.js";

const cambiarCantidad = (event,modificador) => {

    const productoId = event.target.id.slice(7);
    const nuevaCantidad =  Math.max(0,parseInt(window.localStorage.getItem(`producto-${productoId}`))+modificador)
    window.localStorage.setItem(`producto-${productoId}`, nuevaCantidad);
    document.getElementById(`cantidad-${productoId}`).innerText=nuevaCantidad;
    document.getElementById(`total-${productoId}`).innerText=`$${nuevaCantidad*listaProductos[productoId].precio}`
    actualizarFactura();
}

const removerProducto = (event) => {
    const id = event.target.id.slice(8);
    const fila = document.getElementById(`fila-${id}`);
    fila.remove();
    window.localStorage.setItem(`producto-${id}`,0);
    const listaProductosCart = JSON.parse(window.localStorage.getItem('productosCart'));
    listaProductosCart.splice(listaProductos.findIndex((producto) => producto === `producto-${id}`),1);
    window.localStorage.setItem('productosCart',JSON.stringify(listaProductosCart))
    actualizarFactura();
}

const mostrarProductosCarrito = () => {
    const listaProductosCart = JSON.parse(window.localStorage.getItem("productosCart"));
    const tablaProductos = document.getElementById('tablaProductos');
    listaProductosCart.forEach( productoCart => {
        const cantidadProducto = JSON.parse(window.localStorage.getItem(productoCart))
        const id = parseInt(productoCart.slice(9));
        const row = document.createElement('tr');
        row.setAttribute('id',`fila-${id}`)
        row.innerHTML = `
                        <td class="align-middle">
                            <img src="${listaProductos[id].imgUrl}" style="width: 50px;"> 
                            ${listaProductos[id].nombre}
                        </td>
                        <td class="align-middle">$${listaProductos[id].precio}</td>
                        <td class="align-middle">
                            <div class="input-group quantity mx-auto" style="width: 100px;">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-primary btn-minus" 
                                            id="boton--${id}"
                                            >
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <div class="bg-secondary text-center p-1" id=cantidad-${id} >${cantidadProducto}</div>
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-primary btn-plus" 
                                            id="boton+-${id}"
                                            >
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td class="align-middle" id=total-${id}>$${cantidadProducto*listaProductos[id].precio}</td>
                        <td class="align-middle"><button class="btn btn-sm btn-primary" id="remover-${id}"><i class="fa fa-times"></i></button></td>
                        `
        tablaProductos.appendChild(row);
        
        document.getElementById(`boton+-${id}`).addEventListener('click',(event) => cambiarCantidad(event,1));
        document.getElementById(`boton--${id}`).addEventListener('click',(event) => cambiarCantidad(event,-1));
        document.getElementById(`remover-${id}`).addEventListener('click', removerProducto)
    });
}

const actualizarFactura = () => {
    let subtotal = 0;
    const listaProductosCart = JSON.parse(window.localStorage.getItem("productosCart"));
    listaProductosCart.forEach( productoCart => {
        const cantidadProducto = JSON.parse(window.localStorage.getItem(productoCart));
        const id = parseInt(productoCart.slice(9));
        subtotal += cantidadProducto*listaProductos[id].precio;
    })

    const impuestos = 10

    document.getElementById('subtotal').innerHTML = `$${subtotal}`;
    document.getElementById('impuestos').innerHTML = `$${impuestos}`;
    document.getElementById('total').innerHTML = `$${subtotal+impuestos}`;
}



navbar();
mostrarProductosCarrito();
actualizarFactura();