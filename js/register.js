import { navbar } from "./basicLayout.js";
import { usuarios } from "./data.js";

const registrarUsuario = () => {
    const nombre = document.getElementById('nombre');
    if(!nombre.value){
        nombre.nextElementSibling.innerText = "El nombre no puede estar vacio";
    }
    const direccion = document.getElementById('direccion');
    if(!direccion.value){
        direccion.nextElementSibling.innerText = 'La direccion no puede estar vacia';
    }
    const celular = document.getElementById('celular');
    if(!celular.value){
        celular.nextElementSibling.innerText = 'El telefono celular no puede esta vacio';
    }
    const email = document.getElementById('email');
    if(!email.value){
        email.nextElementSibling.innerText = 'El correo electronico no puede estar vacio';
    }
    const contra = document.getElementById('contrasena');
    const contra2 = document.getElementById('contrasenaRepetida');
    if(contra.value !== contra2.value){
        contra2.nextElementSibling.innerText = 'No son iguales';
        return;
    }
    if(!nombre.value || !direccion.value || !celular.value || !email.value){
        return
    }
    const usuario = {
        nombre: nombre.value,
        email: email.value,
        contra: contra.value,
        direccion: direccion.value,
        celular: celular.value
    }
    usuarios.push(usuario)
    window.localStorage.setItem('usuario',JSON.stringify(usuario));
    window.location.href = 'index.html'
}

navbar();

document.getElementById('registro').addEventListener('click',registrarUsuario)