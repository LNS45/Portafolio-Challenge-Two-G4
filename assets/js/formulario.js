//Guardamos en una constante todos los elementos con el data attribute input
const $inputs = document.querySelectorAll("[data-input]");
const form = document.querySelector(".formulario");

//Usamos el metodo forEach para recorrer todos los elementos del nodeList guardados en la constante, el cual recibe como parametro una funcion a ejecutar por cada elemento.
//A partir de ese elemento se hace una funcion arrow para escuchar un evento cuando se haga el blur
//Se ejecutara otra funcion como parametro del EventListener que guardara el target del elemento que activo el evento.
$inputs.forEach(e => {
    e.addEventListener('blur', e => {
        const elementoHijo = e.target;
        const elementoPadre = elementoHijo.parentElement;
        const spanError = elementoPadre.lastElementChild;
        spanError.classList.add('contacto__input--active');
        console.log(spanError);
    });
});

