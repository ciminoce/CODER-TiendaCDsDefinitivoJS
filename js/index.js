let cdsDestacados=[];
let carritoDeCompras=[];
let cdsDisqueria=[];

let cantidadProductos=0;
/* Contenedores */
//const cartIconContainer = document.createElement("div");
const contenedorCarrito = document.getElementsByClassName('modal-body')[0];

/* Cosas del carrito */
const contadorCarrito = document.getElementById('contadorCarrito');
const totalCarrito = document.getElementById('totalCarrito');


const estrellaLlena=document.createElement('i').classList.add('fa-solid','fa-star');
const estrellaVacia=document.createElement('i').classList.add('fa-regular','fa-star');
const estrellaMedia=document.createElement('i').classList.add('fa-solid','fa-star-half-stroke');


function mostrarCdsDestacados(array){
    let contenedor=document.getElementsByClassName('card__container')[0]; //obtengo el contenedor de las cards
    const template = document.querySelector('#template-card-Index').content;
    const fragment = document.createDocumentFragment();
    array.forEach(cd => {
        
        let {nombre, imagen, interprete, precio, stars, id}=cd;//desestructurando el obj Cd
        
        template.querySelector('.mycard__img').setAttribute('src', imagen);
        template.querySelector('.mycard__title').textContent = nombre;
        template.querySelector('span').textContent =interprete;
        template.querySelector('.preciocd').textContent=`$${precio}`;
        
        template.querySelector('.botonAzul').dataset.id = id;
        /* falta mostrar las estrellas */
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    contenedor.appendChild(fragment);
}
function agregarEstrellas(div, cantidad){
    
    
    
}

async function cargarArrayCds() {
    const URL = "/js/datosCds.json";
    
        
    let respuesta = await fetch(URL);
    let datos = await respuesta.json();
    
    datos.forEach((elemento) => cdsDisqueria.push(elemento));
    //llamo a las funciones dentro de la función que me trae los datos
    console.log(cdsDisqueria);
    cdsDestacados=cdsDisqueria.filter(cd=>cd.esDestacado=='true');
    
    console.log(cdsDisqueria.length);
    mostrarCdsDestacados(cdsDestacados)
    detectarBotonesIndex(cdsDisqueria);
    recuperarCarrito(); //Recupero el carrito del localStorage
    showCartIcon();//Veo si muestro el carrito
    //return array;
}
/* Comienzo */
cargarArrayCds();
/* recuperarCarrito(); //Recupero el carrito del localStorage
showCartIcon();//Veo si muestro el carrito */