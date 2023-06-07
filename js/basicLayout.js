import { categories } from "./data.js";


export const navbar = () => {
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

