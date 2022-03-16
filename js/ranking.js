let cdsRanking=[];
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
function mostrarCdsRanking(array){
    let contadorTarjetas=1;
    let contenedor=document.getElementsByClassName('gallery')[0]; //obtengo el contenedor de las cards
    //templates de las distintas tarjetas
    let template1 = document.querySelector('#template-card-Green1').content;
    const template2=document.querySelector('#template-card-Green2').content;
    const template3=document.querySelector('#template-card-Green3').content;
    const template4=document.querySelector('#template-card-Negra').content;
    const template5=document.querySelector('#template-card-Especial').content;
    const template6=document.querySelector('#template-card-Negra-Invertida').content;
    const anuncio1=document.querySelector('#template-anuncio1').content;
    const anuncio2=document.querySelector('#template-anuncio2').content;
    const anuncio3=document.querySelector('#template-anuncio3').content;
    const fragment = document.createDocumentFragment();
    let clone=0;
    array.forEach(cd => {
        
        let {nombre, imagen, ordenRanking, comentarioRanking}=cd;//desestructurando el obj Cd
        
        switch (ordenRanking) {
            case 1: 
            case 6:
            case 11:
                template1.querySelector('img').setAttribute('src',imagen);
                template1.querySelector('h3').textContent=`Nro. ${ordenRanking}`;
                template1.querySelector('.newCard-text').textContent=`${nombre}...`;
                template1.querySelector('.newCard-span').textContent=comentarioRanking;
                
                
                clone=template1.cloneNode(true);
                break;
            case 3:
                template5.querySelector('img').setAttribute('src',imagen);
                template5.querySelector('h3').textContent=`Nro. ${ordenRanking}`;
                template5.querySelector('.newCard-text').textContent=`${nombre}...`;
                template5.querySelector('.newCard-span').textContent=comentarioRanking;
                template5.querySelector('ul').innerHtml=`<li class="list-group-item">1º en USA según Billboard</li>
                                                        <li class="list-group-item">4º en UK según Progression Magazine</li>
                                                        <li class="list-group-item">2 Veces disco de Oro</li>`;
                template5.querySelector('.newCard-body').innerHtml=`<a href="disqueria.html" class="btnVacio btnVacio--block btnVacio--block--black">Ir a la tienda</a>
                                                                    <a href="ultimosIngresos.html" class="botonAzul">Novedades</a>`
                clone=template5.cloneNode(true);
                break;
            case 4:
            case 12:
                template4.querySelector('img').setAttribute('src',imagen);
                template4.querySelector('h3').textContent=`Nro. ${ordenRanking}`;
                template4.querySelector('.newCard-text').textContent=`${nombre}...`;
                template4.querySelector('.newCard-spanWhite').textContent=comentarioRanking;
                clone=template4.cloneNode(true);
                break;
            case 8:
                template3.querySelector('img').setAttribute('src',imagen);
                template3.querySelector('h3').textContent=`Nro. ${ordenRanking}`;
                template3.querySelector('.newCard-text').textContent=`${nombre}...`;
                template3.querySelector('.newCard-spanWhite').textContent=comentarioRanking;
                clone=template3.cloneNode(true);
                
                break;
            case 2:
            case 9:
                template2.querySelector('h5').textContent=`Nro. ${ordenRanking}`;
                template2.querySelector('.newCard-text').textContent=`${nombre}...`;
                template2.querySelector('.newCard-spanWhite').textContent=comentarioRanking;
                template2.querySelector('img').setAttribute('src',imagen);
                clone=template2.cloneNode(true);
                break;
            
            case 5:
            case 10:
                template6.querySelector('img').setAttribute('src',imagen);
                template6.querySelector('h3').textContent=`Nro. ${ordenRanking}`;
                template6.querySelector('.newCard-text').textContent=`${nombre}...`;
                template6.querySelector('.newCard-span').textContent=comentarioRanking;
                clone=template6.cloneNode(true);
                break;
            default:
                break;
        }
        
        contadorTarjetas++;
        console.log(contadorTarjetas);
        /* const clone = template.cloneNode(true); */
        fragment.appendChild(clone);
        if (contadorTarjetas==5) {
            anuncio1.innerHtml=`<div class="newCard">
            <div class="newCard-header">Nuestros Servicios</div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Ventas de CDs música Progresiva</li>
                <li class="list-group-item">Ventas de CDs música Celta</li>
                <li class="list-group-item">Posters y libros... Muy pronto!!!</li>
            </ul>
            </div>`
            clone=anuncio1.cloneNode(true);
            fragment.appendChild(clone);
        };
        if (contadorTarjetas==7) {
            anuncio2.innerHtml=`<div class="newCard text-white  bg-danger">
                                    <div class="newCard-header">Importante!!!</div>
                                    <div class="newCard-body">
                                        <h5 class="newCard-title">Medios de Pago</h5>
                                        <p class="newCard-text">Incorporamos más tarjetas a nuestras formas de pago existentes... Consultar al momento de abonar su compra</p>
                                    </div>
                                </div>`;
            clone=anuncio2.cloneNode(true);
            fragment.appendChild(clone);
            anuncio3.innerHtml=`<div class="newCard text-center">
                                    <div class="newCard-header text-danger fs-2">
                                        Últimos Ingresos!!!
                                    </div>
                                    <div class="newCard-body">
                                        <h5 class="newCard-title">Novedades</h5>
                                        <p class="newCard-text">En nuestra sección Novedades encontrarás lo último del material publicado en el género</p>
                                        <a href="ultimosIngresos.html" class="botonAzul">Novedades</a>
                                    </div>
                                    <div class="newCard-footer text-muted">
                                        2 días atrás
                                    </div>
                                </div>`;
            clone=anuncio3.cloneNode(true);
            fragment.appendChild(clone);
        }

    });
    contenedor.appendChild(fragment);
}
function SortArrayPorOrdenRanking(x,y){
    if (x.ordenRanking < y.ordenRanking) {return -1;}
    if (x.ordenRanking < y.ordenRanking) {return 1;}
    return 0;
}

async function cargarArrayCds() {
    const URL = "/js/datosCds.json";
    let array = [];
        
    let respuesta = await fetch(URL);
    let datos = await respuesta.json();
    
    datos.forEach((elemento) => cdsDisqueria.push(elemento));
    //llamo a las funciones dentro de la función que me trae los datos
    
    cdsRanking=cdsDisqueria.filter(cd=>cd.estaEnRanking=='true');
    cdsRanking=cdsRanking.sort(SortArrayPorOrdenRanking);
    console.log(cdsRanking);
    mostrarCdsRanking(cdsRanking)
    recuperarCarrito(); //Recupero el carrito del localStorage
    showCartIcon();//Veo si muestro el carrito
    //return array;
}
/* Comienzo */
cargarArrayCds();