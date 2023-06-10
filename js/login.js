import { usuarios } from "./data.js";

const login = () => {

    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;
    const usuario = usuarios.find((usuario) => usuario.email === email && usuario.contra === contrasena);
    if(usuario){
        window.localStorage.setItem('usuario',JSON.stringify(usuario));
        window.location.href = 'index.html'
    }
    else{
        document.getElementById('mensajeError').style.display = 'block'
    }
}

document.getElementById('login').addEventListener('click',login);