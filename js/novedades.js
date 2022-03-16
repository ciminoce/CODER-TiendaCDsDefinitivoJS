let cdsNovedades=[];
let cdsRanking=[];
let carritoDeCompras=[];
let cdsDisqueria=[];

let cantidadProductos=0;
/* Contenedores */
//const cartIconContainer = document.createElement("div");
const contenedorCarrito = document.getElementsByClassName('modal-body')[0];

const estrellaLlena=document.createElement('i').classList.add('fa-solid','fa-star');
const estrellaVacia=document.createElement('i').classList.add('fa-regular','fa-star');
const estrellaMedia=document.createElement('i').classList.add('fa-solid','fa-star-half-stroke');


function mostrarCdsNovedades(array){
    let contenedor=document.getElementsByClassName('card__container')[0]; //obtengo el contenedor de las cards
    //templates de las distintas tarjetas
    const template = document.querySelector('#template-card-Novedades').content;
    const fragment = document.createDocumentFragment();
    array.forEach(cd => {
        
        let {nombre, imagen, interprete, comentarioNovedad}=cd;//desestructurando el obj Cd
        
        template.querySelector('.mycard__img').setAttribute('src', imagen);
        template.querySelector('.mycard__title').textContent = nombre;
        template.querySelector('span').textContent =interprete;
        template.querySelector('.mycard__details').textContent=comentarioNovedad;
    
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    contenedor.appendChild(fragment);
}


async function cargarArrayCds() {
    const URL = "/js/datosCds.json";
    
        
    let respuesta = await fetch(URL);
    let datos = await respuesta.json();
    
    datos.forEach((elemento) => cdsDisqueria.push(elemento));
    //llamo a las funciones dentro de la función que me trae los datos
    
    cdsNovedades=cdsDisqueria.filter(cd=>cd.esNovedad=='true');
    
    console.log(cdsNovedades.length);
    mostrarCdsNovedades(cdsNovedades)
    recuperarCarrito(); //Recupero el carrito del localStorage
    showCartIcon();//Veo si muestro el carrito
    //return array;
}
/* Comienzo */
cargarArrayCds();