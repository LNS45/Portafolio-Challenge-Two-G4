//Guardamos en una constante todos los elementos con el data attribute input
const $inputs = document.querySelectorAll("[data-input]");

//Usamos el metodo forEach para recorrer todos los elementos del nodeList guardados en la constante, el cual recibe como parametro una funcion a ejecutar por cada elemento.
//A partir de ese elemento se hace una funcion arrow para escuchar un evento cuando se haga el blur
//Se ejecutara otra funcion como parametro del EventListener que guardara el target del elemento que activo el evento.
$inputs.forEach(e => {
    e.addEventListener('blur', e => {
        const elementoHijo = e.target;
        const elementoPadre = elementoHijo.parentElement;
        const spanError = elementoPadre.lastElementChild;
        spanError.classList.add('contacto__input--active');
        //Se inicia una funcion con el argumento Elemento Hijo para poder sacar el elemento ya que es una const
        valida(elementoHijo, spanError);
    });
});

//La funcion obtiene el tipo de data attribute y lo almacena en una const
function valida(input, spanDeError){
    const tipoDeInput = input.dataset.input;

    if(!input.validity.valid){
        spanDeError.classList.add("contacto__input--active");
        spanDeError.innerHTML = mostrarMensajeError(tipoDeInput, input);

        if(tipoDeInput == "email"){
            const labelError = document.querySelector(".labelError");
            labelError.classList.toggle("contacto__input--errorLabel");
        };
    }else{
        spanDeError.classList.remove("contacto__input--active");
    }
}

//Almaceno los tipos de errores en un array para recorrerlos despues y usarlos en el objeto Errores
const tipoErrores = [
    "valueMissing",
    "typeMismatch"
];

//Se almacena en un objeto con varios objetos los Errores para cada tipo de input. [uso de corchetes mientras sea un String] o se accede con punto "."
//Los objetos pueden tener mas objetos adentro.
const Errores = {
    nombre: {
        valueMissing : "No puede dejar el campo de nombre vacío."
    },
    apellido: {
        valueMissing : "No puede dejar el campo de apellido vacío."
    },
    email: {
        valueMissing : "No puede dejar el campo de correo vacío.",
        typeMismatch: "El correo no es válido"
    },
    asunto: {
        valueMissing : "No puede dejar el campo de asunto vacío."
    },
    mensaje: {
        valueMissing : "No puede dejar el campo de mensaje vacío."
    }
}

function mostrarMensajeError(tipoDeInput, input){
    let mensaje = "";
    tipoErrores.forEach(error => {
        //valida si el input es valido o no, se accede en forma de objeto al validity, por lo que se puede poner en punto o con corchetes [] el error o en este caso recorriendo el array con la lista de errores. Si el error esta presente (true) cambia la variable de mensaje accediendo al objeto de Errores y rescatando el error especifico.
        if(input.validity[error]){
            mensaje = Errores[tipoDeInput][error];
        }
    });
    //Regresa el mensaje, para que cada vez que sea llamada la funcion se ponga el mensaje
    return mensaje;
}


